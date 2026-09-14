# ZORRO Robustness Suite - Stage A: Screening

**Generated**: 2026-09-14T21:16:45.322Z
**Total Strategies**: 25
**Estimated Time**: ~3-4 hours (depending on data/backtesting speed)

## Instructions

1. **Open ZORRO** at `D:\ZORRO\Zorro.exe`
2. For each strategy below:
   - Open the `.c` script file (in `Strategy` folder)
   - Click **Test** mode to run a single backtest
   - Check for **compilation errors** (fix if any)
   - Wait for completion (~2-5 min per strategy)
   - Note the final metrics (Profit Factor, Win Rate, Sharpe)
   - Mark as ✅ done

3. **After completing all 25 backtests:**
   - Run: `node run-robustness-suite.js parse --stage A`
   - This will extract metrics and prepare Stage B

---

## Screening Checklist

| # | Strategy | Asset | TF | Indicators | Script | Status | PF | Win% |
|----|----------|-------|----|----|--------|--------|-----|------|
| 1 | STRATEGY_RANDOM_69 | XAU/USD | 60 | WMA+MACD+EMA+BBands | `RB_0069_STRATEGY_RANDOM_69_Base.c` | [ ] | - | - |
| 2 | STRATEGY_RANDOM_24 | SPX500 | 60 | WMA+MACD | `RB_0024_STRATEGY_RANDOM_24_Base.c` | [ ] | - | - |
| 3 | STRATEGY_RANDOM_367 | NAS100 | 60 | WMA+EMA | `RB_0367_STRATEGY_RANDOM_367_Base.c` | [ ] | - | - |
| 4 | STRATEGY_RANDOM_266 | EUR/USD | 5 | CCI | `RB_0266_STRATEGY_RANDOM_266_Base.c` | [ ] | - | - |
| 5 | STRATEGY_RANDOM_46 | UK100 | 240 | CCI+ATR+RSI | `RB_0046_STRATEGY_RANDOM_46_Base.c` | [ ] | - | - |
| 6 | STRATEGY_RANDOM_349 | XAU/USD | 240 | CCI | `RB_0349_STRATEGY_RANDOM_349_Base.c` | [ ] | - | - |
| 7 | STRATEGY_RANDOM_308 | NAS100 | 60 | EMA | `RB_0308_STRATEGY_RANDOM_308_Base.c` | [ ] | - | - |
| 8 | STRATEGY_RANDOM_472 | XAU/USD | 240 | EMA+Stochastic+WMA+MACD | `RB_0472_STRATEGY_RANDOM_472_Base.c` | [ ] | - | - |
| 9 | STRATEGY_RANDOM_134 | XAU/USD | 60 | EMA+MACD+EMA | `RB_0134_STRATEGY_RANDOM_134_Base.c` | [ ] | - | - |
| 10 | STRATEGY_RANDOM_309 | GBP/USD | 15 | RSI | `RB_0309_STRATEGY_RANDOM_309_Base.c` | [ ] | - | - |
| 11 | STRATEGY_RANDOM_36 | XAU/USD | 5 | RSI+DEMA+BBands+ADX | `RB_0036_STRATEGY_RANDOM_36_Base.c` | [ ] | - | - |
| 12 | STRATEGY_RANDOM_279 | UK100 | 60 | RSI | `RB_0279_STRATEGY_RANDOM_279_Base.c` | [ ] | - | - |
| 13 | STRATEGY_RANDOM_359 | US30 | 60 | ADX+Stochastic+ATR | `RB_0359_STRATEGY_RANDOM_359_Base.c` | [ ] | - | - |
| 14 | STRATEGY_RANDOM_35 | UK100 | 5 | ADX | `RB_0035_STRATEGY_RANDOM_35_Base.c` | [ ] | - | - |
| 15 | STRATEGY_RANDOM_318 | US30 | 60 | ADX+WMA+WMA | `RB_0318_STRATEGY_RANDOM_318_Base.c` | [ ] | - | - |
| 16 | STRATEGY_RANDOM_85 | GER30 | 60 | ROC | `RB_0085_STRATEGY_RANDOM_85_Base.c` | [ ] | - | - |
| 17 | STRATEGY_RANDOM_71 | GBP/USD | 60 | ROC | `RB_0071_STRATEGY_RANDOM_71_Base.c` | [ ] | - | - |
| 18 | STRATEGY_RANDOM_203 | EUR/USD | 60 | ROC+BBands | `RB_0203_STRATEGY_RANDOM_203_Base.c` | [ ] | - | - |
| 19 | STRATEGY_RANDOM_251 | UK100 | 5 | ATR+BBands+ROC | `RB_0251_STRATEGY_RANDOM_251_Base.c` | [ ] | - | - |
| 20 | STRATEGY_RANDOM_233 | GBP/USD | 5 | ATR+BBands | `RB_0233_STRATEGY_RANDOM_233_Base.c` | [ ] | - | - |
| 21 | STRATEGY_RANDOM_348 | XAU/USD | 5 | ATR+EMA+EMA+SMA | `RB_0348_STRATEGY_RANDOM_348_Base.c` | [ ] | - | - |
| 22 | STRATEGY_RANDOM_111 | EUR/USD | 240 | MACD | `RB_0111_STRATEGY_RANDOM_111_Base.c` | [ ] | - | - |
| 23 | STRATEGY_RANDOM_307 | GER30 | 15 | MACD+BBands+ATR | `RB_0307_STRATEGY_RANDOM_307_Base.c` | [ ] | - | - |
| 24 | STRATEGY_RANDOM_135 | NAS100 | 240 | MACD | `RB_0135_STRATEGY_RANDOM_135_Base.c` | [ ] | - | - |
| 25 | STRATEGY_RANDOM_273 | XAU/USD | 240 | BBands | `RB_0273_STRATEGY_RANDOM_273_Base.c` | [ ] | - | - |

## Notes

- **Mode**: Test (single backtest)
- **Location**: `D:\ZORRO\Strategy\RB_*.c` files
- **Check for**: Compilation errors, missing data, negative results
- **Time per test**: 2-5 minutes depending on asset/timeframe
- **Log file**: `D:\ZORRO\Log\<scriptname>.txt` (contains all metrics)

## Next Step

Once all 25 are ✅ complete, run Stage B:
```bash
node run-robustness-suite.js stage-b --finalists 8
```

---

**Tip**: Keep ZORRO Strategy panel open and drag scripts from file browser to the strategy area for quick loading.
