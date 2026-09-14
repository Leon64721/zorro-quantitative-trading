# 🔄 Code Converter Agent - Detailed Workflows

**Purpose**: Step-by-step procedures for converting trading algorithms to ZORRO with validation  
**Workflows**: 4 complete procedures  
**Time per Workflow**: 15 min - 2 hours depending on complexity

---

## 📋 Workflow 1: Quick Conversion (15-30 minutes)

**Use When**: Simple algorithm, quick validation needed  
**Output**: ZORRO C code + basic backtest  
**Validation Level**: Basic (no Montecarlo)

### Step 1: Receive Algorithm Code
```
Input: MT4 code (any format)
Example:
// Simple Moving Average Crossover
if (iMA(NULL, 0, 20, 0, MODE_SMA, PRICE_CLOSE, 1) > 
    iMA(NULL, 0, 50, 0, MODE_SMA, PRICE_CLOSE, 1)) {
    OrderSend(Symbol(), OP_BUY, 0.1, Ask, 10, Bid-50*Point, Bid+100*Point);
}
```

### Step 2: Analyze Algorithm Structure
```
Analysis Process:
1. Identify indicators used
   ├─ iMA() → Moving Average (SMA)
   ├─ Parameters: Period 20 and 50
   └─ Applied to: Close price

2. Identify entry/exit logic
   ├─ Entry: MA20 > MA50 (bullish crossover)
   ├─ Exit: Implicit (TP/SL)
   └─ Position size: 0.1 lots

3. Identify risk parameters
   ├─ Stop Loss: 50 pips
   ├─ Take Profit: 100 pips
   └─ Risk/Reward: 1:2
```

### Step 3: Extract Parameters
```
Parameter Extraction:
┌─────────────────┬──────────┬─────┬─────┬──────┐
│ Parameter       │ Current  │ Min │ Max │ Type │
├─────────────────┼──────────┼─────┼─────┼──────┤
│ MA_Fast_Period  │ 20       │ 5   │ 50  │ int  │
│ MA_Slow_Period  │ 50       │ 20  │ 200 │ int  │
│ Stop_Loss_Pips  │ 50       │ 20  │ 200 │ float│
│ Take_Profit_Pips│ 100      │ 50  │ 300 │ float│
│ Lot_Size        │ 0.1      │ 0.01│ 1.0 │ float│
└─────────────────┴──────────┴─────┴─────┴──────┘
```

### Step 4: Create ZORRO C Template
```c
// Converted Algorithm: MA Crossover
// Original: MT4 EA
// Conversion Date: 2026-09-15

#include <profiles.c>

// Variables
int ma_fast = 20;    // Period for fast MA
int ma_slow = 50;    // Period for slow MA
float stop_loss = 50;    // Stop loss in pips
float take_profit = 100; // Take profit in pips
float lot_size = 0.1;    // Position size

void run() {
    // Entry logic
    var ma20 = SMA(asset(), ma_fast);
    var ma50 = SMA(asset(), ma_slow);
    
    if (ma20 > ma50 && !is_open(0)) {
        // Enter long position
        enterLong(lot_size);
        setStop(stop_loss * PIP, RISK_ABSOLUTE);
        setProfit(take_profit * PIP, PROFIT_ABSOLUTE);
    }
}
```

### Step 5: Request Backtest Parameters
```
Agent Asks User:
"What parameters for backtesting?"

Required:
1. Timeframe? (M5/M15/H1/D1/W1) → User: "H1"
2. Symbol? (EURUSD/GC/CL/ES) → User: "EURUSD"
3. Start Date? (YYYYMMDD) → User: "20200101"
4. End Date? (YYYYMMDD) → User: "20260915"
5. Account Size? ($ or %) → User: "$10000"
6. Max Risk per Trade? (%) → User: "2%"

Stored:
{
  timeframe: "H1",
  symbol: "EURUSD",
  start_date: 20200101,
  end_date: 20260915,
  account: 10000,
  risk: 0.02
}
```

### Step 6: Setup ZORRO Environment
```bash
# Create backtest directory
mkdir E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO\backtest_runs\MA_Crossover_EURUSD_H1

# Copy required files
copy agents\code-converter-optimizer.md → backtest_runs\
copy strategies\Z2+_EURUSD\parameters.csv → backtest_runs\

# Create backtest script
cat > backtest_runs\run_ma_crossover.c << 'EOF'
#define ASSET "EURUSD"
#define START_DATE 20200101
#define END_DATE 20260915
#define TIMEFRAME 3600  // 1 hour = 3600 seconds

#include <profiles.c>
#include "ma_crossover_converted.c"

void main() {
    // Load converted algorithm
    run();
}
EOF
```

### Step 7: Compile and Run Backtest
```
Compilation:
✅ Syntax check: PASS
✅ Variable check: PASS
✅ Include check: PASS
✅ Compilation: SUCCESS

Execution:
Time: 2-5 seconds (H1 data 2020-2026)
Data points: ~43,800 bars
Trades executed: 145
Status: COMPLETE
```

### Step 8: Extract Results
```
Quick Results:
┌──────────────────┬────────┐
│ Metric           │ Value  │
├──────────────────┼────────┤
│ Total Return     │ 28.5%  │
│ Win Rate         │ 52.1%  │
│ Profit Factor    │ 1.18   │
│ Max Drawdown     │ 15.2%  │
│ Sharpe Ratio     │ 0.65   │
│ Trades           │ 145    │
└──────────────────┴────────┘
```

### Step 9: Quick Report
```
Conversion Report: MA Crossover on EURUSD (H1)

Algorithm: Moving Average Crossover (MA 20/50)
Period: 2020-2026
Quality: Quick Validation ✓

Result: VIABLE - Algorithm shows edge
Next: Run full validation with Montecarlo
```

---

## 📈 Workflow 2: Full Validation (45-90 minutes)

**Use When**: Need confidence in algorithm, want Montecarlo validation  
**Output**: Full report with Montecarlo + robustness analysis  
**Validation Level**: Professional (Montecarlo + MC Sensitivity)

### Steps 1-8: Same as Workflow 1

### Step 9: Setup Montecarlo Validation
```c
// ZORRO Montecarlo configuration
#define MC_RUNS 200      // Number of simulations
#define MC_CONFIDENCE 95 // Confidence interval

void montecarlo() {
    int profitable_runs = 0;
    float results[200];
    
    for (int i = 0; i < MC_RUNS; i++) {
        // Shuffle trade order (preserve distribution)
        results[i] = simulate_trades_shuffled();
        
        if (results[i] > 0) {
            profitable_runs++;
        }
    }
    
    float confidence = (profitable_runs / MC_RUNS) * 100;
    // Calculate 95% CI
    // ...
}
```

### Step 10: Execute Montecarlo (200 simulations)
```
Montecarlo Simulation Running...
Progress: [████████████████████] 100%

Results:
┌─────────────────────────┬──────────┐
│ Run                     │ Return   │
├─────────────────────────┼──────────┤
│ Original Order          │ +28.5%   │
│ MC Simulation 1         │ +27.3%   │
│ MC Simulation 2         │ +29.8%   │
│ MC Simulation 3         │ +26.1%   │
│ ... (197 more)          │ ...      │
│ MC Simulation 200       │ +28.9%   │
├─────────────────────────┼──────────┤
│ Mean (MC runs)          │ +27.8%   │
│ Std Dev                 │ ±2.3%    │
│ 95% CI Lower            │ +23.3%   │
│ 95% CI Upper            │ +32.3%   │
│ % Profitable Runs       │ 94%      │
└─────────────────────────┴──────────┘
```

### Step 11: Robustness Testing
```
Test 1: Parameter Sensitivity
────────────────────────────
Parameter: MA_Fast (original 20)
Range: 10-30 (step 2)

Results:
┌──────┬────────┬──────────┐
│ MA_F │ Return │ Drawdown │
├──────┼────────┼──────────┤
│ 10   │ +15.2% │ 22.1%    │
│ 12   │ +18.5% │ 19.3%    │
│ 14   │ +22.1% │ 17.8%    │
│ 16   │ +26.3% │ 16.2%    │
│ 18   │ +27.9% │ 15.5%    │
│ 20   │ +28.5% │ 15.2%    │ ← Original
│ 22   │ +28.1% │ 15.1%    │
│ 24   │ +27.2% │ 15.3%    │
│ 26   │ +25.3% │ 16.1%    │
│ 28   │ +22.8% │ 17.2%    │
│ 30   │ +19.1% │ 18.9%    │
└──────┴────────┴──────────┘

Recommendation: Parameter is ROBUST
Range (18-24 maintains 27%+ return)
```

### Step 12: Walk Forward Analysis (Optional)
```
Test 2: Market Regime Changes
──────────────────────────────
2020: Trend (Return +35%, Sharpe 0.78)
2021: Choppy (Return +12%, Sharpe 0.22)
2022: Crash (Return -18%, Sharpe -0.45)
2023: Recovery (Return +42%, Sharpe 0.85)
2024: Range (Return +8%, Sharpe 0.15)
2025: Trend (Return +38%, Sharpe 0.82)
2026: Mixed (Return +22%, Sharpe 0.55)

Edge Assessment:
✓ Profitable in trending markets
✗ Weak in ranging markets
→ Recommendation: Add market regime filter
```

### Step 13: Generate Comprehensive Report
```
═══════════════════════════════════════════════════════
        CODE CONVERSION & VALIDATION REPORT
═══════════════════════════════════════════════════════

ALGORITHM: Moving Average Crossover (MA 20/50)
ORIGINAL PLATFORM: MT4
CONVERTED TO: ZORRO C
BACKTEST PERIOD: 2020-2026 (H1 EURUSD)
VALIDATION: FULL (Montecarlo + Robustness)

───────────────────────────────────────────────────────
1. CONVERSION QUALITY
───────────────────────────────────────────────────────
Logic Match: 100% ✓
Code Quality: Professional ✓
Performance: Optimized ✓
Comments: Extensive ✓
Error Handling: Complete ✓

───────────────────────────────────────────────────────
2. BACKTEST RESULTS
───────────────────────────────────────────────────────
Total Return: 28.5%
Win Rate: 52.1%
Profit Factor: 1.18
Sharpe Ratio: 0.65
Max Drawdown: 15.2%
Total Trades: 145
Win/Loss: 76/69

───────────────────────────────────────────────────────
3. MONTECARLO VALIDATION (200 runs)
───────────────────────────────────────────────────────
Original: 28.5%
MC Mean: 27.8%
MC Std Dev: ±2.3%
95% CI: 23.3% - 32.3%
Profitable Runs: 94% (188/200)
Edge Assessment: REAL ✓ (Statistical significance)

───────────────────────────────────────────────────────
4. ROBUSTNESS TESTING
───────────────────────────────────────────────────────
MA_Fast (18-24): ROBUST
MA_Slow (45-55): ROBUST
Stop Loss (40-60): SEMI-ROBUST (optimize)
Take Profit (80-120): ROBUST

Overall Assessment: ROBUST ✓

───────────────────────────────────────────────────────
5. MARKET REGIME ANALYSIS
───────────────────────────────────────────────────────
Trending Markets: +35-42% (Excellent)
Ranging Markets: +8-12% (Weak)
Recommendation: Add regime filter for 5-10% improvement

───────────────────────────────────────────────────────
6. RECOMMENDATIONS
───────────────────────────────────────────────────────
✓ Algorithm is viable for live trading
✓ Edge is real (validated by Montecarlo)
✓ Parameter settings are robust
→ Optimize Stop Loss (currently sub-optimal)
→ Consider market regime filter
→ Start with paper trading on small account
→ Monitor for regime changes

───────────────────────────────────────────────────────
7. NEXT STEPS
───────────────────────────────────────────────────────
IMMEDIATE:
[ ] Review this report
[ ] Approve for paper trading
[ ] Setup paper account

SHORT-TERM (2-4 weeks):
[ ] Run on real data (paper trading)
[ ] Monitor Montecarlo confidence holds
[ ] Optimize for market regimes

LONG-TERM (1-3 months):
[ ] Live trading on small size
[ ] Systematic scaling up
[ ] Enhancement with ML indicators

═══════════════════════════════════════════════════════
Report Generated: 2026-09-15
ZORRO Backtest Validator
═══════════════════════════════════════════════════════
```

---

## 🎯 Workflow 3: Parameter Optimization (1-2 hours)

**Use When**: Want to find best parameters  
**Output**: Optimized parameters + optimization report  
**Validation Level**: Full with parameter grid search

### Steps 1-8: Same as Workflow 1

### Step 9: Setup Optimization
```
Optimization Space:
┌─────────────┬────────┬─────┬─────┬─────┐
│ Parameter   │ Start  │ Min │ Max │ Step│
├─────────────┼────────┼─────┼─────┼─────┤
│ MA_Fast     │ 20     │ 5   │ 50  │ 2   │
│ MA_Slow     │ 50     │ 20  │ 200 │ 5   │
│ Stop_Loss   │ 50     │ 20  │ 100 │ 10  │
│ Take_Profit │ 100    │ 50  │ 300 │ 25  │
└─────────────┴────────┴─────┴─────┴─────┘

Total combinations: (23 × 37 × 9 × 10) = 76,410
Estimated time: 2-3 hours
```

### Step 10: Run Grid Search
```
Grid Search Progress:
[████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 25%

Best so far:
MA_Fast=18, MA_Slow=48, SL=40, TP=120 → Return: 32.1%
```

### Step 11: Find Optimal Parameters
```
Optimization Results:
┌──────────────────────────┬──────────┐
│ Parameter Set            │ Return   │
├──────────────────────────┼──────────┤
│ #1 Optimal               │ +35.2%   │
│ #2                       │ +34.8%   │
│ #3                       │ +34.1%   │
│ #4                       │ +33.9%   │
│ #5                       │ +33.7%   │
└──────────────────────────┴──────────┘

OPTIMAL FOUND:
MA_Fast = 18
MA_Slow = 48
Stop_Loss = 40 pips
Take_Profit = 120 pips
Return: 35.2% (vs original 28.5% → +6.7%)
Sharpe: 0.72 (vs 0.65 → +0.07)
```

### Step 12: Validate Optimal Parameters
```
Montecarlo on Optimized Parameters:
MC Mean: 34.6%
95% CI: 30.1% - 39.1%
Profitable: 96%
Confirmation: ✓ VALIDATED
```

---

## 🔍 Workflow 4: Algorithm Comparison (1-2 hours)

**Use When**: Compare original MT4 vs converted ZORRO  
**Output**: Side-by-side comparison report  
**Use**: Verify conversion quality

### Step 1: Run Original Algorithm
```
If accessible (MT4 environment):
Run original EA on same data
Record all metrics
```

### Step 2: Run Converted Algorithm
```
Run ZORRO version on same data
Record identical metrics
```

### Step 3: Compare Results
```
COMPARISON REPORT: Original MT4 vs Converted ZORRO
──────────────────────────────────────────────────

Metric              Original (MT4)  Converted (ZORRO)  Diff    Status
────────────────────────────────────────────────────────────────────
Total Return        28.2%           28.5%             +0.3%   ✓ Match
Win Rate            51.8%           52.1%             +0.3%   ✓ Match
Profit Factor       1.17            1.18              +0.01   ✓ Match
Sharpe Ratio        0.64            0.65              +0.01   ✓ Match
Max Drawdown        15.3%           15.2%             -0.1%   ✓ Match
Total Trades        145             145               0       ✓ Identical

Trade-by-Trade:
Trade #1:  Buy 1.2340 → Sell 1.2380  (Original & Zorro match ✓)
Trade #2:  Buy 1.2345 → Sell 1.2385  (Original & Zorro match ✓)
...
Trade #145: Sell 1.2320 → Buy 1.2290 (Original & Zorro match ✓)

Conversion Quality: EXCELLENT ✓
Logic Match: 100%
Performance Delta: < 0.5%
```

---

## 📊 Summary of Workflows

| Workflow | Time | Validation | Use Case | Output |
|----------|------|-----------|----------|--------|
| **1. Quick** | 15-30 min | Basic | Simple algorithms | Code + Quick test |
| **2. Full** | 45-90 min | Professional | Production | Full report |
| **3. Optimize** | 1-2 hours | Grid search | Parameter tuning | Optimal params |
| **4. Compare** | 1-2 hours | Comparison | Verification | Quality check |

---

## 🚀 How to Activate These Workflows

**In Claude Code:**
```
User: "Convert my MT4 EA and run full validation with Montecarlo"

Agent:
1. Asks for algorithm code
2. Asks for backtest parameters
3. Executes Workflow 2 (Full Validation)
4. Delivers comprehensive report
```

---

## 📋 Checklist for Each Workflow

### Pre-Conversion
- [ ] Algorithm code provided
- [ ] Platform identified (MT4/MT5/etc)
- [ ] Backtest parameters ready
- [ ] Data available/downloadable

### During Conversion
- [ ] Code analyzed
- [ ] Parameters extracted
- [ ] ZORRO template created
- [ ] Syntax verified
- [ ] Compilation successful

### Post-Conversion
- [ ] Backtest completed
- [ ] Results extracted
- [ ] Montecarlo executed (if full)
- [ ] Robustness tested (if full)
- [ ] Report generated
- [ ] Delivered to user

---

*Workflows Created: 2026-09-15*  
*Ready for Implementation*  
*Version: 1.0-MVP*
