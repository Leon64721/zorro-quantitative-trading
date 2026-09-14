// ===================================================
// ZORRO Strategy: STRATEGY_RANDOM_251 (BASELINE)
// Asset: UK100 | Timeframe: M5
// Generated: 2026-09-14T21:16:45.307Z
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
  MaxPosSize = 3;


  // ===== INDICATORS =====
  var ATR_0 = ATR(14);
  var BBands_1 = BBands(30, 1.5);
  var ROC_2 = ROC(5);


  // ===== ENTRY =====
  if(enterLong()) {
    if(crossunder(ATR_0, 46) && BBands_1 < 36) {
      enterLong();
    }
  }


  // ===== EXIT =====
  if(bar >= 471) {
    exitLong();
  }


  // ===== RISK MANAGEMENT =====
  Stop = 75 * PIP;  // Stop loss
  TakeProfit = 100 * PIP;  // Take profit
  Lots = 3;  // Position size

}