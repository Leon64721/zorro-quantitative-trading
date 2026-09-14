// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_35 (BASELINE)
// Asset: UK100 | Timeframe: M5
// Generated: 2026-09-14T21:16:45.295Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("UK100");
  TimeFrame = 5; // minutes

  // Strategy initialization
  BarPeriod = 5;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var ADX_0 = ADX(14);


  // ===== ENTRY =====
  if(enterLong()) {
    if(ADX_0 > 46) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 370) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 75 * PIP;  // Stop loss
  TakeProfit = 50 * PIP;  // Take profit
  Lots = 2;  // Position size

}