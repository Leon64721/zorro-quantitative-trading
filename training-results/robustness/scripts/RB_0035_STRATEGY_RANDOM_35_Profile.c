// ===================================================
// WFO Profile: STRATEGY_RANDOM_35
// Tests robustness across different WFO cycle counts
// Degradation > 30% indicates potential overfitting
// ===================================================

#include "RB_0035_STRATEGY_RANDOM_35_Base.c"

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
