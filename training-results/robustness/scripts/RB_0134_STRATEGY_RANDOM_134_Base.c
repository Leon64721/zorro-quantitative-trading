// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_134 (BASELINE)
// Asset: XAU/USD | Timeframe: H1
// Generated: 2026-09-14T21:16:45.283Z
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
  MaxPosSize = 5;


  // ===== INDICATORS =====
  var EMA_0 = EMA(20);
  var MACD_1 = MACD(12, 26, 9);
  var EMA_2 = EMA(5);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossunder(EMA_0, 56) && MACD_1 > 28) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 229) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 50 * PIP;  // Stop loss
  TakeProfit = 150 * PIP;  // Take profit
  Lots = 5;  // Position size

}