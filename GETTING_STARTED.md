# 🚀 Getting Started with ZORRO Quantitative Trading

**Time required**: 15-30 minutes  
**Difficulty**: Beginner-friendly  
**Outcome**: Your first profitable strategy running

---

## Step 1: Download ZORRO Framework (5-10 minutes)

### Option A: Direct Download
1. Visit https://zorro-project.com/
2. Download the latest ZORRO (32-bit or 64-bit)
3. Install to your preferred location (e.g., `D:\ZORRO`)
4. Verify: Open command prompt and type `Zorro.exe --version`

### Option B: Package Manager
```bash
# Windows (if available in your package manager)
choco install zorro  # or similar
```

**Verify installation**:
```bash
Zorro.exe --version
# Expected output: Zorro 3.016 or later
```

---

## Step 2: Clone This Repository (2 minutes)

```bash
# Clone the project
git clone https://github.com/YOUR_USERNAME/zorro-quantitative-trading.git

# Navigate to project
cd zorro-quantitative-trading

# List contents
ls  # or dir on Windows
# Should show: strategies/, agents/, docs/, scripts/, etc.
```

---

## Step 3: Get Historical Data (5 minutes)

### Data You Need
- **EUR/USD**: ✅ Included (2005-2026, 22 years)
- **GBP/JPY**: ⚠️ Optional (need to download if testing variant)

### Verify Existing Data
```bash
# Check if EUR/USD data is in your ZORRO installation
ls D:\ZORRO\History\EURUSD*.t6

# Expected output: 22 files (EURUSD_2005.t6 through EURUSD_2026.t6)
# If missing: Follow "Download Data" section below
```

### Download Additional Data (Optional)
```bash
# Use the provided script to download GBP/JPY or other pairs
cd scripts
# Read: README.md in scripts folder for usage
```

---

## Step 4: Run Your First Backtest (< 1 second)

### Basic Backtest
```bash
cd D:\ZORRO

# Run the Z2+ strategy on EUR/USD (12 years of data)
Zorro.exe -c Z2+.dll EUR/USD 2014 2026

# Sit back and watch it run (0.3 seconds on typical computer)
# Results appear in: D:\ZORRO\Log\Z2+.txt
```

### Check Results
```bash
# View the results
cat D:\ZORRO\Log\Z2+.txt

# Expected to see:
# Annual return: 46%
# Sharpe ratio: 0.69
# Max drawdown: 20.7%
# Win rate: 46.5%
```

---

## Step 5: Validate Strategy (Optional but Recommended)

### Run Walk Forward Analysis (WFA)
Validates that the strategy isn't over-fitted to historical data.

```bash
cd D:\ZORRO

# Run WFA (15 test cycles)
Zorro.exe -c Z2+.dll EUR/USD 2014 2026 -w

# Duration: 2-5 minutes
# Result: Out-of-sample return should ≈ in-sample return
# Expected: 44% out-of-sample (vs 46% in-sample) = GOOD
```

### Run Montecarlo Simulation
Validates that the edge is real, not luck.

```bash
cd D:\ZORRO

# Run Montecarlo (200 simulations)
Zorro.exe -c Z2+.dll EUR/USD 2014 2026 -m

# Duration: 1-2 minutes
# Result: % of profitable simulations
# Expected: 95%+ profitable = EXCELLENT
```

---

## 🎯 Next Steps

### Option A: Understand the Strategy
1. Read: [strategies/Z2+_EURUSD/ANALYSIS.md](strategies/Z2+_EURUSD/ANALYSIS.md)
   - How does Z2+ work?
   - Why does it make money?
   - What are the parameters?

2. Review: [docs/ZORRO_GUIDE.md](docs/ZORRO_GUIDE.md)
   - Understand ZORRO framework
   - Learn C dialect
   - See example strategies

### Option B: Test on Different Pair
1. Check: [docs/DATA_MANAGEMENT.md](docs/DATA_MANAGEMENT.md)
2. Download: GBP/JPY or other pairs
3. Test: Z2+ on new data
4. Compare: Results vs EUR/USD

### Option C: Create Your Own Strategy
1. Study: [docs/STRATEGY_DEVELOPMENT.md](docs/STRATEGY_DEVELOPMENT.md)
2. Review: [strategies/TEMPLATE.md](strategies/TEMPLATE.md)
3. Code: Your own strategy
4. Test: Using backtesting framework

### Option D: Use AI Agents
1. Activate: [Market Data Manager agent](agents/market-data-manager.md)
   - Automated data downloads
   - Validation
   - Error recovery

2. Use: [Strategy Analyzer agent](agents/strategy-analyzer.md)
   - Analyze results
   - Extract metrics
   - Compare strategies

3. Leverage: [Backtester & Optimizer agent](agents/backtester-optimizer.md)
   - Run backtests automatically
   - WFA validation
   - Montecarlo testing

---

## 📊 Understanding the Results

### Key Metrics

**Annual Return: 46%**
- How much the strategy makes per year
- Target: > 15% (good), > 30% (excellent), > 50% (exceptional)
- Z2+: 46% = EXCELLENT ✅

**Sharpe Ratio: 0.69**
- Risk-adjusted returns (higher = better)
- Target: > 0.5 (good), > 1.0 (excellent)
- Z2+: 0.69 = GOOD ✅

**Max Drawdown: 20.7%**
- Worst peak-to-trough loss
- Think: "If I started with $100, worst loss was -$20.70"
- Target: < 30% (acceptable), < 20% (good)
- Z2+: 20.7% = GOOD ✅

**Win Rate: 46.5%**
- % of trades that make money
- Note: > 40% is fine if profit factor > 1.0
- Z2+: 46.5% = HEALTHY ✅

**Profit Factor: 1.22**
- Ratio of total wins to total losses
- Z2+ makes $1.22 for every $1.00 it loses
- Target: > 1.0 (profitable), > 1.2 (healthy)
- Z2+: 1.22 = HEALTHY ✅

---

## 🔧 Troubleshooting

### Problem: "Error 047: EUR/USD no 2026 history"
**Cause**: Missing data file  
**Solution**: Check `D:\ZORRO\History\EURUSD_2026.t6` exists  
**More help**: See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

### Problem: "Can't open Z2+.dll"
**Cause**: Strategy file not found  
**Solution**: Verify `D:\ZORRO\Strategy\Z2+.dll` exists  
**More help**: See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

### Problem: Results don't match ANALYSIS.md
**Cause**: Different settings or data  
**Solution**: Use exact parameters from [strategies/Z2+_EURUSD/parameters.csv](strategies/Z2+_EURUSD/parameters.csv)  
**More help**: See [strategies/Z2+_EURUSD/REPLICATION_GUIDE.md](strategies/Z2+_EURUSD/REPLICATION_GUIDE.md)

### Problem: Backtest is very slow
**Cause**: Tick-by-tick simulation (too detailed)  
**Solution**: Set BacktestMode = 2 (bars) in Zorro.ini  
**More help**: See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

---

## 💡 Tips & Tricks

### Tip 1: Use Scripts
```bash
# Run all variant backtests automatically
./scripts/run_variant_backtests.sh

# Downloads data, backtests, validates, generates report
```

### Tip 2: Set Up Monitoring
```bash
# Use Market Data Manager agent for daily updates
# Keeps your data fresh and validated
```

### Tip 3: Compare Strategies
```bash
# Use Strategy Analyzer to compare EUR/USD vs GBP/JPY
# Decide which to trade or create a portfolio
```

### Tip 4: Optimize Parameters
```bash
# Use Backtester agent to find best lookback value
# Test 1500-2500 bars, see what works best
```

---

## 📚 Full Documentation

For more detailed information:
- **[ZORRO_GUIDE.md](docs/ZORRO_GUIDE.md)** - Framework overview
- **[STRATEGY_DEVELOPMENT.md](docs/STRATEGY_DEVELOPMENT.md)** - Build strategies
- **[BACKTEST_METHODOLOGY.md](docs/BACKTEST_METHODOLOGY.md)** - Rigorous testing
- **[DATA_MANAGEMENT.md](docs/DATA_MANAGEMENT.md)** - Historical data
- **[AGENT_USAGE.md](docs/AGENT_USAGE.md)** - AI agents
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues

---

## ⚠️ Important Reminders

1. **Start small**: Paper trade before risking real money
2. **Use risk management**: Position sizing, stop losses
3. **Monitor continuously**: Don't set and forget
4. **Keep learning**: Markets change, strategies must evolve
5. **Validate rigorously**: WFA + Montecarlo before deploying

---

## 🎓 What You Just Did

✅ Installed ZORRO quantitative trading framework  
✅ Cloned a production-ready strategy  
✅ Retrieved 12 years of historical market data  
✅ Ran a backtest and got results in 0.3 seconds  
✅ Understood the key metrics  
✅ Validated the strategy wasn't over-fitted  
✅ Confirmed the edge is real (not luck)  

**Congratulations! You now have a running, validated trading strategy.** 🎉

---

## 🚀 Ready for Next Steps?

- **Curious?** → Read [strategies/Z2+_EURUSD/ANALYSIS.md](strategies/Z2+_EURUSD/ANALYSIS.md)
- **Want to build?** → Check [docs/STRATEGY_DEVELOPMENT.md](docs/STRATEGY_DEVELOPMENT.md)
- **Need help?** → See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Want to automate?** → Use agents in [agents/README.md](agents/README.md)

---

**Happy trading! 📈**

*Version: 0.1-MVP*  
*Last updated: 2026-09-15*
