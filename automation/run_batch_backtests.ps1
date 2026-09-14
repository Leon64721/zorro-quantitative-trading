# run_batch_backtests.ps1
# Orquestador de backtests - ejecuta múltiples estrategias secuencialmente

param(
    [string[]]$Strategies = @("TEST_SIMPLE_RSI"),
    [string]$ZorroPath = "D:\ZORRO",
    [int]$TimeoutSeconds = 120,
    [switch]$Verbose,
    [switch]$DryRun
)

Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  ORQUESTADOR DE BACKTESTS EN ZORRO TRADER       ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuración:" -ForegroundColor Yellow
Write-Host "  ZORRO Path:    $ZorroPath"
Write-Host "  Estrategias:   $($Strategies -join ', ')"
Write-Host "  Timeout:       ${TimeoutSeconds}s"
Write-Host "  Dry Run:       $(if ($DryRun) { 'SÍ' } else { 'NO' })"
Write-Host "  Timestamp:     $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host ""

# Ruta base
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$resultsDir = Join-Path $baseDir "results"
$manifestDir = Join-Path $resultsDir "manifests"
$rawDir = Join-Path $resultsDir "raw"
$parsedDir = Join-Path $resultsDir "parsed"

# Crear carpetas
@($resultsDir, $manifestDir, $rawDir, $parsedDir) | ForEach-Object {
    if (-not (Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
    }
}

# PASO 1: DESCUBRIMIENTO
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host "PASO 1: DESCUBRIMIENTO DE ZORRO" -ForegroundColor Blue
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host ""

$discovery = & "$baseDir\discover_zorro_cli.ps1" -ZorroPath $ZorroPath
if (-not $discovery) {
    Write-Host "❌ Descubrimiento falló" -ForegroundColor Red
    exit 1
}

Write-Host ""

# PASO 2: VALIDACIÓN DE ESTRATEGIAS
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host "PASO 2: VALIDACIÓN DE ESTRATEGIAS" -ForegroundColor Blue
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host ""

$validStrategies = @()
$strategyFolder = $discovery.strategyFolder

foreach ($strategy in $Strategies) {
    $strategyFile = Join-Path $strategyFolder "$strategy.c"
    if (Test-Path $strategyFile) {
        Write-Host "✅ $strategy encontrada" -ForegroundColor Green
        $validStrategies += $strategy
    } else {
        Write-Host "❌ $strategy NO encontrada: $strategyFile" -ForegroundColor Red
    }
}

if ($validStrategies.Count -eq 0) {
    Write-Host "❌ No hay estrategias válidas" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Estrategias a ejecutar: $($validStrategies.Count)"
Write-Host ""

# PASO 3: EJECUCIÓN
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host "PASO 3: EJECUCIÓN DE BACKTESTS" -ForegroundColor Blue
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host ""

$executionResults = @()
$successCount = 0
$failureCount = 0

for ($i = 0; $i -lt $validStrategies.Count; $i++) {
    $strategy = $validStrategies[$i]
    $num = $i + 1
    $total = $validStrategies.Count

    Write-Host "[$num/$total] Ejecutando: $strategy" -ForegroundColor Yellow
    Write-Host "─────────────────────────────────────────────────" -ForegroundColor Gray

    if ($DryRun) {
        Write-Host "⚠️  DRY RUN: No se ejecutó realmente" -ForegroundColor Yellow
        Write-Host ""
        continue
    }

    try {
        # Ejecutar backtest
        $manifestData = & "$baseDir\run_one_backtest.ps1" `
            -StrategyName $strategy `
            -ZorroPath $ZorroPath `
            -TimeoutSeconds $TimeoutSeconds

        # Verificar si fue exitoso
        if ($manifestData.execution_status -eq "BACKTEST_EXECUTED") {
            Write-Host "✅ Ejecutado correctamente" -ForegroundColor Green
            $successCount++

            # Parsear log
            $logPath = $manifestData.log_path
            if (Test-Path $logPath) {
                Write-Host "📖 Parseando log..." -ForegroundColor Cyan
                $parsed = & "$baseDir\parse_zorro_result.ps1" -LogFile $logPath

                # Guardar resultado parseado
                $parsedPath = Join-Path $parsedDir "$strategy`_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
                $parsed | ConvertTo-Json | Out-File -FilePath $parsedPath -Encoding UTF8
                Write-Host "✅ Resultado parseado: $parsedPath" -ForegroundColor Green
            }

        } else {
            Write-Host "⚠️  Ejecución incompleta: $($manifestData.execution_status)" -ForegroundColor Yellow
            $failureCount++
        }

    } catch {
        Write-Host "❌ Error durante ejecución: $_" -ForegroundColor Red
        $failureCount++
    }

    Write-Host ""
    Start-Sleep -Seconds 2
}

# PASO 4: RESUMEN
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host "PASO 4: RESUMEN FINAL" -ForegroundColor Blue
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host ""
Write-Host "Total estrategias:     $($validStrategies.Count)"
Write-Host "Exitosas:              $successCount ✅"
Write-Host "Fallidas:              $failureCount ❌"
Write-Host "Tasa de éxito:         $(if ($validStrategies.Count -gt 0) { [math]::Round(($successCount / $validStrategies.Count) * 100, 1) }else { 'N/A' })%"
Write-Host ""
Write-Host "Ubicación de resultados:"
Write-Host "  Manifiestos:         $manifestDir"
Write-Host "  Logs parseados:      $parsedDir"
Write-Host "  Logs raw:            $rawDir"
Write-Host ""
Write-Host "Timestamp final:       $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "✅ BACKTESTS COMPLETADOS EXITOSAMENTE EN ZORRO" -ForegroundColor Green
} else {
    Write-Host "⚠️  NO SE EJECUTARON BACKTESTS EXITOSOS" -ForegroundColor Yellow
}

Write-Host ""
