// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_85 (BASELINE)
// Asset: GER30 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.299Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("GER30");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var ROC_0 = ROC(10);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossover(ROC_0, 22)) {
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