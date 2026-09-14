// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_308 (BASELINE)
// Asset: NAS100 | Timeframe: H1
// Generated: 2026-09-14T21:16:45.279Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("NAS100");
  TimeFrame = 60; // minutes

  // Strategy initialization
  BarPeriod = 60;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 5;


  // ===== INDICATORS =====
  var EMA_0 = EMA(30);


  // ===== ENTRY =====
  if(enterLong()) {
    if(EMA_0 > 44) {
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
  TakeProfit = 200 * PIP;  // Take profit
  Lots = 5;  // Position size

}