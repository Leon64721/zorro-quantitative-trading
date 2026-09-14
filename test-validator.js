#!/usr/bin/env node

/**
 * Test validator fixes
 */

const StrategyValidator = require('./skills/zorro-strategy-generator/src/validator');
const StrategyRandomizer = require('./skills/zorro-strategy-generator/src/randomizer');
const TrainingOrchestrator = require('./skills/zorro-strategy-generator/src/training-orchestrator');

const randomizer = new StrategyRandomizer();
const strategies = randomizer.generateStrategies(5);
const orchestrator = new TrainingOrchestrator({ strategyCount: 5, outputDir: './test-validator' });
const validator = new StrategyValidator();

console.log('Testing validator on 5 random strategies...\n');

strategies.forEach((strategy, idx) => {
  const code = orchestrator.createMockStrategyCode(strategy);
  const result = validator.validate(code);

  console.log(`Strategy ${idx + 1}:`);
  console.log(`  Indicators: ${strategy.indicators.map(i => i.name).join(', ')}`);
  console.log(`  Valid: ${result.valid ? '✅ YES' : '❌ NO'}`);

  if (result.errors.length > 0) {
    console.log(`  Errors (${result.errors.length}):`);
    result.errors.forEach(e => {
      console.log(`    - ${e.type}: ${e.message}`);
    });
  } else {
    console.log(`  Errors: None ✅`);
  }

  if (result.warnings.length > 0) {
    console.log(`  Warnings (${result.warnings.length}):`);
    result.warnings.slice(0, 2).forEach(w => {
      console.log(`    - ${w.type}`);
    });
    if (result.warnings.length > 2) {
      console.log(`    ... and ${result.warnings.length - 2} more`);
    }
  }

  console.log();
});

const allValid = strategies.every((strategy, idx) => {
  const code = orchestrator.createMockStrategyCode(strategy);
  const result = validator.validate(code);
  return result.valid;
});

console.log(`\n✨ SUMMARY: ${allValid ? '✅ All strategies pass validation!' : '❌ Some strategies failed validation'}`);
