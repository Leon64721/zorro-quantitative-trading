// ===================================================
// Monte Carlo Reality Check: STRATEGY_RANDOM_279
// Validates if edge is statistically significant
// P-Value: < 5% highly significant, 5-15% significant
// ===================================================

#define CYCLES 150
#define RANDOMIZE BOOTSTRAP

#include "RB_0279_STRATEGY_RANDOM_279_Base.c"

void run() {
  MonteCarlo = CYCLES;
  Confidence = 95;  // 95% confidence level

  // Call original strategy
  strategy();
}
