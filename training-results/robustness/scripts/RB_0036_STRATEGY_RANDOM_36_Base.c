// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_36 (BASELINE)
// Asset: XAU/USD | Timeframe: M5
// Generated: 2026-09-14T21:16:45.288Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("XAU/USD");
  TimeFrame = 5; // minutes

  // Strategy initialization
  BarPeriod = 5;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var RSI_0 = RSI(21);
  var DEMA_1 = DEMA(10);
  var BBands_2 = BBands(30, 1.5);
  var ADX_3 = ADX(14);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossunder(RSI_0, 36) && DEMA_1 < 20) {
      enterLong();
    }
  }


  // ===== EXIT =====
  // Exit after 20 bars by default
  if(bar >= 20) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 30 * PIP;  // Stop loss
  TakeProfit = 50 * PIP;  // Take profit
  Lots = 2;  // Position size

}