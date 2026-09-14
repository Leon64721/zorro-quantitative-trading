// ===================================================
// Monte Carlo Reality Check: STRATEGY_RANDOM_111
// Validates if edge is statistically significant
// P-Value: < 5% highly significant, 5-15% significant
// ===================================================

#define CYCLES 150
#define RANDOMIZE BOOTSTRAP

#include "RB_0111_STRATEGY_RANDOM_111_Base.c"

void run() {
  MonteCarlo = CYCLES;
  Confidence = 95;  // 95% confidence level

  // Call original strategy
  strategy();
}
