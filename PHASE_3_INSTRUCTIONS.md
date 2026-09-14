# 🔬 PHASE 3: Robustness Suite - Complete Guide

**Status**: ✅ Implementation complete, ready for execution  
**Date**: 2026-09-14  
**Scope**: 25 screening + 8 finalists = ~12-15 hours manual ZORRO execution

---

## 📋 Overview

Phase 3 validates the robustness of your trained strategies using real ZORRO backtests:

- **Stage A (Screening)**: Run 25 diverse strategies through single backtests
- **Stage B (Full Suite)**: Run top 8 through WFO + Monte Carlo + WFO Profile + SPP

All scripts are auto-generated. You execute them manually in ZORRO (free license limitation).

---

## 🚀 Quick Start

### Step 1: Generate Stage A Scripts

```bash
node run-robustness-suite.js stage-a --candidates 25
```

**Output**:
- ✅ `training-results/robustness/STAGE_A_CHECKLIST.md` — Your execution guide
- ✅ 25 `.c` scripts in `D:\ZORRO\Strategy\RB_*.c`
- ✅ `training-results/robustness/MANIFEST.json` — Tracking file

**Time to generate**: ~30 seconds

---

## 📖 Stage A: Manual Execution

### Before You Start

1. **Open ZORRO**: `D:\ZORRO\Zorro.exe`
2. **Read**: `training-results/robustness/STAGE_A_CHECKLIST.md` (shows all 25 scripts to run)

### For Each of the 25 Scripts:

```
1. In ZORRO Strategy panel:
   - Find script (e.g., "RB_0001_STRATEGY_RANDOM_1_Base.c")
   - Double-click or drag to strategy area
   - Click [Test] button

2. Wait for completion (2-5 min per script)

3. Monitor:
   - Check for compilation errors in log
   - Note basic metrics (Profit Factor, Win Rate)
   - Verify no negative profits

4. Mark checklist when done ✓
```

**Total time for Stage A**: ~3-4 hours (25 scripts × 5 min average)

**Expected output**: `D:\ZORRO\Log\RB_*.txt` log files (created automatically by ZORRO)

---

## 🔍 After Stage A: Parse Results

Once all 25 backtests are complete:

```bash
node run-robustness-suite.js parse --stage A
```

**What this does**:
- ✅ Reads all 25 log files from `D:\ZORRO\Log\`
- ✅ Extracts metrics (Profit Factor, Win Rate, Sharpe, etc.)
- ✅ Updates `training-results/robustness/MANIFEST.json`
- ✅ Prepares for Stage B (selects top 8 performers)

**Time**: ~1 minute

---

## 🔬 Stage B: Full Robustness Suite

### Generate Stage B Scripts

```bash
node run-robustness-suite.js stage-b --finalists 8 --mrc-cycles 150
```

**Output**:
- ✅ `training-results/robustness/STAGE_B_CHECKLIST.md` — Your execution guide
- ✅ Scripts for 8 finalists × 4 tests each:
  - `RB_*_WFO.c` — Walk-Forward Optimization (out-of-sample validation)
  - `RB_*_MRC.c` — Monte Carlo Reality Check (statistical significance)
  - `RB_*_Profile.c` — WFO Profile (robustness across cycle counts)
  - `RB_*_SPP0.c`, `RB_*_SPP1.c`, `RB_*_SPP2.c` — Parameter perturbation

**Time to generate**: ~1 minute

---

## 📖 Stage B: Manual Execution

### For Each of the 8 Finalists, Run 4 Tests:

**Test 1: WFO (Walk-Forward Optimization)**
```
Script: RB_<id>_<name>_WFO.c
Mode:   [Train] (NOT Test)
Time:   5-10 minutes
Goal:   Look for "WFO Cycles" table
        Check: IS→OOS degradation should be < 20%
```

**Test 2: MRC (Monte Carlo Reality Check)**
```
Script: RB_<id>_<name>_MRC.c
Mode:   [Test] (NOT Train)
Time:   10-20 minutes (running 150 cycles)
Goal:   Look for "P-Value: X%" in log
        Acceptable: < 10% (robust), < 15% (marginal)
        Reject: > 15% (likely overfitted)
```

**Test 3: WFO Profile (Robustness Across Cycles)**
```
Script: RB_<id>_<name>_Profile.c
Mode:   [Train]
Time:   10-20 minutes
Goal:   Look for performance chart across cycle counts
        Goal: Line should be relatively flat (no degradation)
```

**Test 4: SPP Variants (Parameter Sensitivity)**
```
Scripts: RB_<id>_<name>_SPP0.c
         RB_<id>_<name>_SPP1.c
         RB_<id>_<name>_SPP2.c
Mode:    [Test] for each
Time:    5 minutes × 3 = 15 minutes total
Goal:    Compare metrics across 3 parameter values
         Stability: std(PF)/mean(PF) should be < 0.25
```

**Per finalist**: 4 tests × ~10 min average = **40 minutes**  
**All 8 finalists**: 8 × 40 min = **320 minutes ≈ 5.5 hours**

**Total execution time (A+B)**: ~8-9 hours spread over 1-2 sessions

---

## 📊 After Stage B: Parse & Report

### 1. Parse Stage B Results

```bash
node run-robustness-suite.js parse --stage B
```

### 2. Generate Final Report

```bash
node run-robustness-suite.js report --stage B
```

**Output**: `training-results/robustness/ROBUSTNESS_REPORT_B.md`

This report shows for each strategy:
- **✅ ROBUSTA** — Passes all tests → Ready for live trading
- **⚠️ MARGINAL** — Mixed results → May need tuning
- **❌ OVERFIT** — Fails robustness tests → Redesign needed

---

## 📁 File Structure

```
training-results/robustness/
├── MANIFEST.json                  # Stage A tracking
├── MANIFEST_B.json                # Stage B tracking
├── STAGE_A_CHECKLIST.md          # What to do for Stage A
├── STAGE_B_CHECKLIST.md          # What to do for Stage B
├── ROBUSTNESS_REPORT_A.md        # Stage A summary
├── ROBUSTNESS_REPORT_B.md        # Final verdicts (ROBUSTA/MARGINAL/OVERFIT)
└── scripts/                        # Backup copies of generated .c files
    ├── RB_0001_*_Base.c
    ├── RB_0001_*_WFO.c
    ├── RB_0001_*_MRC.c
    ├── ...

D:\ZORRO\Strategy\                 # Active scripts (point to these in ZORRO)
├── RB_0001_*_Base.c
├── RB_0001_*_WFO.c
├── ...

D:\ZORRO\Log\                      # Generated automatically
├── RB_0001_*.txt                  # One log per script
├── RB_0002_*.txt
├── ...
```

---

## 🎯 Success Criteria

### Stage A
- [ ] All 25 scripts run without compilation errors
- [ ] All 25 generate log files in `D:\ZORRO\Log\`
- [ ] At least 20 strategies have Profit Factor > 1.5
- [ ] Parsing completes and identifies top 8

### Stage B
- [ ] All 8 finalists complete WFO (at least 3 cycles)
- [ ] Monte Carlo P-Values show < 15% for at least 6/8
- [ ] WFO degradation IS→OOS < 30% for at least 6/8
- [ ] SPP variants show stability (std/mean < 0.35)

### Final
- [ ] At least 3 strategies get "✅ ROBUSTA" verdict
- [ ] Final report identifies deployment-ready strategies
- [ ] Ready to proceed to Phase 4 (optional: deep learning)

---

## ⚠️ Troubleshooting

### "Script won't compile in ZORRO"
→ Check `D:\ZORRO\Log\*.txt` for errors  
→ Common issues: typos in indicator names, missing parameters  
→ Contact me with error message

### "No log file generated after backtest"
→ Verify ZORRO completed (look at window title, should show progress)  
→ Check if log went to different location: `D:\ZORRO\Log\`  
→ Try re-running the test

### "Profit Factor is 0 or negative"
→ This is OK for Stage A screening — helps identify bad strategies  
→ These will be filtered out before Stage B  
→ ZORRO correctly identified an unprofitable configuration

### "Stage B: Can't find completed Stage A results"
→ Make sure you ran: `node run-robustness-suite.js parse --stage A`  
→ Check that at least 5+ strategies marked as "complete" in MANIFEST.json

---

## 📞 Commands Reference

| Command | Purpose | When to use |
|---------|---------|------------|
| `stage-a --candidates 25` | Generate screening scripts | START HERE |
| `parse --stage A` | Extract Stage A metrics | After 25 backtests done |
| `stage-b --finalists 8` | Generate full validation suite | After Stage A parsed |
| `parse --stage B` | Extract Stage B metrics | After 8 finalists done |
| `report --stage B` | Generate final verdicts | After Stage B parsed |

---

## 🎓 What Each Test Validates

| Test | Validates | Verdict If Fails |
|------|-----------|-----------------|
| **WFO** | Out-of-sample performance | Strategy overfitted to training data |
| **MRC** | Statistical edge (p-value < 5%) | Edge is due to random chance, not skill |
| **Profile** | Robustness across configurations | Performance degrades with different parameters |
| **SPP** | Parameter sensitivity | Small parameter changes cause large PF swings |

A strategy passes robustness (✅ ROBUSTA) if it passes all 4 tests.

---

## 📋 Checklist for You

- [ ] Read this entire guide
- [ ] Open ZORRO at `D:\ZORRO\Zorro.exe`
- [ ] Run: `node run-robustness-suite.js stage-a --candidates 25`
- [ ] Read `training-results/robustness/STAGE_A_CHECKLIST.md`
- [ ] Execute 25 Stage A backtests (3-4 hours)
- [ ] Run: `node run-robustness-suite.js parse --stage A`
- [ ] Run: `node run-robustness-suite.js stage-b --finalists 8`
- [ ] Read `training-results/robustness/STAGE_B_CHECKLIST.md`
- [ ] Execute Stage B suite for 8 finalists (5-6 hours)
- [ ] Run: `node run-robustness-suite.js parse --stage B`
- [ ] Run: `node run-robustness-suite.js report --stage B`
- [ ] Review `training-results/robustness/ROBUSTNESS_REPORT_B.md`

**Total time**: 8-10 hours spread over 1-2 sessions

---

## 🚀 Ready?

Start with:

```bash
node run-robustness-suite.js stage-a --candidates 25
```

Then follow the checklist. Let me know when you hit any issues! 💪

---

**Next Phase After Phase 3:**
- Phase 4 (Optional): Deep learning — Train NN on 465 strategy pairs to auto-generate strategies
- Phase 5: Live trading validation (paper → micro-lot → production)
