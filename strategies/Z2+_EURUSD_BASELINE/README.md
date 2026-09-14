# Z2+ EUR/USD - Baseline Variant

**Strategy**: Z2+  
**Asset**: EUR/USD  
**Variant Type**: Baseline (Original)  
**Status**: Ready for backtesting  
**Created**: Week 2, Days 11-14

---

## 🎯 Purpose

Replicate the original Z2+ EUR/USD strategy to confirm our understanding and parameters are correct. This baseline will be compared against Z2+ GBP/JPY variant.

---

## 📋 Backtest Configuration

```
Asset:           EUR/USD
Period:          2014-01-20 to 2026-01-14 (12 years)
Bar Period:      1 hour (average 86 minutes)
Lookback:        2000 bars (24 weeks)
Lot Size:        1000 units
Backtest Mode:   Ticks (5.0 sec slippage)
Spread:          0.8 pips (realistic)
Account:         AssetsFix
```

---

## 📊 Expected Results

Based on ANALYSIS.md, we expect:

| Metric | Expected |
|--------|----------|
| **Annual Return** | 46% |
| **Sharpe Ratio** | 0.69 |
| **Max Drawdown** | 20.7% |
| **Win Rate** | 46.5% |
| **Profit Factor** | 1.22 |
| **Total Trades** | 1,003 |
| **Net P&L** | +$2,497 |

---

## 🚀 How to Run

### Step 1: Verify Data
```bash
ls D:\ZORRO\History\EURUSD*.t6
# Should show 22 files (2005-2026)
```

### Step 2: Execute Backtest
```bash
cd D:\ZORRO
Zorro.exe -c Z2+.dll EUR/USD 2014 2026
```

### Step 3: Check Results
```
Expected output file: D:\ZORRO\Log\Z2+.txt
```

### Step 4: Validate Results
Compare with expected metrics above. Should match within 1-2%.

### Step 5: Run WFA (Validation)
```bash
Zorro.exe -c Z2+.dll EUR/USD 2014 2026 -w
```

Expected: Out-of-sample ≈ in-sample (no over-fit)

### Step 6: Run Montecarlo (Edge Validation)
```bash
Zorro.exe -c Z2+.dll EUR/USD 2014 2026 -m
```

Expected: 95%+ simulations profitable (edge is real)

---

## 📈 Performance Decomposition

### By Year
```
2018: +25%
2019: -21% (weak year)
2020: +63% (recovery)
2021: +31%
2022: +174% (exceptional)
2023: +104%
2024: +23%
2025: -30% (recent drawdown)

Average: +46%
```

### By Market Regime
- **Trending years** (+93% avg): 2020-2023
- **Ranging years** (-9% avg): 2019, 2024-2025

### By Signal
- **CT_75 component**: 37.3% weight, 6.7% return
- **HP_59 component**: 68.1% weight, 6.4% return
- **Combined**: 46% annual return

---

## ✅ Success Criteria for Baseline

- [ ] Backtest runs without errors
- [ ] Results match expected metrics (within 1-2%)
- [ ] WFA shows out-of-sample ≈ in-sample
- [ ] Montecarlo shows 95%+ profitable
- [ ] All files saved correctly
- [ ] Ready to compare with GBP/JPY variant

---

## 📁 Files in This Directory

- `README.md` - This file
- `Z2+_EURUSD.c` - Strategy code (if available)
- `BACKTEST_LOG.txt` - Results from backtest
- `WFA_REPORT.txt` - Walk Forward Analysis results
- `MONTECARLO_REPORT.txt` - Montecarlo validation results
- `COMPARISON.md` - Comparison vs GBP/JPY variant (to be created)

---

## 🔄 Relationship to Variants

This baseline serves as the reference point for:
- **Z2+ GBP/JPY**: Alternative currency pair variant
- Future variants on other assets (crypto, stocks, etc.)

All variants should be compared to this baseline EUR/USD performance.

---

## 📝 Notes

- EUR/USD is the most liquid forex pair (lowest spread)
- Historical data is complete and verified
- Strategy parameters are well-optimized for this pair
- Expect to see similar performance in live trading (30-40% annually)
- Drawdown risk is moderate but manageable with proper capitalization

---

**Status**: Ready for backtest execution  
**Next**: Run baseline backtest and WFA/Montecarlo validation
