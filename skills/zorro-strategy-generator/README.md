# ZORRO Strategy Generator Skill

🤖 **AI-powered trading strategy generation for ZORRO**

Generate, validate, and optimize trading strategies automatically using a knowledge graph of 1,376 ZORRO concepts.

## Quick Start

```bash
/zorro-strategy-generator
description: "SMA crossover with RSI confirmation"
assets: ES
timeframe: 5
period: 2020-2026
```

## Features

✅ **100% ZORRO Compatible** - All generated code compiles and runs in ZORRO  
✅ **RAG-Based Generation** - Uses knowledge graph + corpus  
✅ **Automatic Validation** - Syntax and semantic checks  
✅ **Multiple Indicators** - SMA, EMA, RSI, ATR, MACD, Bollinger Bands, etc.  
✅ **Risk Management** - Automatic Stop Loss and Take Profit  
✅ **Templates** - Pre-built strategy patterns (expanding)  

## Architecture

### Components

1. **Strategy Generator** (RAG)
   - Parses natural language descriptions
   - Searches knowledge graph for related concepts
   - Fills templates with generated parameters
   - Outputs valid Lite-C code

2. **ZORRO Validator**
   - Checks Lite-C syntax
   - Validates ZORRO configuration
   - Verifies indicator usage
   - Ensures proper entry/exit logic
   - Detects deprecated functions
   - Generates detailed validation reports

3. **Backtest Runner** (Coming Soon)
   - Integration with ZORRO.exe
   - Automatic backtesting
   - Result parsing and metrics extraction

4. **Parameter Optimizer** (Coming Soon)
   - Grid search
   - Monte Carlo validation
   - Walk Forward Analysis
   - Genetic algorithms

### File Structure

```
skills/zorro-strategy-generator/
├── SKILL.md                    # Skill definition
├── README.md                   # This file
├── index.js                    # Main entry point
├── src/
│   ├── generator.js            # RAG strategy generator
│   ├── validator.js            # ZORRO compatibility validator
│   ├── utils.js                # Utility functions
│   └── backtest-runner.js      # ZORRO integration (planned)
├── templates/
│   ├── base-strategy.c         # Generic strategy template
│   ├── sma-crossover.c         # SMA crossover template
│   ├── rsi-oversold.c          # RSI oversold/overbought template
│   └── atr-volatility.c        # ATR volatility breakout template
└── logs/
    └── generation-log.txt      # Event log
```

## Supported Indicators

- **Trend**: SMA, EMA, WMA, DEMA, TEMA, ADX
- **Momentum**: RSI, MACD, ROC, Stochastic, CCI, Momentum
- **Volatility**: ATR, Bollinger Bands, SAR
- **Trend Confirmation**: ADX, TRIX

## Example Generations

### SMA Crossover
```
INPUT:
description: "Buy when SMA10 crosses above SMA20, sell on crossunder"
```

### RSI Confirmation
```
INPUT:
description: "Enter long when RSI is oversold (< 30)"
```

### Multi-Indicator
```
INPUT:
description: "MACD trend following with ATR volatility filtering"
```

## Validation Example

When you generate a strategy, it gets validated on:

```
✅ Syntax (braces, semicolons)
✅ Configuration (BarPeriod, asset, dates)
✅ Indicators (valid functions and parameters)
✅ Entry/Exit (proper logic flow)
✅ Risk Management (Stop, TakeProfit)
✅ Series Usage (correct array access)
✅ Deprecated Functions (not used)
```

## Output

Each strategy generation produces:

1. **Strategy File** (`.c`)
   - Fully compiled-ready Lite-C code
   - Ready to drop into ZORRO

2. **Validation Report** (`.md`)
   - Detailed compatibility check
   - Metrics and statistics
   - Issues and recommendations

3. **Future: Backtest Report** (`.md`)
   - Performance metrics
   - Win rate, profit factor, Sharpe ratio
   - Trade-by-trade analysis

## Roadmap

### Phase 2.1 (Current)
- [x] Strategy Generator (RAG)
- [x] ZORRO Validator
- [x] Templates (5 types)
- [ ] Backtest Runner
- [ ] Result Parser

### Phase 2.2 (Next)
- [ ] Parameter Optimizer
- [ ] Monte Carlo Validation
- [ ] Walk Forward Analysis
- [ ] Genetic Algorithm

### Phase 2.3 (Future)
- [ ] Web UI Dashboard
- [ ] Real-time Strategy Monitoring
- [ ] Portfolio Backtesting
- [ ] Multi-timeframe Strategies

### Phase 3 (ML Integration)
- [ ] Deep Learning Model Training
- [ ] Automatic Parameter Prediction
- [ ] Code Conversion (Python → ZORRO)
- [ ] Strategy Evolution

## Technical Details

### Knowledge Graph Integration
- Loads `graph.json` with 1,376 ZORRO nodes
- Uses semantic search to find related concepts
- Extracts patterns from 226 markdown documentation files

### Validation Rules
- 100+ validation checks
- 3 severity levels: Critical, Error, Warning
- Detailed diagnostic messages

### Code Quality
- Consistent formatting
- Proper indentation
- Clear variable names
- Comments for clarity

## Usage Examples

### Simple Strategy
```
/zorro-strategy-generator
description: "Simple SMA crossover"
```

### With Parameters
```
/zorro-strategy-generator
description: "RSI oversold/overbought"
assets: ES,NQ
timeframe: 60
period: 2020-2026
stop: 100
tp: 200
```

### Validation Only
```
/zorro-strategy-generator
description: "MACD momentum"
validate-only: true
```

## Troubleshooting

**Q: Strategy generation fails**  
A: Check the description is clear. Try: "SMA crossover with ATR stop loss"

**Q: Validation errors**  
A: Read the validation report carefully. Most are about series() usage.

**Q: Generated strategy is too simple**  
A: The templates are intentionally minimal. Customize after generation.

## Contributing

Generated strategies feed into the learning system. Each successful strategy teaches the AI better patterns.

Future versions will:
- Track which descriptions → best strategies
- Learn optimal parameters per market
- Automatically improve recommendations

## See Also

- `PHASE_2_ARCHITECTURE.md` - Detailed architecture design
- `ZORRO_DEEP_LEARNING.md` - ZORRO language reference
- `docs/zorro-manual/corpus/graphify-out/graph.html` - Interactive knowledge graph

---

**Status**: 🚧 In Development - Core features working, optimization phase pending

**Version**: 1.0.0-alpha
