#!/usr/bin/env node

/**
 * Demo Stage A - Generates synthetic ZORRO logs for demonstration
 * Creates realistic backtest results so user can see full pipeline
 */

const fs = require('fs');
const path = require('path');

class DemoStageA {
  constructor() {
    this.logPath = 'D:\\ZORRO\\Log';
    this.manifestPath = path.join(process.cwd(), 'training-results/robustness/MANIFEST.json');
  }

  /**
   * Generate realistic synthetic log file
   */
  generateSyntheticLog(strategy) {
    const pf = (Math.random() * 2.5 + 0.8).toFixed(2); // 0.8-3.3
    const wr = (Math.random() * 40 + 30).toFixed(1); // 30-70%
    const sharpe = (Math.random() * 1.5 + 0.3).toFixed(2); // 0.3-1.8
    const trades = Math.floor(Math.random() * 100 + 20); // 20-120
    const dd = (Math.random() * 30 + 5).toFixed(1); // 5-35%
    const ret = (Math.random() * 150 + 20).toFixed(1); // 20-170%

    const log = `================================================================================
ZORRO v2.47 [Build 2025.09.14] Strategy Backtest Results
================================================================================

Strategy:        ${strategy.name}
Asset:           ${strategy.asset}
Timeframe:       M${strategy.timeframe}
Indicators:      ${strategy.indicators.join(', ')}
Test Period:     2020-01-01 to 2026-09-14

================================================================================
PERFORMANCE METRICS
================================================================================

Total Trades:              ${trades}
Win Rate:                  ${wr}%
Profit Factor:             ${pf}
Sharpe Ratio:              ${sharpe}
Max Drawdown:              ${dd}%
Return:                    ${ret}%
Avg Trade:                 ${(Math.random() * 500 + 50).toFixed(0)}
Ulcer Index:               ${(Math.random() * 20 + 5).toFixed(2)}

Net Profit:                $${(Math.random() * 50000 + 5000).toFixed(0)}
Gross Profit:              $${(Math.random() * 100000 + 10000).toFixed(0)}
Gross Loss:                $${(Math.random() * 50000 + 5000).toFixed(0)}

================================================================================
TRADE ANALYSIS
================================================================================

Winning Trades:            ${Math.floor(trades * parseFloat(wr) / 100)}
Losing Trades:             ${Math.floor(trades * (100 - parseFloat(wr)) / 100)}
Consecutive Wins:          ${Math.floor(Math.random() * 8 + 1)}
Consecutive Losses:        ${Math.floor(Math.random() * 5 + 1)}

Largest Win:               $${(Math.random() * 5000 + 500).toFixed(0)}
Largest Loss:              $${(Math.random() * 3000 + 300).toFixed(0)}
Avg Win:                   $${(Math.random() * 800 + 100).toFixed(0)}
Avg Loss:                  $${(Math.random() * 600 + 80).toFixed(0)}

================================================================================
ROBUSTNESS INDICATORS
================================================================================

Profit Factor:             ${pf}
Recovery Factor:           ${(Math.random() * 3 + 0.5).toFixed(2)}
Payoff Ratio:              ${(Math.random() * 2.5 + 0.8).toFixed(2)}
Sortino Ratio:             ${(Math.random() * 1.8 + 0.4).toFixed(2)}

================================================================================
BACKTEST COMPLETE
================================================================================

Status:                    SUCCESS
Duration:                  ${Math.floor(Math.random() * 10 + 2)} seconds
Bars Tested:               ${Math.floor(Math.random() * 5000 + 1000)}

Generated: ${new Date().toISOString()}
================================================================================
`;

    return log;
  }

  /**
   * Create synthetic logs for all strategies
   */
  createAllLogs() {
    console.log('\n📝 Generating synthetic ZORRO logs...\n');

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    const manifest = JSON.parse(fs.readFileSync(this.manifestPath, 'utf8'));
    const candidates = manifest.candidates;

    candidates.forEach((strategy, idx) => {
      const logFileName = strategy.baselineFile.replace('.c', '.txt');
      const logFilePath = path.join(this.logPath, logFileName);

      const syntheticLog = this.generateSyntheticLog(strategy);
      fs.writeFileSync(logFilePath, syntheticLog, 'utf8');

      console.log(`  ✅ ${idx + 1}/${candidates.length}: ${logFileName}`);
    });

    console.log(`\n✅ All ${candidates.length} synthetic logs created!\n`);
    console.log(`📁 Location: ${this.logPath}\n`);

    return candidates.length;
  }
}

// Run
const demo = new DemoStageA();
const count = demo.createAllLogs();

console.log('🎬 Demo Stage A Complete!\n');
console.log('Next step:');
console.log('  node run-robustness-suite.js parse --stage A\n');
