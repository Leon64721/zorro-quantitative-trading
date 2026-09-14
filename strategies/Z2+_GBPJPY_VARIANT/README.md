# Z2+ GBP/JPY - Strategic Variant

**Strategy**: Z2+ (adapted)  
**Asset**: GBP/JPY  
**Variant Type**: Cross-pair variant  
**Status**: Ready for design & backtesting  
**Created**: Week 2, Days 11-14

---

## 🎯 Purpose

Test Z2+ strategy on a different currency pair (GBP/JPY) to:
1. Validate if Z2+ logic generalizes across pairs
2. Explore cross-pair diversification
3. Identify pair-specific optimization opportunities
4. Create portfolio approach (EUR/USD + GBP/JPY)

---

## 📋 Rationale for GBP/JPY

### Why GBP/JPY?
- **Complementary to EUR/USD**: Different market drivers
- **Liquid**: Major currency pair, low spreads
- **Volatile**: ~15-20% annual volatility (vs 10-12% EUR/USD)
- **Correlated but distinct**: Can add diversification
- **Data availability**: Can obtain from major brokers

### Expected Differences vs EUR/USD
- **Volatility**: GBP/JPY is more volatile (higher risk/reward)
- **Trend tendency**: GBP/JPY has stronger trending characteristics
- **Correlation**: Not perfectly correlated (diversification benefit)
- **Returns**: Potentially higher (more volatile) but also riskier

---

## 📋 Backtest Configuration

```
Asset:           GBP/JPY
Period:          2013-01-01 to 2018-12-31 (6 years available)
                 [Note: May extend if more data obtained]
Bar Period:      1 hour (same as EUR/USD)
Lookback:        2000 bars (maintain same as EUR/USD)
Lot Size:        1000 units (same as EUR/USD)
Backtest Mode:   Ticks (5.0 sec slippage)
Spread:          1.5 pips (slightly wider than EUR/USD)
Account:         AssetsFix
```

---

## 🔄 Parameter Adaptation Strategy

### Keep the Same
- **Lookback**: 2000 bars (proven optimal)
- **Lot size**: 1000 units (scale proportionally)
- **Indicators**: CT_75 and HP_59 components (if available)

### Potentially Adjust
- **Entry thresholds**: May need tuning for GBP/JPY volatility
- **Stop-loss distances**: Wider stops due to higher volatility
- **Position sizing**: May need reduction due to higher drawdown risk

### Test via Walk-Forward
- Run WFA on GBP/JPY data
- Identify if parameters need re-optimization
- Validate on out-of-sample data

---

## 🚀 Implementation Plan

### Phase 1: Data Acquisition (Days 11-12)
```
Step 1: Check if GBP/JPY data already available
        ls D:\ZORRO\History\GBPJPY*.t6
        
Step 2: If missing, download from FXCM or OANDA
        Zorro.exe -c download_gbpjpy.c
        (or manual download + CSVtoHistory.c conversion)
        
Step 3: Validate downloaded files
        Expected: 6 files (2013-2018)
        Each: ~2.5-3 MB
        
Expected time: 30-60 minutes
```

### Phase 2: Backtest Baseline (Day 12)
```
Step 1: Run standard backtest
        Zorro.exe -c Z2+.dll GBP/JPY 2013 2018
        
Step 2: Extract results
        Expected file: D:\ZORRO\Log\Z2+_gbpjpy.txt
        
Step 3: Quick analysis
        Expected: 30-50% annual (GBP/JPY more volatile)
        
Expected time: < 5 minutes processing
```

### Phase 3: Validation (Day 13)
```
Step 1: Run WFA (15 cycles)
        Zorro.exe -c Z2+.dll GBP/JPY 2013 2018 -w
        
        Check: Out-of-sample ≈ in-sample
        Duration: 2-5 minutes
        
Step 2: Run Montecarlo (200 sims)
        Zorro.exe -c Z2+.dll GBP/JPY 2013 2018 -m
        
        Check: > 95% profitable
        Duration: 1-2 minutes
        
Expected time: 10-15 minutes
```

### Phase 4: Analysis & Comparison (Day 14)
```
Step 1: Extract both EUR/USD and GBP/JPY results
Step 2: Compare metrics side-by-side
Step 3: Analyze differences
Step 4: Generate comparison report
Step 5: Make recommendations

Expected time: 1-2 hours
```

---

## 📊 Expected Results

### Conservative Estimate
Based on GBP/JPY volatility and characteristics:

| Metric | EUR/USD | GBP/JPY Est. | Notes |
|--------|---------|-------------|-------|
| **Annual Return** | 46% | 35-50% | Higher volatility |
| **Sharpe Ratio** | 0.69 | 0.60-0.75 | Similar risk-adjusted |
| **Max Drawdown** | 20.7% | 25-35% | Higher volatility |
| **Win Rate** | 46.5% | 44-48% | Similar or slightly lower |
| **Profit Factor** | 1.22 | 1.15-1.30 | Similar quality |

### Key Questions to Answer
1. **Does Z2+ generalize?** (works on GBP/JPY too?)
2. **Is it better or worse?** (Higher returns worth higher risk?)
3. **Is it correlated?** (Diversification benefit?)
4. **Which is better?** (EUR/USD or GBP/JPY?)
5. **Should we combine?** (Both in portfolio?)

---

## 🎯 Success Criteria

- [ ] GBP/JPY data obtained and validated
- [ ] Backtest runs without errors
- [ ] WFA shows robust out-of-sample performance
- [ ] Montecarlo shows 95%+ profitable
- [ ] Results analyzed and documented
- [ ] Comparison report completed
- [ ] Recommendation made (EUR/USD only, both, or neither)

---

## 📁 Files in This Directory

- `README.md` - This file
- `Z2+_GBPJPY.c` - Strategy code (adapted if needed)
- `BACKTEST_LOG.txt` - Results from backtest (to be created)
- `WFA_REPORT.txt` - Walk Forward Analysis (to be created)
- `MONTECARLO_REPORT.txt` - Montecarlo validation (to be created)
- `COMPARISON_VS_EURUSD.md` - Side-by-side analysis (to be created)

---

## ⚠️ Risk Assessment

### Potential Issues
1. **Data availability**: GBP/JPY 2013-2018 may not be available
   - Fallback: Use available years (2015-2018)
   - Or skip this variant and focus on EUR/USD only

2. **Over-optimization risk**: Parameters tuned for EUR/USD
   - Mitigation: Use WFA to validate
   - Adjust if needed based on results

3. **Higher drawdown**: GBP/JPY is more volatile
   - Mitigation: Use VaR analysis to size positions
   - Consider half-sizing if maximum DD > 40%

### Contingency Plan
If GBP/JPY doesn't work well:
- Keep Z2+ EUR/USD as main strategy
- Skip GBP/JPY variant
- Focus on GitHub release with EUR/USD only
- Mark GBP/JPY as post-MVP exploration

---

## 🔄 Integration with Portfolio

### Diversification Benefit
If both EUR/USD and GBP/JPY work well:
```
Combined Portfolio:
- 60% Z2+ EUR/USD (lower volatility, proven)
- 40% Z2+ GBP/JPY (higher returns, diversification)

Expected:
- Combined annual return: 40-45%
- Combined Sharpe: 0.70-0.75
- Max DD: 22-25% (lower than GBP/JPY alone)
- Better risk-adjusted returns
```

---

## 📊 Data Notes

### GBP/JPY Characteristics
- **Pair**: British Pound / Japanese Yen
- **Volatility**: 15-20% annual (higher than EUR/USD)
- **Range**: Trades 130-160 (wide range)
- **Correlation with EUR/USD**: ~0.6 (moderate)
- **Correlation with risk sentiment**: High (carry trade proxy)
- **Best for**: Trend-following strategies in risk-on periods

### Market Regimes (2013-2018)
- **2013-2014**: Strong yen weakness, trending up (good)
- **2015**: Yen strength (choppy)
- **2016**: Range-bound (choppy)
- **2017**: Strong trend up (good)
- **2018**: Trending down (good)

Expected: Z2+ should do well in 2013-2014, 2017-2018 (trendy) and worse in 2015-2016 (choppy)

---

## 📈 Success Path

**If GBP/JPY performs well**:
- Include in GitHub as second variant
- Document parameter adjustments
- Create portfolio recommendation
- Plan for live trading testing

**If GBP/JPY underperforms**:
- Document findings (why it doesn't work)
- Keep EUR/USD as primary
- Shelf GBP/JPY for post-MVP
- Focus on GitHub release with EUR/USD

---

**Status**: Ready for data acquisition and backtesting  
**Next**: Download GBP/JPY data (if available) or confirm skip  
**Timeline**: Days 11-14 of Week 2
