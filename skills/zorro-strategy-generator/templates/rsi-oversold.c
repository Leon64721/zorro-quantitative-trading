// RSI Oversold/Overbought Strategy - Auto-Generated
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

    // ===== RSI INDICATORS =====
    var rsi = RSI(Close, 14);                     // RSI oscillator
    var atr = ATR(14);                            // Volatility for stops

    // ===== RISK MANAGEMENT =====
    Stop = 2 * atr;
    TakeProfit = 3 * atr;
    Lots = 1;

    // ===== ENTRY LOGIC: RSI OVERSOLD =====
    // Buy when RSI < 30 (oversold)
    if(rsi < 30 && !NumOpenLong)
    {
        enterLong();
        printf("\nENTRY LONG: RSI Oversold (%.0f) at %.4f", rsi, price());
    }

    // ===== EXIT LOGIC: RSI OVERBOUGHT =====
    // Sell when RSI > 70 (overbought) or hit TP/SL
    if(NumOpenLong > 0 && rsi > 70)
    {
        exitLong();
        printf("\nEXIT LONG: RSI Overbought (%.0f) at %.4f", rsi, price());
    }
}
