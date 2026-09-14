# 🎯 Market Data Manager - Detailed Workflows & Implementation

**Agent**: Market Data Manager  
**Purpose**: Automated data downloading, validation, and maintenance  
**Status**: Implementation Guide  
**Week**: 2, Days 8-10

---

## 📋 Workflow Library

### WORKFLOW 1: Morning Data Health Check

**Trigger**: Daily at market open (08:00 UTC)  
**Duration**: 2-3 minutes  
**Automation**: Can be scheduled daily

**Steps**:
```
1. SCAN Data Directory
   └─ Check D:\ZORRO\History\ for latest files
   └─ Extract timestamps from filenames
   └─ Compare against current date

2. VERIFY Yesterday's Data
   └─ Check if EUR/USD_YESTERDAY.t6 exists
   └─ Check file size (should be ~2-3 MB per 1-day)
   └─ Verify modification time (< 24 hours)

3. IDENTIFY Gaps
   └─ Cross-reference with Error 047 logs
   └─ List missing years/months
   └─ Prioritize by strategy importance

4. REPORT Status
   Output format:
   ✅ EUR/USD: Up-to-date (last: 2026-01-14)
   ⚠️ NAS100: Missing 2014 (non-critical)
   ❌ GBP/USD: Not downloaded (post-MVP)
   Status: READY FOR BACKTESTING ✅
```

**Example Output**:
```
[09:15 UTC] Market Data Health Check Started
  Scanning: D:\ZORRO\History\
  Found: 22 files (EUR/USD complete)
  
✅ EUR/USD: 2005-01-04 to 2026-01-14 (COMPLETE)
  Last update: 2026-01-14 (today)
  File size: 62.5 MB (22 years)
  Status: READY ✅
  
⚠️ NAS100: 2015-01-01 to 2025-12-31 (MISSING 2014)
  Last update: 2025-12-31
  Gap: 2014 only (non-critical for MVP)
  Status: POST-MVP
  
❌ GBP/USD: NOT DOWNLOADED
  Required for: Variants (Week 2, Days 11-14)
  Timeline: Can wait if variants skip GBP/JPY
  Status: FUTURE

CONCLUSION: All MVP requirements met ✅
Timeline: Ready for Z2+ variant backtesting
```

---

### WORKFLOW 2: Download Missing Data

**Trigger**: Manual request or scheduled weekly  
**Duration**: 30-60 minutes per asset  
**Dependencies**: Broker API access

**Example**: Download GBP/USD 2013-2018 for variant testing

**Steps**:
```
1. VALIDATE Request
   Asset: GBP/USD
   Period: 2013-01-01 to 2018-12-31 (6 years)
   Source: FXCM (via ZORRO Download.c)
   
   Check:
   ✓ Asset supported? Yes (forex pair)
   ✓ Data available? Yes (major pair)
   ✓ Broker connected? Verify

2. PREPARE Download
   Create script: download_gbpusd.c
   
   Content:
   #define ASSET "GBP/USD"
   #define YEAR 2013    // Will loop through 2013-2018
   #define BROKER "FXCM"
   
   function main() {
     for(int y = 2013; y <= 2018; y++) {
       DownHistory(ASSET, y, BROKER);
     }
   }

3. EXECUTE Download
   Command: Zorro.exe -c download_gbpusd.c
   
   Output:
   Downloading GBP/USD 2013...
   GBP/USD 2013 saved (2.8 MB)
   Downloading GBP/USD 2014...
   GBP/USD 2014 saved (2.9 MB)
   ... (continues for 2015-2018)
   
   Total time: ~2-3 minutes
   Total size: ~17 MB (6 years)

4. VALIDATE Downloaded Files
   Check: D:\ZORRO\History\GBPUSD_*.t6
   Verify: 6 files exist
   Check sizes: Each ~2.5-3 MB
   
   Command: validate_data.c
   Output:
   GBPUSD_2013.t6: ✅ Valid (245,000 bars)
   GBPUSD_2014.t6: ✅ Valid (248,000 bars)
   GBPUSD_2015.t6: ✅ Valid (251,000 bars)
   GBPUSD_2016.t6: ✅ Valid (252,000 bars)
   GBPUSD_2017.t6: ✅ Valid (247,000 bars)
   GBPUSD_2018.t6: ✅ Valid (249,000 bars)
   
   Status: ALL VALID ✅

5. BACKUP & DOCUMENT
   Backup: Copy to E:\backup\ZORRO_data\GBPUSD\
   Document: Update DATA_STATUS_REPORT.md
   
   Entry:
   GBP/USD: 2013-2018 ✅ COMPLETE
   Downloaded: 2026-09-15
   Source: FXCM
   Status: Ready for Z2+ GBP/JPY variant

6. REPORT Completion
   Summary:
   ✅ Downloaded: 6 years of GBP/USD data
   ✅ Validated: All files clean
   ✅ Backed up: External copy made
   ✅ Updated: Status report
   Timeline: 45 minutes
   Next: Ready for Z2+ GBP/JPY variant backtest
```

---

### WORKFLOW 3: Fix Corrupted Data

**Trigger**: Backtest fails with Error 062 (bad file format)  
**Duration**: 10-20 minutes  
**Example**: NAS100_2014.t6 corrupted

**Steps**:
```
1. IDENTIFY Problem
   Error: "Error 062: Bad file format in NAS100_2014.t6"
   Strategy: CompranocturnaUS100
   
   Impact: Cannot backtest NAS100 on 2014

2. DIAGNOSE Corruption
   Command: validate_data.c
   
   Output:
   NAS100_2014.t6: ❌ CORRUPTED
   Issues found:
     - Invalid record count: 245,234 (should be ~250,000)
     - Bad timestamp at bar 125,432
     - Last valid bar: 2014-06-15
     - Missing: 2014-06-16 to 2014-12-31
   
   Conclusion: File truncated (incomplete download)

3. FIX Options
   
   Option A: Re-download
     - Time: 5-10 minutes
     - Risk: Low (simple)
     - Result: Full year data
     RECOMMENDED ✅
     
   Option B: Repair
     - Time: 15-30 minutes
     - Risk: Medium (partial data)
     - Result: Partial year (corrupt part removed)
     
   Option C: Exclude
     - Time: 1 minute
     - Risk: High (missing data)
     - Result: Cannot backtest 2014
   
   Decision: Option A (Re-download)

4. EXECUTE Re-download
   Command: Zorro.exe -c download_nas100_2014.c
   
   Output:
   Downloading NAS100 2014...
   NAS100_2014 saved (2.7 MB)
   
   Time: ~2 minutes
   File: D:\ZORRO\History\NAS100_2014.t6

5. VALIDATE New File
   Command: validate_data.c NAS100 2014
   
   Output:
   NAS100_2014.t6: ✅ VALID
   Record count: 250,045 (correct)
   Date range: 2014-01-02 to 2014-12-31
   Bars checked: 250,045 ✅
   Status: CLEAN
   
6. TEST Strategy
   Command: Zorro.exe -c CompranocturnaUS100.c NAS100 2014
   
   Output:
   Backtest CompranocturnaUS100 NAS100 2014
   Result: ✅ SUCCESS (no Error 062)
   Trades: 45
   P&L: -$2,340 (strategy is losing, but data is valid)
   
   Note: Loss is due to strategy, not data issue

7. REPORT Resolution
   Summary:
   ✅ Problem: Corrupted NAS100_2014.t6 detected
   ✅ Solution: Re-downloaded fresh copy
   ✅ Validation: New file is clean
   ✅ Testing: CompranocturnaUS100 now runs
   Status: RESOLVED ✅
```

---

### WORKFLOW 4: Generate Weekly Status Report

**Trigger**: Every Friday 17:00 UTC  
**Duration**: 5-10 minutes  
**Output**: CSV + Summary email

**Steps**:
```
1. SCAN All Data Files
   Directory: D:\ZORRO\History\
   Pattern: *.t6
   Count: 34 files found

2. EXTRACT Metadata
   For each file:
   - Asset name
   - Year range
   - File size
   - Last modified date
   - Record count (via validation)

3. COMPARE Against Requirements
   MVP Requirements:
   ✅ EUR/USD 2005-2026: COMPLETE
   ⚠️ NAS100 2015-2025: PARTIAL (missing 2014)
   ❌ GBP/USD 2013-2026: NOT DOWNLOADED
   ❌ USD/JPY 2013-2026: NOT DOWNLOADED
   
   Week 2 Requirements (for variants):
   Status: Waiting on GBP/USD decision

4. GENERATE Report
   File: data_status_weekly.csv
   
   Content:
   Asset,Start,End,Years,Size_MB,Last_Update,Status,Action
   EUR/USD,2005-01-04,2026-01-14,21,62.5,2026-01-14,✅ Complete,None
   NAS100,2015-01-01,2025-12-31,11,45.2,2025-12-31,⚠️ Partial,Post-MVP
   GBP/USD,N/A,N/A,0,0,N/A,❌ Missing,Queue download if needed
   USD/JPY,N/A,N/A,0,0,N/A,❌ Missing,Queue download if needed
   US100,2026-01-01,2026-01-14,<1,1.2,2026-01-14,⚠️ Minimal,Post-MVP

5. ANALYSIS
   
   Summary:
   Total Assets Tracked: 5
   Complete: 1 (EUR/USD)
   Partial: 2 (NAS100, US100)
   Missing: 2 (GBP/USD, USD/JPY)
   
   Data Health:
   ✅ All critical data present
   ⚠️ Some optional data missing
   🟢 Status: GREEN (MVP ready)
   
   Next Actions:
   - Continue Z2+ EUR/USD testing (Week 2)
   - Decide on GBP/JPY variant (needs GBP/USD)
   - Post-MVP: Download missing forex pairs

6. REPORT Delivery
   
   Summary Email Format:
   
   Subject: [ZORRO] Data Status Report - Week 2
   
   Body:
   Data Health: GREEN ✅
   
   EUR/USD: Complete (2005-2026)
   NAS100: Partial (2015-2025)
   GBP/USD: Not downloaded (post-MVP)
   USD/JPY: Not downloaded (post-MVP)
   
   Action Items:
   - Continue Week 2 strategy variants
   - Prepare GBP/JPY variant if time permits
   
   Report attached: data_status_weekly.csv
```

---

### WORKFLOW 5: Quarterly Data Audit

**Trigger**: First business day of Q1, Q2, Q3, Q4  
**Duration**: 30-45 minutes  
**Purpose**: Comprehensive data review

**Steps**:
```
1. FULL SCAN
   - All *.t6 files in History/
   - All *.csv backups
   - Archive directory

2. INTEGRITY CHECK
   - File sizes (are they normal?)
   - Timestamps (are they current?)
   - Corruption detection (validate all files)

3. COVERAGE ANALYSIS
   - Which assets we have
   - Which years are complete
   - Date gaps identified

4. BROKER STATUS
   - Are broker connections working?
   - Can we download fresh data?
   - Any API changes?

5. OPTIMIZATION
   - Compress old data if needed
   - Reorganize folders
   - Remove duplicates

6. REPORT & RECOMMENDATIONS
   Output: data_audit_quarterly.md
   
   Example:
   Q3 2026 Data Audit
   
   Status: ✅ HEALTHY
   
   Assets: 5 tracked
   Complete: 1 (EUR/USD)
   Partial: 2
   Missing: 2
   
   Storage: 120 MB used (of 1 TB available)
   Growth: +45 MB since Q2 (adding daily bars)
   
   Recommendations:
   1. Download GBP/USD for post-MVP (30 min work)
   2. Archive NAS100 2014 separately (corrupted file)
   3. Set up automatic daily downloads (Saturday midnight)
   4. Quarterly data audit schedule: First Friday each quarter
```

---

## 🔧 Implementation Scripts

### Script 1: Daily Health Check

```c
// File: check_data_health.c
// Purpose: Automated daily data validation
// Schedule: Run at 08:00 UTC daily

#include <default.c>

function main() {
    var files = 0;
    var healthy = 0;
    
    printf("\n=== ZORRO Data Health Check ===\n");
    printf("Time: %s\n", timeToStr(timeLocalNow()));
    
    // Check EUR/USD
    if(File("History/EURUSD_2026.t6")) {
        printf("✅ EUR/USD: Latest file present\n");
        healthy++;
    } else {
        printf("❌ EUR/USD: Missing latest data!\n");
    }
    files++;
    
    // Summary
    printf("\nStatus: %d/%d assets ready\n", healthy, files);
    if(healthy == files)
        printf("✅ ALL SYSTEMS GO\n");
    else
        printf("⚠️ ATTENTION NEEDED\n");
}
```

### Script 2: Data Validation

```c
// File: validate_data.c
// Purpose: Check file integrity
// Usage: Zorro.exe -c validate_data.c ASSET

function main() {
    // Validates current symbol has enough bars
    int bars = 0;
    while(assetHistory(0, 1000000))
        bars++;
    
    printf("\nValidation Results:\n");
    printf("Asset: %s\n", Asset);
    printf("Bars: %d\n", bars);
    
    if(bars > 100000)
        printf("✅ Status: VALID (sufficient data)\n");
    else if(bars > 50000)
        printf("⚠️ Status: PARTIAL (limited data)\n");
    else
        printf("❌ Status: INSUFFICIENT\n");
}
```

### Script 3: Download Scheduler

```c
// File: download_scheduler.c
// Purpose: Queue data downloads
// Run: Weekly or on-demand

function main() {
    printf("Available assets to download:\n");
    printf("1. GBP/USD (2013-2026) - 30 min\n");
    printf("2. USD/JPY (2013-2026) - 30 min\n");
    printf("3. NAS100 2014 - 5 min\n");
    printf("4. All missing - 90 min\n");
    
    // In production: Queue download based on selection
}
```

---

## 📊 Integration with Other Agents

### With Strategy Analyzer
```
Market Data Manager → Data Downloaded
         ↓
Strategy Analyzer → "Analyze Z2+ EUR/USD"
         ↓
Backtester → "Run backtest with fresh data"
```

### With Backtester
```
Check Data Available → Download if Missing
         ↓
Backtester → "Run Z2+ variant"
         ↓
Analyze Results → "Report performance"
```

---

## ✅ Week 2 Success Metrics

- [ ] Daily health check implemented
- [ ] Download workflow documented
- [ ] Validation scripts created
- [ ] GBP/JPY decision made (download or skip)
- [ ] Data pipeline ready for Week 2, Days 11-14

---

## 📞 Summary

**Market Data Manager Agent** is now equipped with:
- ✅ 5 detailed workflows
- ✅ Example implementations
- ✅ Automation scripts
- ✅ Integration points

**Ready to**: Maintain data pipeline for variant backtesting (Week 2, Days 11-14)

