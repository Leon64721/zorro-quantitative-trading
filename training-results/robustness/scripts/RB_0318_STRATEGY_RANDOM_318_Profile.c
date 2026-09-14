// ===================================================
// WFO Profile: STRATEGY_RANDOM_318
// Tests robustness across different WFO cycle counts
// Degradation > 30% indicates potential overfitting
// ===================================================

#include "RB_0318_STRATEGY_RANDOM_318_Base.c"

void run() {
  // Test different WFO configurations
  int minCycles = 5;
  int maxCycles = 20;

  for(int cycles = minCycles; cycles <= maxCycles; cycles++) {
    NumWFOCycles = cycles;
    DataSplit = 80;

    strategy();
  }
}
