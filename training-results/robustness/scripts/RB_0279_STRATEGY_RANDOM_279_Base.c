// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_279 (BASELINE)
// Asset: UK100 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.291Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("UK100");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var RSI_0 = RSI(28);


  // ===== ENTRY =====
  if(enterLong()) {
    if(RSI_0 > 63) {
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
  Lots = 2;  // Position size

}