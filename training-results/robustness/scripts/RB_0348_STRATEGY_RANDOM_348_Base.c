// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_348 (BASELINE)
// Asset: XAU/USD | Timeframe: M5
// Generated: 2026-09-14T21:16:45.312Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("XAU/USD");
  TimeFrame = 5; // minutes

  // Strategy initialization
  BarPeriod = 5;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 2;


  // ===== INDICATORS =====
  var ATR_0 = ATR(21);
  var EMA_1 = EMA(25);
  var EMA_2 = EMA(15);
  var SMA_3 = SMA(20);


  // ===== ENTRY =====
  if(enterLong()) {
    if(ATR_0 > 70 && EMA_1 > 58) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 275) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 50 * PIP;  // Stop loss
  TakeProfit = 100 * PIP;  // Take profit
  Lots = 2;  // Position size

}