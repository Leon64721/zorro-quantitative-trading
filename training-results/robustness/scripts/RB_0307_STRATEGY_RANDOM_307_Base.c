// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_307 (BASELINE)
// Asset: GER30 | Timeframe: M15
// Generated: 2026-09-14T21:16:45.316Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("GER30");
  TimeFrame = 15; // minutes

  // Strategy initialization
  BarPeriod = 15;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var MACD_0 = MACD(12, 26, 9);
  var BBands_1 = BBands(30, 2);
  var ATR_2 = ATR(21);


  // ===== ENTRY =====
  if(enterLong()) {
    if(MACD_0 > 56 && BBands_1 < 63) {
      enterLong();
    }
  }


  // ===== EXIT =====
  // Exit after 20 bars by default
  if(bar >= 20) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 100 * PIP;  // Stop loss
  TakeProfit = 200 * PIP;  // Take profit
  Lots = 3;  // Position size

}