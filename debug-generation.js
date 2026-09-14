#!/usr/bin/env node

/**
 * Debug script - check what code is actually generated
 */

const TrainingOrchestrator = require('./skills/zorro-strategy-generator/src/training-orchestrator');
const StrategyRandomizer = require('./skills/zorro-strategy-generator/src/randomizer');

const randomizer = new StrategyRandomizer();
const strategies = randomizer.generateStrategies(1);
const strategy = strategies[0];

console.log('Generated strategy:');
console.log(JSON.stringify(strategy, null, 2));

const orchestrator = new TrainingOrchestrator({ strategyCount: 1, outputDir: './debug-test' });
const code = orchestrator.createMockStrategyCode(strategy);

console.log('\n\n=== GENERATED CODE ===\n');
console.log(code);

// Check for deprec functions
const hasMA = code.includes('MA(');
const hasProfit = code.includes('Profit');
const hasSMA = code.includes('SMA(');
const hasEMA = code.includes('EMA(');
const hasStop = code.includes('Stop');
const hasTakeProfit = code.includes('TakeProfit');

console.log('\n\n=== CODE ANALYSIS ===');
console.log(`Contains MA(: ${hasMA}`);
console.log(`Contains Profit: ${hasProfit}`);
console.log(`Contains SMA(: ${hasSMA}`);
console.log(`Contains EMA(: ${hasEMA}`);
console.log(`Contains Stop: ${hasStop}`);
console.log(`Contains TakeProfit: ${hasTakeProfit}`);
