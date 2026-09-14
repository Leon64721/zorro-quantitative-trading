// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_472 (BASELINE)
// Asset: XAU/USD | Timeframe: H4
// Generated: 2026-09-14T21:16:45.281Z
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
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var EMA_0 = EMA(25);
  var Stochastic_1 = Stochastic(10, 10);
  var WMA_2 = WMA(20);
  var MACD_3 = MACD(12, 26, 9);


  // ===== ENTRY =====
  if(enterLong()) {
    if(EMA_0 < 43 && crossover(Stochastic_1, 36)) {
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
  TakeProfit = 100 * PIP;  // Take profit
  Lots = 3;  // Position size

}