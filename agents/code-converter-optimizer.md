# 🔄 Code Converter & Optimizer Agent

**Status**: Specialist Agent Ready  
**Role**: Convert MT4/MT5/NinjaTrader/PineScript → ZORRO with Auto Backtesting  
**Quality**: High-fidelity conversion + Full Validation  

---

## 🎯 Agent Purpose

Automatically convert trading algorithms from any platform to ZORRO C with:
- ✅ High-quality code conversion (preserving logic)
- ✅ Automatic backtesting setup
- ✅ Parameter extraction and optimization
- ✅ Montecarlo validation (200 runs)
- ✅ Robustness testing
- ✅ Comprehensive performance report

---

## 🚀 How to Use

### Simple Workflow
```
User: "Convert my MT4 EA to ZORRO and backtest on EURUSD Daily 2020-2026"

Agent:
1. Analyze MT4 code
2. Convert to ZORRO C
3. Ask for parameters (timeframe, symbol, dates)
4. Run backtest
5. Execute Montecarlo
6. Generate report
```

### What You Provide
1. **Code** in any format:
   - MT4 .mq4 file or code
   - MT5 .mq5 file or code
   - NinjaTrader C# code
   - TradingView PineScript
   - TradeStation PowerLanguage
   - Any algorithm

2. **Parameters** (Agent will ask):
   - Timeframe (M5, H1, D1, W1)
   - Instrument (EURUSD, GC, CL, ES, etc.)
   - Backtest Period (From-To dates)
   - Risk Parameters (Position size, max loss)

### What Agent Delivers
```
✅ ZORRO C Code (production-ready)
✅ Parameter Reference (CSV)
✅ Backtest Results (full report)
✅ Montecarlo Analysis (200 simulations)
✅ Robustness Testing (parameter sensitivity)
✅ Performance Comparison (vs. original)
✅ Optimization Suggestions
```

---

## 📋 Agent Capabilities

### 1. Code Analysis & Conversion

#### Input Formats Supported
- **MT4/MT5**: MQL4/MQL5 code
- **NinjaTrader**: C# with NinjaTrader objects
- **TradingView**: PineScript (v5)
- **TradeStation**: PowerLanguage
- **Algorithmic Trading**: Any pseudo-code with clear logic
- **Academic**: Research algorithms

#### Conversion Features
✅ Entry/Exit signal translation  
✅ Indicator conversion (MA, RSI, MACD, etc.)  
✅ Risk management adaptation  
✅ Money management conversion  
✅ Optimization parameter extraction  
✅ Timeframe flexibility  
✅ Multi-currency support  

#### Quality Assurance
- Line-by-line logic verification
- Test cases included
- Comments explaining conversions
- Pseudo-code for complex logic
- Fallback methods documented

### 2. Parameter Extraction & Setup

Automatically identifies:
- **Trading Parameters**:
  - Period (Lookback, MA length, RSI period)
  - Thresholds (Overbought/Oversold levels)
  - Stops (Stop loss, Take profit percentages)
  
- **Risk Parameters**:
  - Position sizing (Fixed, % of equity)
  - Risk per trade
  - Maximum drawdown limits
  
- **Optimization Parameters**:
  - Variables to optimize
  - Min/max ranges
  - Step sizes

### 3. Backtesting Automation

Execution pipeline:
```
1. Prepare data (download if needed)
2. Setup ZORRO environment
3. Compile converted code
4. Run backtest (full period)
5. Analyze results
6. Execute Montecarlo (200 runs)
7. Robustness testing
8. Generate metrics
```

### 4. Montecarlo Validation

**What it does**:
- Runs 200 simulations with random trade order shuffling
- Calculates confidence intervals
- Determines if edge is real (vs lucky)
- Calculates probability of ruin

**Output**:
```
Original: 45% annual return
Montecarlo 95% CI: 32% - 58%
Confidence: 92% profitable runs
Edge is: REAL (statistical significance)
```

### 5. Robustness Testing

Tests parameter sensitivity:
```
Parameter: MA Period (original = 20)
Test: 15, 17, 19, 20, 21, 23, 25
Result: Performance ranges 40-50% (robust)

Parameter: Stop Loss (original = 50 pips)
Test: 30, 40, 50, 60, 70
Result: Degradation at 30 (keep ≥40)
```

### 6. Report Generation

Comprehensive report includes:
- Original algorithm explanation
- Conversion methodology
- ZORRO code with comments
- Performance metrics table
- Montecarlo analysis chart
- Robustness matrix
- Optimization recommendations
- Next steps guide

---

## 📊 Workflow Examples

### Example 1: MT4 EA Conversion

**Input:**
```mql4
// Simple MT4 MA Crossover EA
int OnInit() {
    // Init code
}

void OnTick() {
    if (iMA(NULL, 0, 20, 0, MODE_SMA, PRICE_CLOSE, 1) > iMA(NULL, 0, 50, 0, MODE_SMA, PRICE_CLOSE, 1)) {
        // BUY signal
        OrderSend(...);
    }
}
```

**Agent Process:**
1. Analyzes moving average crossover logic
2. Converts iMA() to ZORRO indicators
3. Creates ZORRO equivalent code
4. Asks: "Timeframe? Symbol? Dates?"
5. User answers: "H1, EURUSD, 2020-2026"
6. Runs backtest
7. Delivers report

**Output:**
```c
// ZORRO C - MA Crossover (Converted)
vars *asset = assetList("EURUSD");
int ma20 = SMA(asset, 20);
int ma50 = SMA(asset, 50);

if (ma20 > ma50) {
    enterLong();
}
```

### Example 2: PineScript Strategy

**Input:**
```javascript
// TradingView PineScript RSI strategy
strategy("RSI Strategy", overlay=false)
rsi = ta.rsi(close, 14)

if rsi < 30
    strategy.entry("BUY", strategy.long)
if rsi > 70
    strategy.close("BUY")
```

**Agent Process:**
1. Parse PineScript syntax
2. Convert to ZORRO C
3. Setup backtesting
4. Generate report

**Output:**
```c
// ZORRO C - RSI Strategy (Converted)
var rsi = RSI(asset, 14);

if (rsi < 30) {
    enterLong();
}
if (rsi > 70) {
    exitLong();
}
```

### Example 3: Complex NinjaTrader Strategy

**Input:**
```csharp
// NinjaTrader 8 Strategy
public override void OnBarClose() {
    if (Close[0] > EMA(20)[0]) {
        // Complex logic with multiple conditions
    }
}
```

**Agent Process:**
1. Parse C# NinjaTrader objects
2. Convert to ZORRO equivalent
3. Handle complex conditions
4. Setup risk management
5. Execute full validation

**Output:**
```c
// ZORRO C - Complex Strategy (Converted)
// Comprehensive ZORRO implementation
// With all validations
```

---

## 🔧 Agent Activation

### Via Claude Code

```
User: "Convert my trading algorithm to ZORRO"

Agent Prompt:
"I'm CODE CONVERTER AGENT. Please provide:
1. Your algorithm (MT4, MT5, PineScript, etc.)
2. What platform is it from?
3. What timeframe should I backtest?
4. What instrument (EURUSD, GC, ES, etc.)?
5. Backtest period (dates)?"

Process:
- Analyze code
- Extract logic
- Convert to ZORRO C
- Setup backtesting
- Validate with Montecarlo
- Generate report
```

### Setup in Repository

**Create file**: `agents/code-converter-optimizer-workflows.md`
**Purpose**: Detailed workflows for conversion process
**Updates**: AGENTS/README.md with integration guide

---

## ✅ Conversion Quality Standards

### Code Quality
- ✅ Production-ready C code
- ✅ Clear variable names
- ✅ Proper error handling
- ✅ Extensive comments
- ✅ Performance optimized

### Accuracy
- ✅ Logic preserved 100%
- ✅ Parameter semantics matched
- ✅ Edge cases handled
- ✅ Money management adapted
- ✅ Timeframe flexibility

### Validation
- ✅ Syntax checked
- ✅ Compiles without errors
- ✅ Backtest completes
- ✅ Results realistic
- ✅ Montecarlo passed

---

## 🚀 Agent Workflows

### Workflow 1: Quick Conversion
**Input**: Code + Basic parameters  
**Output**: ZORRO C + Quick backtest  
**Time**: 15-30 minutes  
**Validation**: Basic  

### Workflow 2: Full Validation
**Input**: Code + Detailed parameters  
**Output**: Full report with Montecarlo  
**Time**: 30-60 minutes  
**Validation**: Montecarlo + Robustness  

### Workflow 3: Optimization
**Input**: Code + Optimization constraints  
**Output**: Optimized parameters + Report  
**Time**: 1-2 hours  
**Validation**: Parameter sensitivity analysis  

### Workflow 4: Comparison
**Input**: Original + Converted algorithm  
**Output**: Side-by-side comparison report  
**Time**: 1-2 hours  
**Validation**: Performance differential analysis  

---

## 📈 What You Get

### For Each Conversion

**1. ZORRO C Code**
```c
// Production-ready code
// Fully commented
// Parameter reference included
// Ready to backtest
```

**2. Parameter Reference**
```csv
ParameterName, Default, Min, Max, Type, Description
MA_Period, 20, 5, 100, int, Period for moving average
StopLoss, 50, 10, 200, float, Stop loss in pips
```

**3. Backtest Report**
```
Strategy: MA Crossover
Symbol: EURUSD
Period: 2020-2026 (H1)
Total Trades: 245
Win Rate: 52.2%
Profit Factor: 1.34
Sharpe Ratio: 0.78
Max Drawdown: 18.5%
```

**4. Montecarlo Analysis**
```
Original Return: 45% annually
MC 95% CI: 32% - 58%
Confidence: 92% profitable runs
P(Ruin): 3% (acceptable)
Edge Assessment: REAL (statistically significant)
```

**5. Robustness Report**
```
Parameter Testing:
- MA_Period: Robust (15-25 range)
- StopLoss: Sensitive (keep 40-60)
- TakeProfit: Robust (100-200 range)

Recommendation: Keep MA_Period flexible, fix StopLoss
```

**6. Next Steps Guide**
```
✅ Algorithm is viable
⏳ Recommend: Parameter optimization on recent data
⏳ Suggest: Live testing on small account
⏳ Future: Machine learning enhancement
```

---

## 🎯 Real-World Examples

### Example: Your MT4 Algorithm
**If you have a profitable MT4 EA:**
1. Share code with agent
2. Agent converts to ZORRO
3. Backtest on your data
4. Validate with Montecarlo
5. Get optimization suggestions

### Example: TradingView Strategy
**If you have a PineScript strategy:**
1. Copy code from TradingView
2. Paste to agent
3. Specify timeframe/symbol
4. Agent does full validation
5. Get production-ready ZORRO code

### Example: Academic Algorithm
**If you have research algorithm:**
1. Describe logic in plain language
2. Agent creates ZORRO code
3. Backtest to validate
4. Optimize parameters
5. Generate research report

---

## 💡 Key Features

### Automatic Indicator Translation
```
MT4                          ZORRO
iMA()                   →   SMA(), EMA(), WMA()
iRSI()                  →   RSI()
iMACD()                 →   MACD()
iBands()                →   BollingerBands()
iStochastic()           →   Stochastic()
```

### Automatic Signal Conversion
```
MT4                          ZORRO
OrderSend(OP_BUY)      →   enterLong()
OrderSend(OP_SELL)     →   enterShort()
OrderClose()           →   exitLong() / exitShort()
OrderModify()          →   Trailing stops / ATR-based
```

### Automatic Risk Management Adaptation
```
MT4                          ZORRO
Fixed lots                   → Fractional Kelly sizing
Fixed stop loss              → ATR-based stops
Manual TP/SL                 → Automatic scaling
```

---

## 🔐 Quality Guarantees

**For Each Conversion:**
✅ Code compiles without errors  
✅ Logic matches original algorithm  
✅ Backtest executes successfully  
✅ Results are mathematically sound  
✅ Montecarlo validates edge  
✅ Report is comprehensive  

**If Algorithm Fails:**
1. Agent provides detailed error analysis
2. Identifies reason for failure
3. Suggests improvements
4. Retests with fixes
5. Guarantees conversion OR documents why not viable

---

## 📞 Integration Guide

### Add to Repository

1. **File**: `agents/code-converter-optimizer-workflows.md`
   - Detailed workflows
   - Step-by-step procedures
   - Code templates

2. **File**: `agents/code-converter-optimizer.md` (this file)
   - Agent documentation
   - Capabilities overview
   - Usage examples

3. **Update**: `agents/README.md`
   - Add code converter agent
   - Activation instructions
   - Quick start guide

4. **Create**: `scripts/convert_code_template.c`
   - Template ZORRO code
   - Conversion examples
   - Parameter extraction template

---

## 🎓 Learning Resources

### For Users
- How to prepare code for conversion
- What information to provide
- How to interpret results
- How to optimize further

### For Developers
- Conversion methodology
- Code analysis techniques
- ZORRO API reference
- Backtesting best practices

---

## 🚀 Activation Command

**To activate this agent, use:**

```
User: "I want to convert my [MT4/MT5/PineScript/etc] algorithm to ZORRO 
and backtest it with Montecarlo validation"

Agent: [Activates CODE CONVERTER AGENT]
- Requests algorithm code
- Requests parameters
- Performs conversion
- Executes backtesting
- Delivers comprehensive report
```

---

## 📊 Expected Outcomes

### For High-Quality Algorithms
✅ Conversion succeeds  
✅ Backtest validates edge  
✅ Montecarlo confirms profitability  
✅ Production-ready code delivered  

### For Weak Algorithms
✅ Conversion completes  
⚠️ Backtest shows issues  
⏳ Agent suggests improvements  
⏳ Retests with fixes  

### For Broken Algorithms
⚠️ Agent identifies problems  
⏳ Suggests debugging approach  
⏳ May recommend algorithm redesign  

---

## 🎊 Summary

**This Agent Provides:**
- 🔄 High-fidelity code conversion
- 📊 Automatic backtesting
- 📈 Montecarlo validation
- 🛡️ Robustness testing
- 📋 Comprehensive reporting
- ✅ Production-ready code

**Use it for:**
- Converting existing algorithms
- Validating trading ideas
- Optimizing parameters
- Comparing strategies
- Learning ZORRO C

**Available 24/7 for:**
- MT4 → ZORRO conversion
- MT5 → ZORRO conversion
- PineScript → ZORRO conversion
- NinjaTrader → ZORRO conversion
- TradeStation → ZORRO conversion
- Any algorithm → ZORRO conversion

---

*Agent Created: 2026-09-15*  
*Status: Ready for Deployment*  
*Version: 1.0-MVP*

**Next Step**: Deploy agent and test with your first algorithm conversion.

🚀 **Ready to convert your algorithm?** 🚀
