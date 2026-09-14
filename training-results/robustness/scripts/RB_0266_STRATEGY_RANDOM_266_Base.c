// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_266 (BASELINE)
// Asset: EUR/USD | Timeframe: M5
// Generated: 2026-09-14T21:16:45.271Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("EUR/USD");
  TimeFrame = 5; // minutes

  // Strategy initialization
  BarPeriod = 5;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var CCI_0 = CCI(30);


  // ===== ENTRY =====
  if(enterLong()) {
    if(CCI_0 > 71) {
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
  TakeProfit = 100 * PIP;  // Take profit
  Lots = 2;  // Position size

}