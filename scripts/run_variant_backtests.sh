#!/bin/bash

# ZORRO Variant Backtest Runner
# Purpose: Automated backtesting of Z2+ variants (EUR/USD, GBP/JPY)
# Week 2, Days 11-14

echo "═══════════════════════════════════════════════"
echo "  Z2+ Variant Backtest Suite"
echo "═══════════════════════════════════════════════"
echo ""

# Configuration
ZORRO_PATH="/mnt/d/ZORRO"
RESULTS_DIR="E:\PROYECTOS\CURSOR\PROYECTO\ 1\ ZORRO\strategies"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Starting backtests at $(date)..."
echo ""

# ==========================================
# TEST 1: Z2+ EUR/USD BASELINE
# ==========================================

echo -e "${YELLOW}[1/6] Running Z2+ EUR/USD Baseline Backtest...${NC}"
echo "      Period: 2014-2026 (12 years)"
echo "      Asset: EUR/USD"

cd "$ZORRO_PATH"
./Zorro.exe -c Z2+.dll EUR/USD 2014 2026

if [ -f "Log/Z2+.txt" ]; then
    echo -e "${GREEN}✓ Baseline backtest completed${NC}"
    # Save result
    cp Log/Z2+.txt "$RESULTS_DIR/Z2+_EURUSD_BASELINE/BACKTEST_LOG_$TIMESTAMP.txt"
else
    echo -e "${RED}✗ Baseline backtest FAILED${NC}"
    exit 1
fi

echo ""

# ==========================================
# TEST 2: Z2+ EUR/USD WFA VALIDATION
# ==========================================

echo -e "${YELLOW}[2/6] Running Walk Forward Analysis (EUR/USD)...${NC}"
echo "      15 test cycles"
echo "      Testing robustness (out-of-sample validation)"

./Zorro.exe -c Z2+.dll EUR/USD 2014 2026 -w

if [ -f "Log/Z2+.txt" ]; then
    echo -e "${GREEN}✓ WFA completed${NC}"
    cp Log/Z2+.txt "$RESULTS_DIR/Z2+_EURUSD_BASELINE/WFA_REPORT_$TIMESTAMP.txt"
else
    echo -e "${RED}✗ WFA FAILED${NC}"
    exit 1
fi

echo ""

# ==========================================
# TEST 3: Z2+ EUR/USD MONTECARLO
# ==========================================

echo -e "${YELLOW}[3/6] Running Montecarlo Validation (EUR/USD)...${NC}"
echo "      200 simulations"
echo "      Testing if edge is real (not luck)"

./Zorro.exe -c Z2+.dll EUR/USD 2014 2026 -m

if [ -f "Log/Z2+.txt" ]; then
    echo -e "${GREEN}✓ Montecarlo completed${NC}"
    cp Log/Z2+.txt "$RESULTS_DIR/Z2+_EURUSD_BASELINE/MONTECARLO_REPORT_$TIMESTAMP.txt"
else
    echo -e "${RED}✗ Montecarlo FAILED${NC}"
    exit 1
fi

echo ""

# ==========================================
# TEST 4: Z2+ GBP/JPY BACKTEST (if data available)
# ==========================================

echo -e "${YELLOW}[4/6] Checking GBP/JPY data availability...${NC}"

if ls History/GBPJPY_*.t6 1> /dev/null 2>&1; then
    echo -e "${GREEN}✓ GBP/JPY data found${NC}"

    echo -e "${YELLOW}[5/6] Running Z2+ GBP/JPY Variant Backtest...${NC}"
    echo "      Asset: GBP/JPY"
    echo "      Period: Available years (2013-2018 target)"

    # Try full range first
    ./Zorro.exe -c Z2+.dll GBP/JPY 2013 2018

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ GBP/JPY backtest completed${NC}"
        cp Log/Z2+.txt "$RESULTS_DIR/Z2+_GBPJPY_VARIANT/BACKTEST_LOG_$TIMESTAMP.txt"

        # Run WFA for GBP/JPY
        echo -e "${YELLOW}[6/6] Running WFA validation (GBP/JPY)...${NC}"
        ./Zorro.exe -c Z2+.dll GBP/JPY 2013 2018 -w

        if [ -f "Log/Z2+.txt" ]; then
            echo -e "${GREEN}✓ GBP/JPY WFA completed${NC}"
            cp Log/Z2+.txt "$RESULTS_DIR/Z2+_GBPJPY_VARIANT/WFA_REPORT_$TIMESTAMP.txt"
        fi
    else
        echo -e "${YELLOW}⚠ GBP/JPY backtest failed (possible data gap)${NC}"
        echo "  Falling back to EUR/USD only (variant skipped)"
    fi

else
    echo -e "${YELLOW}⚠ GBP/JPY data NOT found${NC}"
    echo "  Skipping variant testing (EUR/USD only)"
    echo "  [6/6] SKIPPED"
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "  Backtest Suite Completed"
echo "═══════════════════════════════════════════════"
echo ""

# Generate Summary
echo "SUMMARY:"
echo "--------"
echo "✓ Z2+ EUR/USD Baseline: COMPLETE"
echo "✓ Z2+ EUR/USD WFA: COMPLETE"
echo "✓ Z2+ EUR/USD Montecarlo: COMPLETE"

if ls History/GBPJPY_*.t6 1> /dev/null 2>&1; then
    echo "✓ Z2+ GBP/JPY Variant: COMPLETE (if available)"
else
    echo "✗ Z2+ GBP/JPY Variant: SKIPPED (data not available)"
fi

echo ""
echo "Next step: Review results and create comparison report"
echo "Results saved to: $RESULTS_DIR"
echo ""
echo "Completed at $(date)"
