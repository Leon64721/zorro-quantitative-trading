# run_one_backtest.ps1
# Ejecuta un backtest individual en ZORRO y verifica ejecución real

param(
    [string]$StrategyName = "TEST_SIMPLE_RSI",
    [string]$ZorroPath = "D:\ZORRO",
    [int]$TimeoutSeconds = 120,
    [switch]$Verbose
)

Write-Host "🚀 EJECUTANDO BACKTEST EN ZORRO" -ForegroundColor Cyan
Write-Host "================================"
Write-Host "Estrategia: $StrategyName"
Write-Host "ZORRO Path: $ZorroPath"
Write-Host "Timeout: ${TimeoutSeconds}s"
Write-Host "Hora inicio: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "================================`n"

# Rutas
$zorroExe = Join-Path $ZorroPath "ZORRO.exe"
$strategyFolder = Join-Path $ZorroPath "Strategy"
$logFolder = Join-Path $ZorroPath "Log"
$strategyFile = Join-Path $strategyFolder "$StrategyName.c"
$logFile = Join-Path $logFolder "$StrategyName.txt"

# Validaciones
Write-Host "✓ Validando archivos..." -ForegroundColor Yellow

if (-not (Test-Path $zorroExe)) {
    Write-Host "❌ ZORRO.exe no encontrado: $zorroExe" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $strategyFile)) {
    Write-Host "❌ Estrategia no encontrada: $strategyFile" -ForegroundColor Red
    exit 1
}

Write-Host "✅ ZORRO.exe válido"
Write-Host "✅ Estrategia encontrada: $strategyFile`n"

# Estado del log ANTES
Write-Host "📋 Estado del log ANTES de ejecución:" -ForegroundColor Yellow
if (Test-Path $logFile) {
    $logBefore = Get-Item $logFile
    $logHashBefore = (Get-FileHash $logFile -Algorithm MD5).Hash
    $logDateBefore = $logBefore.LastWriteTime
    Write-Host "   Existe: SÍ"
    Write-Host "   Última modificación: $logDateBefore"
    Write-Host "   Hash: $logHashBefore`n"
} else {
    Write-Host "   Existe: NO (se creará)` n"
    $logHashBefore = $null
    $logDateBefore = $null
}

# EJECUTAR ZORRO
Write-Host "🔄 Iniciando ZORRO.exe..." -ForegroundColor Cyan
$startTime = Get-Date

try {
    $process = Start-Process -FilePath $zorroExe `
        -ArgumentList "-run $StrategyName" `
        -NoNewWindow `
        -PassThru `
        -ErrorAction Stop

    Write-Host "   PID: $($process.Id)"
    Write-Host "   Esperando resultado (máximo ${TimeoutSeconds}s)..." -ForegroundColor Gray

    # Esperar a que termine
    $finished = $process.WaitForExit($TimeoutSeconds * 1000)
    $exitCode = $process.ExitCode
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds

    if ($finished) {
        Write-Host "✅ ZORRO terminó"
        Write-Host "   Código de salida: $exitCode"
        Write-Host "   Duración: ${duration}s`n"
    } else {
        Write-Host "⚠️ ZORRO no terminó en ${TimeoutSeconds}s" -ForegroundColor Yellow
        Write-Host "   Matando proceso..." -ForegroundColor Yellow
        $process.Kill()
        exit 1
    }

} catch {
    Write-Host "❌ Error al ejecutar ZORRO: $_" -ForegroundColor Red
    exit 1
}

# Estado del log DESPUÉS
Write-Host "📋 Estado del log DESPUÉS de ejecución:" -ForegroundColor Yellow
if (Test-Path $logFile) {
    $logAfter = Get-Item $logFile
    $logHashAfter = (Get-FileHash $logFile -Algorithm MD5).Hash
    $logDateAfter = $logAfter.LastWriteTime
    $logSize = $logAfter.Length

    Write-Host "   Existe: SÍ"
    Write-Host "   Última modificación: $logDateAfter"
    Write-Host "   Tamaño: $logSize bytes"
    Write-Host "   Hash: $logHashAfter`n"

    # Verificar cambio
    if ($null -ne $logHashBefore -and $logHashBefore -eq $logHashAfter) {
        Write-Host "⚠️ ADVERTENCIA: El hash del log no cambió" -ForegroundColor Yellow
        Write-Host "   El log podría no haber sido actualizado por ZORRO" -ForegroundColor Yellow
        $logUpdated = $false
    } else {
        Write-Host "✅ El log fue actualizado por ZORRO" -ForegroundColor Green
        $logUpdated = $true
    }
} else {
    Write-Host "❌ Log no existe: $logFile" -ForegroundColor Red
    Write-Host "   ZORRO podría no haber ejecutado correctamente" -ForegroundColor Red
    exit 1
}

# Leer log para verificar que tiene contenido
Write-Host "`n📄 Contenido del log:" -ForegroundColor Cyan
if (Test-Path $logFile) {
    $logContent = Get-Content $logFile | Select-Object -First 30
    Write-Host $logContent

    # Extraer línea de "Strategy:"
    $strategyLine = Get-Content $logFile | Where-Object { $_ -match "^Strategy:" } | Select-Object -First 1
    if ($strategyLine) {
        Write-Host "`n✅ Log contiene 'Strategy:'" -ForegroundColor Green
        Write-Host "   $strategyLine"
    } else {
        Write-Host "`n⚠️ Log no contiene línea 'Strategy:'" -ForegroundColor Yellow
    }
}

# Resumen final
Write-Host "`n" -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE EJECUCIÓN" -ForegroundColor Cyan
Write-Host "================================"
Write-Host "Estrategia:         $StrategyName"
Write-Host "Tiempo inicio:      $startTime"
Write-Host "Tiempo fin:         $endTime"
Write-Host "Duración:           ${duration}s"
Write-Host "Código de salida:   $exitCode"
Write-Host "Log actualizado:    $(if ($logUpdated) { 'SÍ ✅' } else { 'NO ⚠️' })"
Write-Host "Archivo log:        $logFile"
Write-Host "Tamaño log:         $(if (Test-Path $logFile) { (Get-Item $logFile).Length } else { 'N/A' }) bytes"
Write-Host "================================`n"

# Crear manifiesto JSON
$manifest = @{
    strategy_name = $StrategyName
    strategy_file = $strategyFile
    zorro_path = $ZorroPath
    zorro_version = (Get-Item $zorroExe).VersionInfo.ProductVersion
    launch_command = "-run $StrategyName"
    start_time = $startTime.ToString("yyyy-MM-dd HH:mm:ss")
    end_time = $endTime.ToString("yyyy-MM-dd HH:mm:ss")
    duration_seconds = $duration
    exit_code = $exitCode
    log_path = $logFile
    log_exists = (Test-Path $logFile)
    log_updated = $logUpdated
    log_hash_before = $logHashBefore
    log_hash_after = $logHashAfter
    execution_status = if ($logUpdated -and $exitCode -eq 0) { "BACKTEST_EXECUTED" } else { "EXECUTION_INCOMPLETE" }
    timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}

$manifestPath = Join-Path "E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO\automation\results\manifests" "$StrategyName`_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
$manifest | ConvertTo-Json | Out-File -FilePath $manifestPath -Encoding UTF8
Write-Host "✅ Manifiesto guardado: $manifestPath`n"

# Retornar estado
if ($logUpdated -and $exitCode -eq 0) {
    Write-Host "✅ BACKTEST EJECUTADO EXITOSAMENTE EN ZORRO" -ForegroundColor Green
    return $manifest
} else {
    Write-Host "⚠️ EJECUCIÓN INCOMPLETA O CON ERRORES" -ForegroundColor Yellow
    return $manifest
}
