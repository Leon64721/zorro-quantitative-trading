# parse_zorro_result.ps1
# Extrae métricas del log de ZORRO

param(
    [string]$LogFile,
    [switch]$Verbose
)

if (-not (Test-Path $LogFile)) {
    Write-Host "❌ Archivo de log no encontrado: $LogFile" -ForegroundColor Red
    exit 1
}

Write-Host "📖 Parseando log de ZORRO..." -ForegroundColor Cyan
Write-Host "Archivo: $LogFile`n"

$content = Get-Content $LogFile -Raw
$lines = Get-Content $LogFile

# Inicializar métricas
$metrics = @{
    log_file = $LogFile
    parse_timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    strategy_name = $null
    asset = $null
    period_start = $null
    period_end = $null
    bar_period = $null
    lookback = $null
    timeframe = $null
    net_profit = $null
    total_trades = $null
    win_rate = $null
    profit_factor = $null
    sharpe_ratio = $null
    max_drawdown = $null
    annual_return = $null
    capital_final = $null
    p_value = $null
    r_squared = $null
    raw_lines = @()
}

# Patrones de búsqueda
$patterns = @{
    strategy = "^Strategy: (.+)$"
    asset = "^Asset: (.+)$"
    period_start = "Period: ([\d\-]+).*to"
    period_end = "Period:.*to ([\d\-]+)"
    net_profit = "Net Profit\s+[\$]?\s*([\d\-\.]+)"
    total_trades = "Total Trades:\s*(\d+)"
    win_rate = "Win Rate:\s*([\d\.]+)%?"
    profit_factor = "Profit Factor:\s*([\d\.]+)"
    sharpe = "Sharpe Ratio:\s*([\d\-\.]+)"
    max_drawdown = "Max Drawdown:\s*([\d\.\-]+)%?"
    annual_return = "Annual Return:\s*([\d\-\.]+)%?"
    capital_final = "Capital final:\s*[\$]?\s*([\d\-\.]+)"
    p_value = "P-Value:\s*([\d\.]+)%?"
    r_squared = "R\^2|R2|R squared:\s*([\d\.]+)"
}

# Extraer métri cas línea por línea
foreach ($line in $lines) {
    $line = $line.Trim()

    if ([string]::IsNullOrEmpty($line)) { continue }

    # Guardar líneas relevantes para debugging
    if ($line -match "(Strategy:|Asset:|Period:|Profit|Trades|Rate|Factor|Sharpe|Drawdown|Return|Capital|Value)") {
        $metrics.raw_lines += $line
    }

    # Buscar estrategia
    if ($line -match $patterns.strategy) {
        $metrics.strategy_name = $matches[1]
        Write-Host "✅ Estrategia: $($metrics.strategy_name)" -ForegroundColor Green
    }

    # Buscar asset
    if ($line -match $patterns.asset) {
        $metrics.asset = $matches[1]
        Write-Host "✅ Asset: $($metrics.asset)" -ForegroundColor Green
    }

    # Buscar rango de fechas
    if ($line -match $patterns.period_start) {
        $metrics.period_start = $matches[1]
    }
    if ($line -match $patterns.period_end) {
        $metrics.period_end = $matches[1]
    }

    # Buscar Net Profit
    if ($line -match $patterns.net_profit) {
        $metrics.net_profit = [double]$matches[1]
    }

    # Buscar Total Trades
    if ($line -match $patterns.total_trades) {
        $metrics.total_trades = [int]$matches[1]
    }

    # Buscar Win Rate
    if ($line -match $patterns.win_rate) {
        $metrics.win_rate = [double]$matches[1]
    }

    # Buscar Profit Factor
    if ($line -match $patterns.profit_factor) {
        $metrics.profit_factor = [double]$matches[1]
    }

    # Buscar Sharpe Ratio
    if ($line -match $patterns.sharpe) {
        $metrics.sharpe_ratio = [double]$matches[1]
    }

    # Buscar Max Drawdown
    if ($line -match $patterns.max_drawdown) {
        $metrics.max_drawdown = [double]$matches[1]
    }

    # Buscar Annual Return
    if ($line -match $patterns.annual_return) {
        $metrics.annual_return = [double]$matches[1]
    }

    # Buscar Capital Final
    if ($line -match $patterns.capital_final) {
        $metrics.capital_final = [double]$matches[1]
    }

    # Buscar P-Value
    if ($line -match $patterns.p_value) {
        $metrics.p_value = [double]$matches[1]
    }

    # Buscar R-Squared
    if ($line -match $patterns.r_squared) {
        $metrics.r_squared = [double]$matches[1]
    }
}

# Mostrar métricas extraídas
Write-Host "`n📊 MÉTRICAS EXTRAÍDAS:" -ForegroundColor Cyan
Write-Host "================================"
Write-Host "Estrategia:         $($metrics.strategy_name ?? 'N/A')"
Write-Host "Asset:              $($metrics.asset ?? 'N/A')"
Write-Host "Período:            $($metrics.period_start ?? 'N/A') a $($metrics.period_end ?? 'N/A')"
Write-Host "Net Profit:         $$($metrics.net_profit ?? 'N/A')"
Write-Host "Total Trades:       $($metrics.total_trades ?? 'N/A')"
Write-Host "Win Rate:           $($metrics.win_rate ?? 'N/A')%"
Write-Host "Profit Factor:      $($metrics.profit_factor ?? 'N/A')"
Write-Host "Sharpe Ratio:       $($metrics.sharpe_ratio ?? 'N/A')"
Write-Host "Max Drawdown:       $($metrics.max_drawdown ?? 'N/A')%"
Write-Host "Annual Return:      $($metrics.annual_return ?? 'N/A')%"
Write-Host "Capital Final:      $$($metrics.capital_final ?? 'N/A')"
Write-Host "P-Value:            $($metrics.p_value ?? 'N/A')%"
Write-Host "R-Squared:          $($metrics.r_squared ?? 'N/A')"
Write-Host "================================`n"

# Guardar resultado parseado
$outputPath = [System.IO.Path]::ChangeExtension($LogFile, ".parsed.json")
$metrics | ConvertTo-Json | Out-File -FilePath $outputPath -Encoding UTF8
Write-Host "✅ Resultado parseado guardado: $outputPath`n"

return $metrics
