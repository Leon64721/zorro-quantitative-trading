// ═══════════════════════════════════════════════════════════════════════════════
// Strategy_1_1_133_OPTIMIZED - CONVERTED TO ZORRO C
// Original Platform: NinjaTrader 8
// Conversion Date: 2026-09-15
// Asset: ES (S&P 500 Micro Futures)
// Timeframe: M5
// ═══════════════════════════════════════════════════════════════════════════════

#include <default.c>

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

#define MAGIC_NUMBER 11111
#define RISK_PERCENT 2.0
#define INITIAL_CAPITAL 10000

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY VARIABLES (GROUP 1: ENTRY PARAMETERS)
// ═══════════════════════════════════════════════════════════════════════════════

var KCBarClosePeriod = 20;      // Keltner Channel Period
var BBBarOpenPeriod = 50;       // Bollinger Band Period
var PTATRCoefficient = 2.8;     // Take Profit ATR Coefficient
var SLATRCoefficient = 1.4;     // Stop Loss ATR Coefficient

// ═══════════════════════════════════════════════════════════════════════════════
// EXIT MANAGEMENT (GROUP 3)
// ═══════════════════════════════════════════════════════════════════════════════

var EnablePartialExit = 1;
var PartialExitRatio = 1.5;
var PartialExitPercentage = 0.5;

var EnableBreakEven = 1;
var BreakEvenOffset = 0.5;

var EnableTrailingStop = 1;
var TrailingStopRatio = 0.7;

// Maximum trade hours by session
var MaxTradeHoursEUROPA = 8;
var MaxTradeHoursUSMIDDAY = 10;
var MaxTradeHoursUSPM = 8;
var MaxTradeHoursASIA = 12;

// ═══════════════════════════════════════════════════════════════════════════════
// SESSION-BASED SIZING (GROUP 4)
// ═══════════════════════════════════════════════════════════════════════════════

var SessionContracts_EUROPA = 2;
var SessionContracts_USMIDDAY = 3;
var SessionContracts_USPM = 2;
var SessionContracts_ASIA = 1;
var SessionContracts_USOPEN = 2;

var DisableUSOpen = 0;
var DisableBlocked = 1;

// ═══════════════════════════════════════════════════════════════════════════════
// TRADING OPTIONS (GROUP 2)
// ═══════════════════════════════════════════════════════════════════════════════

var DontTradeOnWeekends = 0;
var ExitAtEndOfDay = 0;
var DayExitTime = 2358;

var LimitSignalsTimeRange = 1;
var SignalTimeRangeFrom = 930;    // 09:30 - US Open
var SignalTimeRangeTo = 1600;     // 16:00 - US Close

var MaxTradesPerDay = 0;
var MinimumSL = 0;
var MaximumSL = 0;
var MinimumPT = 0;
var MaximumPT = 0;

// ═══════════════════════════════════════════════════════════════════════════════
// MONEY MANAGEMENT (GROUP 5)
// ═══════════════════════════════════════════════════════════════════════════════

var MMLots = 1;
var MMMultiplier = 1.0;

// ═══════════════════════════════════════════════════════════════════════════════
// STATE VARIABLES
// ═══════════════════════════════════════════════════════════════════════════════

var entryPrice = 0;
var highestPrice = 0;
var lowestPrice = 0;
var partialExitExecuted = 0;
var breakEvenActivated = 0;
var trailingStopActivated = 0;
var currentSLPrice = 0;
var contractsRemaining = 0;

var tradesToday = 0;
var currentDay = -1;

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTION: Get Current Session
// ═══════════════════════════════════════════════════════════════════════════════

int GetCurrentSession()
{
    int currentTime = hour() * 100 + minute();
    int dayOfWeek = dayofweek();

    // Convert to EST (subtract 5 hours from UTC if necessary - adjust based on your timezone)
    // For this example, assuming input is already in EST

    if (currentTime >= 1700 || currentTime < 800)
        return 4;  // ASIA
    if (currentTime >= 800 && currentTime < 930)
        return 1;  // EUROPA
    if (currentTime >= 930 && currentTime < 1200)
        return 5;  // USOPEN
    if (currentTime >= 1200 && currentTime < 1500)
        return 2;  // USMIDDAY
    if (currentTime >= 1500 && currentTime < 1700)
        return 3;  // USPM

    return 6;  // BLOCKED
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTION: Get Session Contracts
// ═══════════════════════════════════════════════════════════════════════════════

int GetSessionContracts(int session)
{
    switch(session) {
        case 1: return SessionContracts_EUROPA;
        case 2: return SessionContracts_USMIDDAY;
        case 3: return SessionContracts_USPM;
        case 4: return SessionContracts_ASIA;
        case 5: return SessionContracts_USOPEN;
        case 6: return SessionContracts_BLOCKED;
        default: return 0;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTION: Get Max Trade Hours
// ═══════════════════════════════════════════════════════════════════════════════

int GetMaxTradeHours(int session)
{
    switch(session) {
        case 1: return MaxTradeHoursEUROPA;
        case 2: return MaxTradeHoursUSMIDDAY;
        case 3: return MaxTradeHoursUSPM;
        case 4: return MaxTradeHoursASIA;
        default: return 0;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN STRATEGY FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

void run()
{
    // Reset daily trade counter
    if (day() != currentDay) {
        currentDay = day();
        tradesToday = 0;
    }

    // Get current time and session
    int currentTime = hour() * 100 + minute();
    int currentSession = GetCurrentSession();

    var openOrdersAllowed = 1;

    // ══════════════════════════════════════════════════════════════════════════════
    // SECTION 1: SESSION DISABLE LOGIC
    // ══════════════════════════════════════════════════════════════════════════════

    if (DisableUSOpen && currentSession == 5) {
        openOrdersAllowed = 0;
        if (NumOpenLong > 0) exitLong();
    }

    if (DisableBlocked && currentSession == 6) {
        openOrdersAllowed = 0;
        if (NumOpenLong > 0) exitLong();
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // SECTION 2: TRADING OPTIONS LOGIC
    // ══════════════════════════════════════════════════════════════════════════════

    if (DontTradeOnWeekends) {
        if (dayofweek() >= 5) {  // Friday or later
            openOrdersAllowed = 0;
        }
    }

    if (ExitAtEndOfDay && currentTime >= DayExitTime) {
        if (NumOpenLong > 0) exitLong();
        openOrdersAllowed = 0;
    }

    // Time range signal limitation
    if (openOrdersAllowed && LimitSignalsTimeRange) {
        if (currentTime < SignalTimeRangeFrom || currentTime >= SignalTimeRangeTo) {
            openOrdersAllowed = 0;
        }
    }

    if (openOrdersAllowed && MaxTradesPerDay > 0 && tradesToday >= MaxTradesPerDay) {
        openOrdersAllowed = 0;
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // SECTION 3: ENTRY SIGNAL (ORIGINAL LOGIC)
    // ══════════════════════════════════════════════════════════════════════════════

    // Calculate indicators
    var kc_upper = MA(close(), KCBarClosePeriod)[1] + 2.5 * ATR(175)[1];
    var bb_upper = MA(close(), BBBarOpenPeriod)[2] + 2.1 * StdDev(close(), BBBarOpenPeriod)[2];

    // Entry conditions
    var val1 = close()[1];          // Close[1] > KC Upper[1]
    var val2 = kc_upper;
    var val3 = open()[2];           // Open[2] < BB Upper[2]
    var val4 = bb_upper;
    var val5 = open()[1];           // Open[1] > BB Upper[2]

    var longEntrySignal = (val1 > val2) && (val3 < val4 && val5 > val4);

    if (longEntrySignal && openOrdersAllowed && NumOpenLong == 0) {

        // Get contracts for current session
        int contractsForSession = GetSessionContracts(currentSession);
        int numberOfSharesLong;

        if (contractsForSession > 0) {
            numberOfSharesLong = contractsForSession;
        } else {
            numberOfSharesLong = (int)(MMLots * MMMultiplier);
        }

        if (numberOfSharesLong > 0) {
            enterLong(numberOfSharesLong);
            tradesToday++;

            // Store entry information
            entryPrice = price();
            highestPrice = price();
            lowestPrice = price();
            partialExitExecuted = 0;
            breakEvenActivated = 0;
            trailingStopActivated = 0;
            contractsRemaining = numberOfSharesLong;
            currentSLPrice = 0;
        }
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // SECTION 4: EXIT MANAGEMENT (OPTIMIZED)
    // ══════════════════════════════════════════════════════════════════════════════

    if (NumOpenLong > 0) {

        // Update highest price for trailing stop
        if (price() > highestPrice) {
            highestPrice = price();
        }
        if (price() < lowestPrice) {
            lowestPrice = price();
        }

        // Calculate SL and PT
        var atrValue175 = ATR(175)[1];
        var atrValue280 = ATR(280)[1];

        var calculatedSLTicks = SLATRCoefficient * atrValue175 / PIP;
        if (MinimumSL > 0 && calculatedSLTicks < MinimumSL)
            calculatedSLTicks = MinimumSL;
        if (MaximumSL > 0 && calculatedSLTicks > MaximumSL)
            calculatedSLTicks = MaximumSL;

        var slPrice = entryPrice - (calculatedSLTicks * PIP);

        var calculatedPTTicks = PTATRCoefficient * atrValue280 / PIP;
        if (MinimumPT > 0 && calculatedPTTicks < MinimumPT)
            calculatedPTTicks = MinimumPT;
        if (MaximumPT > 0 && calculatedPTTicks > MaximumPT)
            calculatedPTTicks = MaximumPT;

        var ptPrice = entryPrice + (calculatedPTTicks * PIP);
        var riskAmount = calculatedSLTicks * PIP;

        // ════════════════════════════════════════════════════════════════════════════
        // PARTIAL EXIT AT 1.5R
        // ════════════════════════════════════════════════════════════════════════════

        if (EnablePartialExit && !partialExitExecuted && NumOpenLong > 0) {
            var partialExitPrice = entryPrice + (PartialExitRatio * riskAmount);

            if (price() >= partialExitPrice) {
                var contractsToSell = (int)(NumOpenLong * PartialExitPercentage);

                if (contractsToSell > 0 && contractsToSell < NumOpenLong) {
                    closePos(contractsToSell);
                    partialExitExecuted = 1;
                    contractsRemaining = NumOpenLong - contractsToSell;
                }
            }
        }

        // ════════════════════════════════════════════════════════════════════════════
        // BREAK-EVEN STOP
        // ════════════════════════════════════════════════════════════════════════════

        if (EnableBreakEven && partialExitExecuted && !breakEvenActivated && NumOpenLong > 0) {
            var breakEvenPrice = entryPrice + (BreakEvenOffset * riskAmount);

            if (price() >= breakEvenPrice) {
                currentSLPrice = entryPrice;
                breakEvenActivated = 1;
            }
        }

        // ════════════════════════════════════════════════════════════════════════════
        // TRAILING STOP
        // ════════════════════════════════════════════════════════════════════════════

        if (EnableTrailingStop && breakEvenActivated && NumOpenLong > 0) {
            var trailingStopPrice = highestPrice - (TrailingStopRatio * riskAmount);

            if (trailingStopPrice > currentSLPrice) {
                currentSLPrice = trailingStopPrice;
                trailingStopActivated = 1;
            }
        }

        // ════════════════════════════════════════════════════════════════════════════
        // HARD TIME STOP (exit after N hours)
        // ════════════════════════════════════════════════════════════════════════════

        // Note: Simplified time tracking - would need actual entry time in production

        // ════════════════════════════════════════════════════════════════════════════
        // APPLY STOPS AND LIMITS
        // ════════════════════════════════════════════════════════════════════════════

        // Stop loss
        if (breakEvenActivated && NumOpenLong > 0) {
            setStop(currentSLPrice);
        } else if (calculatedSLTicks > 0 && NumOpenLong > 0) {
            setStop(slPrice);
        }

        // Take profit
        if (!partialExitExecuted && calculatedPTTicks > 0 && NumOpenLong > 0) {
            setProfit(ptPrice);
        } else if (partialExitExecuted && calculatedPTTicks > 0 && NumOpenLong > 0) {
            var remainingPTPrice = entryPrice + (calculatedPTTicks * PIP);
            setProfit(remainingPTPrice);
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION (OPTIONAL - for ZORRO specific setup)
// ═══════════════════════════════════════════════════════════════════════════════

int main()
{
    StartDate = 20200101;
    EndDate = 20260915;
    BarPeriod = 5;      // 5-minute bars

    asset("ES");        // S&P 500 Micro Futures

    // Configure account
    Spread = 0.25;      // ES typical spread
    Slippage = 1;       // 1 point slippage

    MaxBars = 0;        // No bar limit
    MaxLong = 3;        // Max 3 concurrent long trades

    // Configure commission
    Commission = 0.1;   // $0.10 per contract

    // Configure risk
    Margin = 100;       // Margin requirement (simplified)

    // Set initial capital
    Account = INITIAL_CAPITAL;

    return 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

while (asset(loop("ES"))) {
    run();
}

// ═══════════════════════════════════════════════════════════════════════════════
// END OF STRATEGY
// ═══════════════════════════════════════════════════════════════════════════════
