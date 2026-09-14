// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_367 (BASELINE)
// Asset: NAS100 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.269Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("NAS100");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var WMA_0 = WMA(20);
  var EMA_1 = EMA(10);


  // ===== ENTRY =====
  if(enterLong()) {
    if(WMA_0 < 29 && EMA_1 > 26) {
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
  TakeProfit = 50 * PIP;  // Take profit
  Lots = 3;  // Position size

}