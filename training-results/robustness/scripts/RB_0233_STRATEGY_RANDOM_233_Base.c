// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_233 (BASELINE)
// Asset: GBP/USD | Timeframe: M5
// Generated: 2026-09-14T21:16:45.310Z
// ===================================================

#include <default.c>

void run() {
  set(PARAMETER);
  setf(PlotWidth, 600);

  // Asset configuration
  asset("GBP/USD");
  TimeFrame = 5; // minutes

  // Strategy initialization
  BarPeriod = 5;

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var ATR_0 = ATR(21);
  var BBands_1 = BBands(30, 2.5);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossover(ATR_0, 74) && BBands_1 > 36) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 325) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 100 * PIP;  // Stop loss
  TakeProfit = 150 * PIP;  // Take profit
  Lots = 3;  // Position size

}