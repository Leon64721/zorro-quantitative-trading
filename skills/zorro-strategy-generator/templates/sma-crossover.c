// SMA Crossover Strategy - Auto-Generated
// Description: {{DESCRIPTION}}
// Date: {{DATE}}

#include <default.c>

function run()
{
    // ===== CONFIGURATION =====
    BarPeriod = {{BARPERIOD}};
    StartDate = {{STARTDATE}};
    EndDate = {{ENDDATE}};
    asset("{{ASSET}}");
    LookBack = {{LOOKBACK}};

    set(PLOTNOW|LOGFILE);

    // ===== SERIES =====
    vars Close = series(priceClose());

    // ===== SMA INDICATORS =====
    var sma_fast = SMA(Close, 10);                // Fast moving average
    var sma_slow = SMA(Close, 20);                // Slow moving average
    var atr = ATR(14);                            // Volatility

    // ===== RISK MANAGEMENT =====
    Stop = 2 * atr;                               // Stop loss = 2x ATR
    TakeProfit = 3 * atr;                         // Take profit = 3x ATR
    Lots = 1;                                     // One contract

    // ===== ENTRY LOGIC: SMA CROSSOVER =====
    if(crossOver(sma_fast, sma_slow) && !NumOpenLong)
    {
        enterLong();
        printf("\nENTRY LONG: SMA Fast (%.0f) > SMA Slow (%.0f) at %.4f",
               sma_fast, sma_slow, price());
    }

    // ===== EXIT LOGIC: SMA CROSSUNDER =====
    if(NumOpenLong > 0 && crossUnder(sma_fast, sma_slow))
    {
        exitLong();
        printf("\nEXIT LONG: SMA Crossunder at %.4f", price());
    }
}
