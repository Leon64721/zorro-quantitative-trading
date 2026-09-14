// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_309 (BASELINE)
// Asset: GBP/USD | Timeframe: M15
// Generated: 2026-09-14T21:16:45.286Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("GBP/USD");
  TimeFrame = 15; // minutes

  // Strategy initialization
  BarPeriod = 15;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var RSI_0 = RSI(14);


  // ===== ENTRY =====
  if(enterLong()) {
    if(RSI_0 > 51) {
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
  TakeProfit = 150 * PIP;  // Take profit
  Lots = 3;  // Position size

}