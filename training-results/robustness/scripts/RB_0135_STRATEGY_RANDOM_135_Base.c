// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_135 (BASELINE)
// Asset: NAS100 | Timeframe: H4
// Generated: 2026-09-14T21:16:45.318Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("NAS100");
  TimeFrame = 240; // minutes

  // Strategy initialization
  BarPeriod = 240;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 1;


  // ===== INDICATORS =====
  var MACD_0 = MACD(12, 26, 9);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossover(MACD_0, 37)) {
      enterLong();
    }
  }


  // ===== EXIT =====
  // Exit after 20 bars by default
  if(bar >= 20) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 50 * PIP;  // Stop loss
  TakeProfit = 200 * PIP;  // Take profit
  Lots = 1;  // Position size

}