# ZORRO Strategy Generator Skill

Generate, validate, backtest and optimize trading strategies for ZORRO automatically.

## Features

- **100% ZORRO Compatible**: All generated strategies compile and run in ZORRO
- **RAG-Based Generation**: Uses knowledge graph of 1,376 ZORRO concepts
- **Automatic Validation**: Syntax and semantic checks before backtest
- **Auto Backtesting**: Run strategies in ZORRO and collect metrics
- **Parameter Optimization**: Improve strategy performance automatically
- **Multi-Indicator Support**: SMA, EMA, RSI, ATR, MACD, Bollinger Bands, etc.
- **Risk Management**: Automatic Stop Loss and Take Profit calculation

## Invoke

```
/zorro-strategy-generator [options]
```

## Parameters

- `description` - Strategy description in natural language
  - Example: "SMA crossover with RSI confirmation and ATR volatility"
- `assets` - Assets to test (comma-separated)
  - Example: "ES,NQ" or "EUR/USD"
- `timeframe` - Candle period in minutes
  - Default: 5 (5-minute bars)
- `period` - Backtest period
  - Format: YYYYMMDD-YYYYMMDD or "2020-2026"
- `optimize` - Run parameter optimization
  - true/false, default: false
- `monte-carlo` - Monte Carlo simulations
  - Default: 200
- `validate-only` - Only validate, don't backtest
  - true/false, default: false

## Examples

### Simple Strategy
```
/zorro-strategy-generator
description: "Buy when price > SMA20, sell when price < SMA20"
assets: "ES"
timeframe: 5
```

### With Optimization
```
/zorro-strategy-generator
description: "RSI oversold/overbought with Bollinger Bands"
assets: "ES,NQ,GC"
timeframe: 60
period: "2020-2026"
optimize: true
monte-carlo: 500
```

### Validation Only
```
/zorro-strategy-generator
description: "MACD + ATR trend following"
validate-only: true
```

## Output

- Generated strategy file (Lite-C code)
- Validation report
- Backtest results with metrics
- Optimized parameters (if enabled)
- Professional report with charts

## Architecture

The skill consists of 4 components:

1. **Strategy Generator** - RAG-based code generation
2. **ZORRO Validator** - Syntax and semantic validation
3. **Backtest Runner** - Integration with ZORRO
4. **Parameter Optimizer** - Automatic improvement

See `PHASE_2_ARCHITECTURE.md` for detailed design.

## Status

🔨 **In Development** - Components being implemented
