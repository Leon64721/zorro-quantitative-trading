// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_273 (BASELINE)
// Asset: XAU/USD | Timeframe: H4
// Generated: 2026-09-14T21:16:45.320Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("XAU/USD");
  TimeFrame = 240; // minutes

  // Strategy initialization
  BarPeriod = 240;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 5;


  // ===== INDICATORS =====
  var BBands_0 = BBands(30, 2.5);


  // ===== ENTRY =====
  if(enterLong()) {
    if(BBands_0 > 69) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 406) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 50 * PIP;  // Stop loss
  TakeProfit = 50 * PIP;  // Take profit
  Lots = 5;  // Position size

}