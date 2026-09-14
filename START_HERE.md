# 🚀 START HERE - Automated ZORRO Execution

**Everything is automated. You just run one command and follow simple instructions.**

---

## ⚡ Quick Start (3 steps)

### Step 1: Open Terminal
```
Windows: Press Win + R → Type: cmd → Press Enter
```

### Step 2: Navigate to project
```bash
cd "E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO"
```

### Step 3: Run auto-runner
```bash
node zorro-auto-runner.js
```

**That's it!** The rest is automatic. 👇

---

## 📋 What Happens Next

### 1️⃣ **Auto-runner opens ZORRO**
- ✅ Checks ZORRO installation
- ✅ Opens ZORRO.exe
- ✅ Waits 30 seconds for it to load

### 2️⃣ **For each of 25 scripts:**
- ✅ Shows you the script name and details
- ✅ Tells you exactly what to load in ZORRO
- ✅ Waits for you to click [Test]
- ✅ Detects when test completes automatically
- ✅ Shows quick metrics (PF, Win%, Sharpe)
- ✅ Moves to next script

### 3️⃣ **When all 25 complete:**
- ✅ Shows top 5 performers
- ✅ Saves all results
- ✅ Tells you the next command to run

---

## 👤 Your Job (Simple!)

When auto-runner shows instructions:

```
1. In ZORRO menu: Strategy → Open File
2. Navigate to: D:\ZORRO\Strategy\
3. Find file: RB_0069_STRATEGY_RANDOM_69_Base.c
4. Click [Open] or double-click
5. Click [Test] button
6. Wait 2-5 minutes
7. Come back here
```

**That's all you do.** Just 7 steps, repeated 25 times.

**Time per script**: 5 minutes  
**Total time**: 2-3 hours

---

## 🎯 Progress Tracking

Auto-runner shows:

```
📊 Progress: 8/25 (32%)
   ████████░░░░░░░░░░░░

📋 NEXT SCRIPT:
   ID:          69
   Name:        STRATEGY_RANDOM_69
   File:        RB_0069_STRATEGY_RANDOM_69_Base.c
   Asset:       XAU/USD
   Timeframe:   60
   Indicators:  WMA+MACD+EMA+BBands

📌 INSTRUCTIONS:
   1. In ZORRO menu: Strategy → Open File
   2. Navigate to: D:\ZORRO\Strategy\
   3. Find file: RB_0069_STRATEGY_RANDOM_69_Base.c
   ...
```

**Copy-paste the filename from the screen** into ZORRO.

---

## ✅ What Gets Saved Automatically

After each test:
- ✅ Log file → `D:\ZORRO\Log\RB_*.txt`
- ✅ Metrics extracted → Profit Factor, Win Rate, Sharpe, Trades
- ✅ Results tracked → Auto-runner knows it's done

You don't need to do anything with these files.

---

## ⚠️ If Something Goes Wrong

### "Error message in ZORRO"
1. Note what it says
2. Click [OK] to close error
3. Tell auto-runner: Just press ENTER
4. It will note the error and move to next script

### "I want to pause"
1. Just close ZORRO
2. When ready to resume: Run `node zorro-auto-runner.js` again
3. It picks up where you left off

### "Script seems stuck"
1. Check if ZORRO window is responsive (click on it)
2. If frozen: Close ZORRO and restart
3. When restarted: auto-runner will detect where you were

---

## 📊 Expected Results

After 25 backtests, you'll see:

```
📊 Summary:
   Total Scripts: 25
   Completed: 22
   Pending: 3

🏆 Top Performers:
   1. STRATEGY_RANDOM_359     PF: 2.34
   2. STRATEGY_RANDOM_69      PF: 2.18
   3. STRATEGY_RANDOM_46      PF: 2.05
   4. STRATEGY_RANDOM_135     PF: 1.97
   5. STRATEGY_RANDOM_111     PF: 1.89
```

---

## 🎯 After Stage A Complete

Auto-runner will tell you to run:

```bash
node run-robustness-suite.js parse --stage A
```

This takes 1 minute and:
- ✅ Extracts all metrics from logs
- ✅ Selects top 8 finalists
- ✅ Prepares for Stage B

---

## 🚀 Ready?

Just run:

```bash
node zorro-auto-runner.js
```

And follow the on-screen instructions!

**Total time for Stage A: 2-3 hours**

Done! 💪

---

## 📞 Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| "ZORRO won't open" | Check D:\ZORRO\ZORRO.exe exists |
| "Can't find script file" | Drag file from file browser to ZORRO window |
| "Error in ZORRO" | Note error, press ENTER to continue |
| "Stuck on one script" | Check ZORRO window, if frozen restart |
| "Want to pause" | Close ZORRO, run script again when ready |
| "Progress seems wrong" | Check D:\ZORRO\Log\ for recent .txt files |

---

**START:** `node zorro-auto-runner.js` ← Just run this! 🚀
