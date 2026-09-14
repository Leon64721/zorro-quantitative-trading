# 📊 Data Management Guide - ZORRO Historical Data

**Purpose**: How to download, validate, and maintain historical market data in ZORRO  
**Status**: Reference guide for future data operations  
**Created**: 2026-09-13

---

## 🎯 Quick Reference

| Task | Command | Time | Result |
|------|---------|------|--------|
| Check available data | See `DATA_STATUS_REPORT.md` | 1 min | List of what we have |
| Download EUR/USD | Already complete ✅ | 0 min | Ready to use |
| Download GBP/USD | Use Download.c or broker API | 30 min | Will add to History\ |
| Validate .t6 files | Use validation script (below) | 5 min | Verify integrity |
| Generate report | Market Data Manager agent | 2 min | Full status |

---

## 📥 How to Download Historical Data

### Method 1: ZORRO's Built-in Download.c (RECOMMENDED)

**Step 1: Locate Download Strategy**
```
File: D:\ZORRO\Strategy\Download.c
Purpose: Native ZORRO strategy to fetch data from brokers
Supported: Any broker with ZORRO plugin (FXCM, Oanda, Binance, etc.)
```

**Step 2: Configure Download**
```c
// In Download.c, edit:
#define ASSET "GBP/USD"      // Asset to download
#define YEAR 2013            // Year to download
#define BROKER "FXCM"        // Broker source
```

**Step 3: Run Download**
```bash
# Via command line
cd D:\ZORRO
Zorro.exe -c Download.c

# Or manually:
# 1. Open Zorro.exe
# 2. Script menu → Load: Download.c
# 3. Click "Train" button
# 4. Enter credentials if needed
# 5. Wait for download to complete (usually 1-5 minutes per year)
```

**Step 4: Verify**
```
Check: D:\ZORRO\History\GBPUSD_2013.t6 (file should exist)
Size: Should be ~2-3 MB for 1 year of daily OHLC
Test: Run a strategy that uses GBP/USD → should no longer Error 047
```

---

### Method 2: Manual Download from Public Sources

**Option A: OANDA Historical Data**
```
Website: www.oanda.com/historical-data/
Format: CSV (need to convert to .t6)
Steps:
  1. Download CSV for GBP/USD 2013-2026
  2. Save to D:\ZORRO\History\GBPUSD.csv
  3. Use ZORRO's CSVtoHistory.c to convert:
     Zorro.exe -c CSVtoHistory.c GBPUSD
  4. Verify: GBPUSD_*.t6 files created in History\
```

**Option B: FXCM Data Download**
```
Website: Download FXCM HistData via their API
Requires: FXCM account + API access
Process: Similar to Download.c but manual
Result: .t6 files in History\ directory
```

**Option C: Interactive Brokers (IB)**
```
Method: Use IB's HistoricalDataServer or API
Requires: IB account with data subscription
Format: OHLC CSV → convert using CSVtoHistory.c
Result: High-quality tick data
```

---

## ✅ How to Validate Data

### Validation Method 1: Manual Check
```bash
# List all .t6 files with sizes
ls -lah D:\ZORRO\History\*.t6

# Expected:
# EURUSD_2013.t6    2.8M ✅
# EURUSD_2014.t6    2.9M ✅
# GBP_2013.t6       2.5M ✅
# etc.

# Check file integrity (no corruption)
# Try: Run a strategy using this data
# If no Error 062 or 058: File is valid ✅
```

### Validation Method 2: ZORRO's Built-in Check
```c
// Create validate_data.c script:
function main() {
    int count = 0;
    while(assetHistory("GBP/USD", 0, 1000000)) {
        count++;
    }
    if(count > 0)
        printf("\n✅ GBP/USD data valid: %d bars", count);
    else
        printf("\n❌ GBP/USD data missing or corrupt");
}
```

### Validation Method 3: Use Market Data Manager Agent
```
Activate: "Market Data Manager"
Command: "Validate all .t6 files"
Output: "Report of which files are clean, which need fixing"
Time: ~2 minutes
```

---

## 🔧 Conversion Tools (CSV → .t6)

### CSVtoHistory.c - Convert CSV to .t6 Format
```
Location: D:\ZORRO\Strategy\CSVtoHistory.c
Purpose: Convert OHLCV CSV files to ZORRO's binary .t6 format
Input Format: CSV with columns:
  Date,Time,Open,High,Low,Close,Volume,Bid,Ask
  
Usage:
  Zorro.exe -c CSVtoHistory.c GBPUSD
  → Creates: D:\ZORRO\History\GBPUSD_*.t6 files
```

### CSVfromHistory.c - Convert .t6 to CSV
```
Opposite direction: .t6 → CSV
Useful for: Inspecting/sharing data, analysis in other tools
Usage: Zorro.exe -c CSVfromHistory.c GBPUSD
Output: D:\ZORRO\History\GBPUSD.csv (single file with all years)
```

---

## 📋 Workflow: Download & Validate New Asset

### Scenario: We need GBP/USD for Z2+ variant testing

**Step 1: Plan (5 min)**
```
Asset needed: GBP/USD
Years: 2013-2026 (13 years)
Purpose: Z2+ variant testing
Data source: FXCM (via Download.c)
Estimated time: 30-60 minutes for all years
```

**Step 2: Download (30-60 min)**
```bash
# Option A: Use Download.c
cd D:\ZORRO\Strategy
# Edit Download.c:
#  - ASSET = "GBP/USD"
#  - Years = 2013, 2014, ... 2026 (loop)
#  - BROKER = "FXCM"
Zorro.exe -c Download.c  # Repeat for each year

# Option B: One-shot from OANDA
# Download GBP/USD 2013-2026 CSV
# Save to D:\ZORRO\History\GBPUSD.csv
# Run: Zorro.exe -c CSVtoHistory.c GBPUSD
```

**Step 3: Validate (5-10 min)**
```bash
# Check files created
ls D:\ZORRO\History\GBPUSD*.t6
# Should see: GBPUSD_2013.t6, GBPUSD_2014.t6, ..., GBPUSD_2026.t6

# Test with strategy
Zorro.exe -c Z2+.c GBP/USD 2013 2026
# Should produce: Log file with no Error 047
# If success: Data validated ✅
```

**Step 4: Backup (2 min)**
```bash
# Copy to external drive or archive
copy D:\ZORRO\History\GBPUSD*.t6 E:\backup\ZORRO_data\
```

**Step 5: Document (2 min)**
```
Update: DATA_STATUS_REPORT.md
  - Add "GBP/USD: 2013-2026 ✅ COMPLETE"
  - Mark Date: 2026-09-15
  - Source: FXCM via Download.c
```

---

## ⚡ Common Issues & Solutions

### Issue 1: "Error 056: Can't download GBP/USD"
```
Cause: Broker API unavailable or credentials wrong
Solution:
  1. Check internet connection
  2. Verify broker account is active
  3. Check ZORRO plugins installed: D:\ZORRO\Plugin\*.dll
  4. Try different broker (Oanda instead of FXCM)
  5. Manual download + CSV conversion
```

### Issue 2: "Error 047: GBP/USD no 2013 history"
```
Cause: File doesn't exist or named incorrectly
Solution:
  1. Check file exists: ls D:\ZORRO\History\GBPUSD_2013.t6
  2. Verify naming: Asset name must match strategy request
  3. Verify case: GBPUSD vs GBP/USD (ZORRO uses GBPUSD internally)
  4. Re-download if corrupted
```

### Issue 3: "Error 062: Bad file format"
```
Cause: .t6 file corrupted or incomplete
Solution:
  1. Delete corrupted file: del D:\ZORRO\History\GBPUSD_2013.t6
  2. Re-download fresh copy
  3. Verify with CSVtoHistory + validation
```

### Issue 4: Download Takes Forever
```
Cause: Broker API slow, large year, poor network
Solution:
  1. Download in smaller batches (month by month)
  2. Try different time of day (less congestion)
  3. Use faster broker if available
  4. Manual CSV download may be faster
Timeout: ZORRO has built-in timeout, may retry needed
```

---

## 📊 Current Data Status

```
✅ EURUSD:    2005-2026 COMPLETE (22 years) - READY TO USE
⚠️ NAS100:    2015-2025 (11 years, missing 2014)
❌ GBPUSD:    NOT DOWNLOADED (needed for variants)
❌ USDJPY:    NOT DOWNLOADED (needed for variants)
⚠️ US100:     Only 2026 (minimal data)
```

**For MVP (Weeks 1-3)**: Use EUR/USD only ✅ (no downloads needed)  
**Post-MVP**: Download GBP/USD + USD/JPY for variants (optional, timeline permitting)

---

## 🚀 Automation: Market Data Manager Agent

Instead of manual downloads, you can use the custom **Market Data Manager** agent:

```
Activate: "Market Data Manager"
Command: "Download GBP/USD 2013-2026 and validate"
Result: Agent handles everything (downloads, validates, reports)
Time: 30-60 minutes (hands-off)
```

This agent will:
1. Check broker availability
2. Download year by year
3. Validate each file
4. Report completion
5. Update status in DATA_STATUS_REPORT.md

---

## 📈 Best Practices

✅ **DO:**
- Keep backup copy of all .t6 files
- Document data source and date
- Validate after downloading
- Update DATA_STATUS_REPORT after changes
- Test with at least one strategy after download

❌ **DON'T:**
- Delete original .t6 files without backup
- Mix different data sources (stick to one broker)
- Assume file is complete without validation
- Forget to document changes
- Test on incomplete data

---

## 🔗 Related Documents

- `DATA_STATUS_REPORT.md` - Current inventory of what we have
- `PROGRESS.md` - Project timeline (data tasks scheduled)
- Agent: Market Data Manager - Automated downloading & validation

---

**Summary**: EUR/USD is complete and ready. Other data can wait until post-MVP or as needed for future strategies. This guide ensures we can quickly download & validate any new assets when required.
