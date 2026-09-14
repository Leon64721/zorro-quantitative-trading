// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_71 (BASELINE)
// Asset: GBP/USD | Timeframe: H1
// Generated: 2026-09-14T21:16:45.301Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("GBP/USD");
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
    if(ROC_0 > 70) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 210) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 75 * PIP;  // Stop loss
  TakeProfit = 150 * PIP;  // Take profit
  Lots = 3;  // Position size

}