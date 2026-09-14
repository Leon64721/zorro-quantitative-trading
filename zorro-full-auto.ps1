# ZORRO Full Automation - PowerShell Version
# Abre ZORRO, carga scripts, da click Test, espera, repite
# Sin necesidad de instalar nada extra

param(
    [string]$Mode = "stage-a",  # stage-a o stage-b
    [int]$Count = 25             # Número de scripts a ejecutar
)

# ====================================
# CONFIGURACIÓN
# ====================================

$zorroPath = "D:\ZORRO\ZORRO.exe"
$strategyPath = "D:\ZORRO\Strategy"
$logPath = "D:\ZORRO\Log"
$manifestPath = "training-results\robustness\MANIFEST.json"

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

# ====================================
# FUNCIONES
# ====================================

function Write-Progress {
    param([string]$Message)
    Write-Host "$(Get-Date -Format 'HH:mm:ss') | $Message" -ForegroundColor Cyan
}

function Test-ZorroInstallation {
    if (-not (Test-Path $zorroPath)) {
        Write-Host "ERROR: ZORRO no encontrado en $zorroPath" -ForegroundColor Red
        exit 1
    }
    Write-Progress "✅ ZORRO encontrado"
}

function Open-Zorro {
    Write-Progress "Abriendo ZORRO..."
    $zorro = Start-Process -FilePath $zorroPath -PassThru

    # Esperar a que cargue
    Start-Sleep -Seconds 35

    Write-Progress "✅ ZORRO abierto (PID: $($zorro.Id))"
    return $zorro
}

function Load-Script {
    param(
        [string]$ScriptFile,
        [int]$Index,
        [int]$Total
    )

    $percent = [math]::Round(($Index / $Total) * 100)
    Write-Progress "[$percent%] Cargando script $($Index+1)/$Total: $ScriptFile"

    $fullPath = Join-Path $strategyPath $ScriptFile

    if (-not (Test-Path $fullPath)) {
        Write-Host "ERROR: No encontrado $fullPath" -ForegroundColor Red
        return $false
    }

    # Enviar comandos a ZORRO via teclado
    # Alt+S = Menú Strategy
    # O = Open
    [System.Windows.Forms.SendKeys]::SendWait("%s")
    Start-Sleep -Milliseconds 500
    [System.Windows.Forms.SendKeys]::SendWait("o")
    Start-Sleep -Milliseconds 500

    # Escribir ruta del archivo
    [System.Windows.Forms.SendKeys]::SendWait($fullPath)
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")

    Start-Sleep -Seconds 3
    Write-Progress "  → Script cargado en ZORRO"

    return $true
}

function Click-TestButton {
    Write-Progress "  → Dando click en [Test]..."

    # Simular click en botón Test
    # Tab para navegar a botón, Enter para hacer click
    [System.Windows.Forms.SendKeys]::SendWait("{TAB}")
    Start-Sleep -Milliseconds 200
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")

    Start-Sleep -Seconds 2
}

function Wait-ForCompletion {
    param(
        [string]$ScriptFile,
        [int]$TimeoutSeconds = 600
    )

    $logFile = Join-Path $logPath ($ScriptFile -replace '.c$', '.txt')

    Write-Progress "  ⏳ Esperando backtest (máx $TimeoutSeconds segundos)..."

    $startTime = Get-Date
    $completed = $false

    while ((Get-Date) -lt $startTime.AddSeconds($TimeoutSeconds)) {
        if (Test-Path $logFile) {
            $fileInfo = Get-Item $logFile
            $lastModified = $fileInfo.LastWriteTime
            $timeSinceModified = (Get-Date) - $lastModified

            # Si se modificó hace menos de 30 segundos, el test acaba de terminar
            if ($timeSinceModified.TotalSeconds -lt 30) {
                Write-Progress "  ✅ Backtest completado!"
                $completed = $true
                break
            }
        }

        Start-Sleep -Seconds 5
    }

    if (-not $completed) {
        Write-Host "  ⚠️  Timeout esperando resultado" -ForegroundColor Yellow
    }

    return $completed
}

function Load-WindowsFormsSendKeys {
    [void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
}

# ====================================
# MAIN
# ====================================

Clear-Host
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ZORRO FULL AUTOMATION - Stage $Mode              ║" -ForegroundColor Green
Write-Host "║   ¡Completamente automático!                         ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Cargar SendKeys
Load-WindowsFormsSendKeys

# Validar instalación
Test-ZorroInstallation

# Mostrar inicio
Read-Host "Presiona ENTER para empezar (esto automatizará TODO)"

# Abrir ZORRO
$zorroProcess = Open-Zorro

# Procesar scripts
$scripts = $stageAScripts
$completedCount = 0

Write-Host ""
Write-Host "Procesando $($scripts.Count) scripts..." -ForegroundColor Green
Write-Host ""

for ($i = 0; $i -lt $scripts.Count; $i++) {
    $script = $scripts[$i]

    # Cargar script
    $loaded = Load-Script -ScriptFile $script -Index $i -Total $scripts.Count

    if (-not $loaded) {
        continue
    }

    # Dar click Test
    Click-TestButton

    # Esperar a que termine
    $success = Wait-ForCompletion -ScriptFile $script

    if ($success) {
        $completedCount++
    }

    # Pausa entre scripts
    Start-Sleep -Seconds 2
}

# Finalización
Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ ¡COMPLETADO!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "Resultados:" -ForegroundColor Cyan
Write-Host "  Total scripts: $($scripts.Count)"
Write-Host "  Completados: $completedCount"
Write-Host "  Tasa éxito: $([math]::Round(($completedCount/$scripts.Count)*100))%"
Write-Host ""
Write-Host "Próximo paso:" -ForegroundColor Yellow
Write-Host "  node run-robustness-suite.js parse --stage A"
Write-Host ""

Read-Host "Presiona ENTER para cerrar"
