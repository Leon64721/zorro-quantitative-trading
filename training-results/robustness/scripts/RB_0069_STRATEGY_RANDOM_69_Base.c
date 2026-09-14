// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_69 (BASELINE)
// Asset: XAU/USD | Timeframe: H1
// Generated: 2026-09-14T21:16:45.261Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("XAU/USD");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var WMA_0 = WMA(30);
  var MACD_1 = MACD(12, 26, 9);
  var EMA_2 = EMA(25);
  var BBands_3 = BBands(20, 2.5);


  // ===== ENTRY =====
  if(enterLong()) {
    if(WMA_0 > 41 && MACD_1 > 60) {
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
  TakeProfit = 150 * PIP;  // Take profit
  Lots = 2;  // Position size

}