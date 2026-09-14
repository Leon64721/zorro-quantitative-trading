# discover_zorro_cli.ps1
# Descubre la configuración de ZORRO.exe local

param(
    [string]$ZorroPath = "D:\ZORRO",
    [switch]$Verbose
)

Write-Host "🔍 Descubriendo ZORRO.exe CLI..." -ForegroundColor Cyan

$zorroExe = Join-Path $ZorroPath "ZORRO.exe"
$zorroIni = Join-Path $ZorroPath "Zorro.ini"
$strategyFolder = Join-Path $ZorroPath "Strategy"
$logFolder = Join-Path $ZorroPath "Log"
$historyFolder = Join-Path $ZorroPath "History"

# 1. Verificar ZORRO.exe
if (-not (Test-Path $zorroExe)) {
    Write-Host "❌ ZORRO.exe no encontrado en: $zorroExe" -ForegroundColor Red
    exit 1
}
Write-Host "✅ ZORRO.exe encontrado: $zorroExe" -ForegroundColor Green

# 2. Obtener versión
$version = (Get-Item $zorroExe).VersionInfo.ProductVersion
Write-Host "   Versión: $version" -ForegroundColor Green

# 3. Carpetas
@("Strategy", "Log", "History") | ForEach-Object {
    $folder = Join-Path $ZorroPath $_
    $exists = if (Test-Path $folder) { "✅" } else { "❌" }
    Write-Host "   $exists $_`: $folder" -ForegroundColor $(if ($_ -eq "Log") { "Yellow" } else { "Green" })
}

# 4. Leer Zorro.ini para acciones CLI
if (Test-Path $zorroIni) {
    Write-Host "✅ Zorro.ini encontrado" -ForegroundColor Green
    Write-Host "   Acciones CLI disponibles:" -ForegroundColor Cyan

    $actions = @()
    Get-Content $zorroIni | Where-Object { $_ -match '^Action = ' } | ForEach-Object {
        if ($_ -match 'Action = "(.+?): (.+?)"') {
            $name = $matches[1]
            $cmd = $matches[2]
            $actions += @{ name = $name; command = $cmd }
            Write-Host "      • $name: $cmd" -ForegroundColor Gray
        }
    }

    # Buscar -run argument
    $hasRunArg = $actions | Where-Object { $_.command -like "*-run*" }
    if ($hasRunArg) {
        Write-Host "   ✅ Soporte -run encontrado" -ForegroundColor Green
    }
}

# 5. Logs existentes
$logCount = (Get-ChildItem $logFolder -Filter "*.txt" -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "   Logs existentes: $logCount archivos .txt" -ForegroundColor Gray

# 6. Verificar argumentos CLI (intentar help)
Write-Host "🔧 Probando argumentos ZORRO.exe..." -ForegroundColor Cyan

$testArgs = @("/help", "-help", "--help", "-?", "/?")
$workingArg = $null

foreach ($arg in $testArgs) {
    try {
        $result = & $zorroExe $arg 2>&1 | Head -1
        if ($null -ne $result -and $result -notmatch "error|unknown") {
            Write-Host "   Argumento válido: $arg" -ForegroundColor Green
            $workingArg = $arg
            break
        }
    } catch {
        # Ignorar
    }
}

if ($null -eq $workingArg) {
    Write-Host "   ℹ️ No hay argumentos de help visibles (normal para Zorro)" -ForegroundColor Yellow
}

# 7. Resumen
Write-Host ""
Write-Host "📊 RESUMEN DE DESCUBRIMIENTO" -ForegroundColor Cyan
Write-Host "================================"
Write-Host "ZORRO.exe:      $zorroExe"
Write-Host "Versión:        $version"
Write-Host "Strategy folder: $strategyFolder"
Write-Host "Log folder:      $logFolder"
Write-Host "CLI argumentos:  -run <script_name> (según Zorro.ini)"
Write-Host "================================"

# 8. Crear objeto de resultado
$discovery = @{
    zarroPath = $ZorroPath
    zorroExe = $zorroExe
    version = $version
    strategyFolder = $strategyFolder
    logFolder = $logFolder
    historyFolder = $historyFolder
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    cliSupported = $true
    runArgument = "-run"
}

return $discovery
