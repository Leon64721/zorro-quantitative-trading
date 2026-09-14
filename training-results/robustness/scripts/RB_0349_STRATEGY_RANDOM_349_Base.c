// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_349 (BASELINE)
// Asset: XAU/USD | Timeframe: H4
// Generated: 2026-09-14T21:16:45.276Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("XAU/USD");
  TimeFrame = 240; // minutes

  // Strategy initialization
  BarPeriod = 240;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var CCI_0 = CCI(30);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossunder(CCI_0, 37)) {
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
  TakeProfit = 150 * PIP;  // Take profit
  Lots = 2;  // Position size

}