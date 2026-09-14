// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_359 (BASELINE)
// Asset: US30 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.292Z
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
  MaxPosSize = 5;


  // ===== INDICATORS =====
  var ADX_0 = ADX(14);
  var Stochastic_1 = Stochastic(10, 10);
  var ATR_2 = ATR(21);


  // ===== ENTRY =====
  if(enterLong()) {
    if(ADX_0 < 47 && Stochastic_1 < 62) {
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