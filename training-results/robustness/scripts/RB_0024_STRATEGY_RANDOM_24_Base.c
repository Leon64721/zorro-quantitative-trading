// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_24 (BASELINE)
// Asset: SPX500 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.265Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("SPX500");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 5;


  // ===== INDICATORS =====
  var WMA_0 = WMA(20);
  var MACD_1 = MACD(12, 26, 9);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossover(WMA_0, 76) && MACD_1 > 31) {
      enterLong();
    }
  }


  // ===== EXIT =====
  // Exit after 20 bars by default
  if(bar >= 20) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 75 * PIP;  // Stop loss
  TakeProfit = 100 * PIP;  // Take profit
  Lots = 5;  // Position size

}