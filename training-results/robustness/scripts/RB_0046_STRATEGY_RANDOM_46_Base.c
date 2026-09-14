// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_46 (BASELINE)
// Asset: UK100 | Timeframe: H4
// Generated: 2026-09-14T21:16:45.274Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("UK100");
  TimeFrame = 240; // minutes

  // Strategy initialization
  BarPeriod = 240;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var CCI_0 = CCI(30);
  var ATR_1 = ATR(14);
  var RSI_2 = RSI(28);


  // ===== ENTRY =====
  if(enterLong()) {
    if(CCI_0 > 69 && ATR_1 < 42) {
      enterLong();
    }
  }


  // ===== EXIT =====
  // Exit after 20 bars by default
  if(bar >= 20) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 75 * PIP;  // Stop loss
  TakeProfit = 50 * PIP;  // Take profit
  Lots = 3;  // Position size

}