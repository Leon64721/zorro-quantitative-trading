// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_111 (BASELINE)
// Asset: EUR/USD | Timeframe: H4
// Generated: 2026-09-14T21:16:45.314Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("EUR/USD");
  TimeFrame = 240; // minutes

  // Strategy initialization
  BarPeriod = 240;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var MACD_0 = MACD(12, 26, 9);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossover(MACD_0, 32)) {
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
  TakeProfit = 200 * PIP;  // Take profit
  Lots = 3;  // Position size

}