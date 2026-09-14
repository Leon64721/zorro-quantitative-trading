# 🤖 ZORRO Trading System - Custom Agents

Three specialized AI agents to power your quantitative trading workflow.

---

## 📋 Agent Overview

### 1. **Market Data Manager** 📊
Handles all historical market data operations.

**When to use:**
- "Market Data Manager, what data do we have?"
- "Download NAS100 2026"
- "Validate all .t6 files"
- "Generate data status report"

**Key functions:**
- Download missing historical data from brokers
- Validate .t6 binary files for corruption
- Generate data quality reports
- Manage archives and backups

**Located:** `market-data-manager.md`

---

### 2. **Strategy Analyzer** 📈
Decodes ZORRO backtest logs into actionable insights.

**When to use:**
- "Analyze Z2+ EUR/USD"
- "Compare Z2+ EUR/USD vs Z2+ GBP/JPY"
- "How risky is Z2+ EUR/USD?"
- "Generate performance dashboard"

**Key functions:**
- Parse .txt backtest logs from `D:\ZORRO\Log\`
- Extract metrics: Sharpe ratio, Profit Factor, Drawdown, Win Rate
- Compare multiple strategies
- Identify optimization opportunities

**Located:** `strategy-analyzer.md`

---

### 3. **Backtester & Optimizer** 🧪
Runs rigorous backtests with statistical validation.

**When to use:**
- "Backtest Z2+ EUR/USD"
- "Validate Z2+ with Walk Forward Analysis"
- "Run Montecarlo simulation"
- "Optimize lookback parameter"

**Key functions:**
- Execute ZORRO backtests automatically
- Walk Forward Analysis (WFA): Validate on out-of-sample data
- Montecarlo simulations: Confirm edge is real
- Parameter optimization with robust validation

**Located:** `backtester-optimizer.md`

---

## 🚀 How to Activate an Agent

Each agent is defined as a markdown file. To use them:

### In Claude Code:
```
"Hey Claude, activate Market Data Manager mode"
"Market Data Manager, what data do we have?"

"Activate Strategy Analyzer"
"Analyze Z2+ EUR/USD and compare vs dialectdeZorro"

"Activate Backtester & Optimizer"
"Run Walk Forward Analysis on Z2+ EUR/USD"
```

### Alternatively:
Just reference them by name and they'll activate:
- "Market Data Manager: Download GBP/USD 2013-2018"
- "Strategy Analyzer: Compare Z2+ variants"
- "Backtester & Optimizer: Backtest Z2+ GBP/JPY"

---

## 📊 Typical Workflow

**Day 1: Check & Fix Data**
```
Market Data Manager:
  → "Check what data we have"
  → Report: EUR/USD ✅ | NAS100 ❌ (missing 2026)
  → "Download NAS100 2026"
  → Download & validate ✅
```

**Day 2: Backtest Strategy**
```
Backtester & Optimizer:
  → "Backtest Z2+ EUR/USD"
  → Execute & wait (0.3 seconds for 10 years!)
  → Get log file

Strategy Analyzer:
  → "Analyze Z2+ EUR/USD"
  → Parse log & generate metrics
  → Report: 46% annual, Sharpe 0.69, Win rate 46.5%
```

**Day 3: Validate Results**
```
Backtester & Optimizer:
  → "Run WFA on Z2+ EUR/USD"
  → Walk Forward Analysis across 15 cycles
  → Report: In-sample 46% | Out-of-sample 44.2% ✅
  
Backtester & Optimizer:
  → "Run Montecarlo simulation"
  → Shuffle trades 100 times
  → Report: 98% confidence edge is real ✅
```

**Day 4: Optimize**
```
Strategy Analyzer:
  → "What can we improve about Z2+?"
  → Report: Underperforms in ranging markets
  → Suggestion: Add market regime filter

Backtester & Optimizer:
  → "Optimize lookback parameter"
  → Test 1500-2500 bars with WFA
  → Report: Optimal 2100 bars (+1% return improvement)
```

---

## 🔄 Agent Collaboration

The three agents work together:

```
Market Data Manager
    ↓ (provides clean data)
    
Backtester & Optimizer
    ↓ (runs tests, produces logs)
    
Strategy Analyzer
    ↓ (interprets results)
    
Your Decision
    ↓ (improve, scale, deploy)
```

---

## 💡 Key Metrics to Know

### Profitability
- **Annual Return**: Target > 15%, Excellent > 30%
- **Sharpe Ratio**: Target > 0.5, Excellent > 1.0
  - Measures risk-adjusted returns
  - Z2+ EUR/USD: 0.69 = Good

### Risk
- **Max Drawdown**: Target < 30%, Good < 20%
  - Z2+ EUR/USD: 20.7% = Healthy
- **Win Rate**: Target > 40% if Profit Factor > 1.0
  - Z2+ EUR/USD: 46.5% = Good

### Validation
- **Profit Factor**: Target > 1.0, Good > 1.2
  - Z2+ EUR/USD: 1.22 = Healthy (gains 22% > losses)
- **Walk Forward Analysis (WFA)**: Out-of-sample return should ≈ in-sample
  - Z2+ EUR/USD: 44.2% OOS vs 46% IS = ✅ Robust
- **Montecarlo Confidence**: Target > 95%
  - Z2+ EUR/USD: 98% = ✅ Edge is real

---

## 📁 File Structure

```
E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO\
├── agents/
│   ├── README.md (this file)
│   ├── market-data-manager.md
│   ├── strategy-analyzer.md
│   └── backtester-optimizer.md
│
└── (rest of project structure TBD)
```

---

## 🎯 Success Indicators

✅ **Data**: EUR/USD 2005-2018 validated, Z2+ ready to test  
✅ **Backtest**: Z2+ EUR/USD executed, log parsed  
✅ **Validation**: WFA + Montecarlo confirm strategy is robust  
✅ **Optimization**: Parameters tuned, improvement identified  

---

## 📝 Notes

- All agents assume access to `D:\ZORRO` installation
- Agents work with ZORRO v3.016 and compatible
- Logs expected in `D:\ZORRO\Log\*.txt`
- Historical data in `D:\ZORRO\History\*.t6`
- Strategy files in `D:\ZORRO\Strategy\*.c`

---

## 🚀 Next Steps

1. **Verify agents**: Activate each one and confirm they work
2. **Test workflow**: Run full data → backtest → analyze cycle
3. **Fix data issues**: Use Market Data Manager to resolve Error 047
4. **Analyze Z2+**: Get complete performance picture of winning strategy
5. **Create variants**: Test Z2+ on other assets

---

**Ready to trade smarter! Which agent would you like to activate first?**
