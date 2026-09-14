# ZORRO Full Automation - PowerShell Version CORREGIDO
# Abre ZORRO, carga scripts, da click Test, espera, repite

$zorroPath = "D:\ZORRO\ZORRO.exe"
$strategyPath = "D:\ZORRO\Strategy"
$logPath = "D:\ZORRO\Log"

# Scripts para Stage A
$stageAScripts = @(
    "RB_0069_STRATEGY_RANDOM_69_Base.c",
    "RB_0024_STRATEGY_RANDOM_24_Base.c",
    "RB_0367_STRATEGY_RANDOM_367_Base.c",
    "RB_0266_STRATEGY_RANDOM_266_Base.c",
    "RB_0046_STRATEGY_RANDOM_46_Base.c",
    "RB_0349_STRATEGY_RANDOM_349_Base.c",
    "RB_0308_STRATEGY_RANDOM_308_Base.c",
    "RB_0472_STRATEGY_RANDOM_472_Base.c",
    "RB_0134_STRATEGY_RANDOM_134_Base.c",
    "RB_0309_STRATEGY_RANDOM_309_Base.c",
    "RB_0036_STRATEGY_RANDOM_36_Base.c",
    "RB_0279_STRATEGY_RANDOM_279_Base.c",
    "RB_0359_STRATEGY_RANDOM_359_Base.c",
    "RB_0035_STRATEGY_RANDOM_35_Base.c",
    "RB_0318_STRATEGY_RANDOM_318_Base.c",
    "RB_0085_STRATEGY_RANDOM_85_Base.c",
    "RB_0071_STRATEGY_RANDOM_71_Base.c",
    "RB_0203_STRATEGY_RANDOM_203_Base.c",
    "RB_0251_STRATEGY_RANDOM_251_Base.c",
    "RB_0233_STRATEGY_RANDOM_233_Base.c",
    "RB_0348_STRATEGY_RANDOM_348_Base.c",
    "RB_0111_STRATEGY_RANDOM_111_Base.c",
    "RB_0307_STRATEGY_RANDOM_307_Base.c",
    "RB_0135_STRATEGY_RANDOM_135_Base.c",
    "RB_0273_STRATEGY_RANDOM_273_Base.c"
)

Clear-Host
Write-Host "================================" -ForegroundColor Green
Write-Host "ZORRO FULL AUTOMATION" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Validar ZORRO
if (-not (Test-Path $zorroPath)) {
    Write-Host "ERROR: ZORRO no encontrado en $zorroPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ ZORRO encontrado" -ForegroundColor Green
Write-Host ""

# Confirmar inicio
Read-Host "Presiona ENTER para empezar (todo sera automatico)"

Write-Host ""
Write-Host "Abriendo ZORRO..." -ForegroundColor Cyan
$zorro = Start-Process -FilePath $zorroPath -PassThru

Start-Sleep -Seconds 35
Write-Host "✅ ZORRO abierto" -ForegroundColor Green
Write-Host ""

# Procesar scripts
$completedCount = 0
$totalScripts = $stageAScripts.Count

for ($i = 0; $i -lt $totalScripts; $i++) {
    $scriptFile = $stageAScripts[$i]
    $percent = [math]::Round(($i / $totalScripts) * 100)
    $scriptNum = $i + 1

    Write-Host "[$percent%] Script $scriptNum/$totalScripts : $scriptFile" -ForegroundColor Yellow

    $fullPath = Join-Path $strategyPath $scriptFile

    if (-not (Test-Path $fullPath)) {
        Write-Host "  ERROR: No encontrado" -ForegroundColor Red
        continue
    }

    Write-Host "  → Cargando en ZORRO..." -ForegroundColor Gray

    # Enviar comandos a ZORRO
    [System.Windows.Forms.SendKeys]::SendWait("%s")
    Start-Sleep -Milliseconds 500
    [System.Windows.Forms.SendKeys]::SendWait("o")
    Start-Sleep -Milliseconds 500

    [System.Windows.Forms.SendKeys]::SendWait($fullPath)
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Seconds 3

    Write-Host "  → Dando click Test..." -ForegroundColor Gray
    [System.Windows.Forms.SendKeys]::SendWait("{TAB}")
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Seconds 2

    Write-Host "  → Esperando resultado..." -ForegroundColor Gray

    # Esperar a que termine
    $logFile = Join-Path $logPath ($scriptFile -replace '.c$', '.txt')
    $startTime = Get-Date
    $completed = $false

    while ((Get-Date) -lt $startTime.AddSeconds(600)) {
        if (Test-Path $logFile) {
            $fileInfo = Get-Item $logFile
            $lastModified = $fileInfo.LastWriteTime
            $timeSinceModified = (Get-Date) - $lastModified

            if ($timeSinceModified.TotalSeconds -lt 30) {
                Write-Host "  ✅ Completado!" -ForegroundColor Green
                $completedCount++
                $completed = $true
                break
            }
        }

        Start-Sleep -Seconds 5
    }

    if (-not $completed) {
        Write-Host "  ⚠️ Timeout" -ForegroundColor Yellow
    }

    Start-Sleep -Seconds 2
    Write-Host ""
}

Write-Host "================================" -ForegroundColor Green
Write-Host "COMPLETADO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Resultados:" -ForegroundColor Cyan
Write-Host "  Total: $totalScripts"
Write-Host "  Completados: $completedCount"
Write-Host "  Porcentaje: $([math]::Round(($completedCount/$totalScripts)*100))%" -ForegroundColor Yellow
Write-Host ""
Write-Host "Proximo paso:" -ForegroundColor Yellow
Write-Host "  node run-robustness-suite.js parse --stage A"
Write-Host ""

Read-Host "Presiona ENTER para cerrar"
