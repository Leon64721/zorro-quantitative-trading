// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_203 (BASELINE)
// Asset: EUR/USD | Timeframe: H1
// Generated: 2026-09-14T21:16:45.305Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("EUR/USD");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 1;


  // ===== INDICATORS =====
  var ROC_0 = ROC(5);
  var BBands_1 = BBands(30, 1.5);


  // ===== ENTRY =====
  if(enterLong()) {
    if(ROC_0 < 42 && BBands_1 < 62) {
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