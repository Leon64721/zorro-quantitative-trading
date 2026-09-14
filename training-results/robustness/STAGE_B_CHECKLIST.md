# ZORRO Robustness Suite - Stage B: Full Validation

**Generated**: 2026-09-14T21:45:43.636Z
**Finalists**: 8
**Expected Actions**: 48
**Estimated Time**: ~6-8 hours

## What Stage B Tests

Each finalist strategy will be tested with:
1. **WFO** (Walk-Forward Optimization) — Out-of-sample validation
2. **MRC** (Monte Carlo Reality Check) — Statistical significance (150 cycles)
3. **WFO Profile** — Robustness across cycle counts
4. **SPP** (Parameter Permutation) — 3 variants with perturbed parameters

---

## Execution Guide

### For Each Finalist:

```
1. Open WFO script: Click [Train] (5-10 min)
   - Look for: "WFO Cycles" table with Best/Worst/Avg metrics
   - Check degradation: IS → OOS should be < 20%

2. Open MRC script: Click [Test] (5-15 min, depending on cycles)
   - Look for: "P-Value: X%" in log
   - Goal: < 5% (highly significant) or 5-15% (significant)

3. Open Profile script: Click [Train] (10-20 min)
   - Look for: Performance chart across cycle counts
   - Goal: Relatively flat line (no degradation)

4. Run SPP variants (3×): Click [Test] for each (5 min each = 15 min)
   - Compare PF/Sharpe across the 3 parameter values
   - Goal: Stable results (std/mean < 0.25)
```

---

## Stage B Checklist


### 1. **STRATEGY_RANDOM_46** (ID: 46)
Baseline PF: **3.07** | Win%: **60.9%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0046_STRATEGY_RANDOM_46_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0046_STRATEGY_RANDOM_46_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0046_STRATEGY_RANDOM_46_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0046_STRATEGY_RANDOM_46_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0046_STRATEGY_RANDOM_46_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0046_STRATEGY_RANDOM_46_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 2. **STRATEGY_RANDOM_135** (ID: 135)
Baseline PF: **3.05** | Win%: **66.8%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0135_STRATEGY_RANDOM_135_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0135_STRATEGY_RANDOM_135_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0135_STRATEGY_RANDOM_135_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0135_STRATEGY_RANDOM_135_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0135_STRATEGY_RANDOM_135_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0135_STRATEGY_RANDOM_135_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 3. **STRATEGY_RANDOM_251** (ID: 251)
Baseline PF: **2.99** | Win%: **47.9%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0251_STRATEGY_RANDOM_251_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0251_STRATEGY_RANDOM_251_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0251_STRATEGY_RANDOM_251_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0251_STRATEGY_RANDOM_251_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0251_STRATEGY_RANDOM_251_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0251_STRATEGY_RANDOM_251_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 4. **STRATEGY_RANDOM_279** (ID: 279)
Baseline PF: **2.64** | Win%: **68.9%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0279_STRATEGY_RANDOM_279_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0279_STRATEGY_RANDOM_279_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0279_STRATEGY_RANDOM_279_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0279_STRATEGY_RANDOM_279_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0279_STRATEGY_RANDOM_279_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0279_STRATEGY_RANDOM_279_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 5. **STRATEGY_RANDOM_318** (ID: 318)
Baseline PF: **2.33** | Win%: **56.6%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0318_STRATEGY_RANDOM_318_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0318_STRATEGY_RANDOM_318_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0318_STRATEGY_RANDOM_318_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0318_STRATEGY_RANDOM_318_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0318_STRATEGY_RANDOM_318_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0318_STRATEGY_RANDOM_318_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 6. **STRATEGY_RANDOM_266** (ID: 266)
Baseline PF: **2.27** | Win%: **31.3%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0266_STRATEGY_RANDOM_266_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0266_STRATEGY_RANDOM_266_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0266_STRATEGY_RANDOM_266_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0266_STRATEGY_RANDOM_266_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0266_STRATEGY_RANDOM_266_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0266_STRATEGY_RANDOM_266_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 7. **STRATEGY_RANDOM_35** (ID: 35)
Baseline PF: **2.24** | Win%: **37.4%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0035_STRATEGY_RANDOM_35_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0035_STRATEGY_RANDOM_35_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0035_STRATEGY_RANDOM_35_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0035_STRATEGY_RANDOM_35_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0035_STRATEGY_RANDOM_35_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0035_STRATEGY_RANDOM_35_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

### 8. **STRATEGY_RANDOM_111** (ID: 111)
Baseline PF: **2.15** | Win%: **41.2%**

| Script | Mode | Target Metric | Status |
|--------|------|---------------|--------|
| `RB_0111_STRATEGY_RANDOM_111_WFO.c` | Train | WFO Cycles table, IS→OOS degradation | [ ] |
| `RB_0111_STRATEGY_RANDOM_111_MRC.c` | Test | P-Value < 10% | [ ] |
| `RB_0111_STRATEGY_RANDOM_111_Profile.c` | Train | Flat profile across cycles | [ ] |
| `RB_0111_STRATEGY_RANDOM_111_SPP0.c` | Test | SPP variant 0 metrics | [ ] |
| `RB_0111_STRATEGY_RANDOM_111_SPP1.c` | Test | SPP variant 1 metrics | [ ] |
| `RB_0111_STRATEGY_RANDOM_111_SPP2.c` | Test | SPP variant 2 metrics | [ ] |

## After Completing Stage B

1. Run: `node run-robustness-suite.js parse --stage B`
2. Review: `ROBUSTNESS_REPORT.md`
   - Each strategy gets a verdict: **ROBUSTA** / **MARGINAL** / **OVERFIT**
   - Decision logic: MRC p-value + WFO degradation + SPP stability

---

**Good Luck!** 🚀
