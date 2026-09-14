#!/usr/bin/env node

/**
 * ZORRO Agent Training Script
 * Trains the agent on 500 random strategies with full backtesting and auditing
 *
 * Usage:
 *   node train-agent.js [--count 500] [--output ./training-results] [--batch 10]
 */

const TrainingOrchestrator = require('./skills/zorro-strategy-generator/src/training-orchestrator');

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const config = {
    strategyCount: 500,
    outputDir: './training-results',
    batchSize: 10,
    parallel: true,
    generateReports: true
  };

  // Override with CLI args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count' && args[i + 1]) {
      config.strategyCount = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      config.outputDir = args[i + 1];
      i++;
    } else if (args[i] === '--batch' && args[i + 1]) {
      config.batchSize = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--no-parallel') {
      config.parallel = false;
    } else if (args[i] === '--help' || args[i] === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  try {
    console.log(`🤖 ZORRO Agent Training System`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`\n📋 Configuration:`);
    console.log(`   Strategies: ${config.strategyCount}`);
    console.log(`   Batch size: ${config.batchSize}`);
    console.log(`   Output: ${config.outputDir}`);
    console.log(`   Parallel: ${config.parallel}`);
    console.log(`\n⏱️  This will take approximately:`);
    console.log(`   - Generation: < 1 minute`);
    console.log(`   - Backtesting: 2-8 hours (depending on parallel)`);
    console.log(`   - Analysis: 5-10 minutes`);
    console.log(`   - Total: ~2-8+ hours\n`);

    console.log(`Starting training...\n`);

    const orchestrator = new TrainingOrchestrator(config);
    const report = await orchestrator.runTraining();

    console.log(`\n🎓 Training completed successfully!`);
    console.log(`\nReports available in: ${config.outputDir}/report/`);
    console.log(`   - TRAINING_REPORT.md (Human-readable)`);
    console.log(`   - LEARNING_REPORT.json (Machine-readable)`);
    console.log(`   - AUDIT_REPORT.json (Quality metrics)`);

  } catch (error) {
    console.error(`\n❌ Training failed: ${error.message}`);
    console.error(`\nStack trace:`);
    console.error(error.stack);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
ZORRO Agent Training Script

Usage: node train-agent.js [options]

Options:
  --count N          Number of strategies to train (default: 500)
  --output PATH      Output directory (default: ./training-results)
  --batch N          Batch size for processing (default: 10)
  --no-parallel      Disable parallel processing
  --help, -h         Show this help message

Examples:
  # Train on 500 strategies
  node train-agent.js

  # Train on 100 strategies with custom output
  node train-agent.js --count 100 --output ./my-training

  # Smaller batches for better progress feedback
  node train-agent.js --count 500 --batch 5

Features:
  ✅ Generate 500 random strategies with varied indicators
  ✅ Backtest each strategy automatically
  ✅ Optimize parameters (grid search, Monte Carlo, Walk Forward)
  ✅ Real-time auditing and quality checks
  ✅ Track agent learning progression
  ✅ Generate comprehensive reports
  ✅ Top 10 strategies identification
  ✅ Indicator effectiveness analysis
  ✅ ML-ready training dataset creation

Output:
  training-results/
  ├── strategies/              (500 .c files)
  ├── backtests/              (500 results)
  ├── audit/                  (quality logs)
  ├── report/                 (final reports)
  └── learning/               (evolution metrics)
  `);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main };
