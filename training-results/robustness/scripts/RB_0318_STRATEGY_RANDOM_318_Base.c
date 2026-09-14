// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_318 (BASELINE)
// Asset: US30 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.297Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("US30");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 1;


  // ===== INDICATORS =====
  var ADX_0 = ADX(21);
  var WMA_1 = WMA(10);
  var WMA_2 = WMA(20);


  // ===== ENTRY =====
  if(enterLong()) {
    if(ADX_0 > 60 && WMA_1 < 27) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 320) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 75 * PIP;  // Stop loss
  TakeProfit = 100 * PIP;  // Take profit
  Lots = 1;  // Position size

}