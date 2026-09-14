#!/usr/bin/env node

/**
 * Stage A Monitor - Real-time progress tracking
 * Shows which scripts have completed, metrics extracted, and time elapsed
 * Run this in a separate terminal while executing backtests
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logPath = 'D:\\ZORRO\\Log';
const manifestPath = path.join(process.cwd(), 'training-results/robustness/MANIFEST.json');
const strategyPath = 'D:\\ZORRO\\Strategy';

class StageAMonitor {
  constructor() {
    this.manifest = this.loadManifest();
    this.startTime = Date.now();
    this.completedCount = 0;
    this.metricsCache = {};
  }

  loadManifest() {
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
    return null;
  }

  /**
   * Check which scripts have completed (logs exist)
   */
  checkCompletion() {
    if (!this.manifest) return [];

    const completed = [];

    this.manifest.candidates.forEach((candidate, idx) => {
      const baseName = candidate.baselineFile.replace('.c', '');
      const logFile = path.join(logPath, `${baseName}.txt`);

      if (fs.existsSync(logFile)) {
        const metrics = this.parseMetrics(logFile);
        candidate.metrics = metrics;
        candidate.status = 'complete';
        completed.push({
          id: idx + 1,
          name: candidate.name,
          asset: candidate.asset,
          timeframe: candidate.timeframe,
          indicators: candidate.indicators.join('+'),
          pf: metrics.profitFactor?.toFixed(2),
          wr: metrics.winRate?.toFixed(1),
          sharpe: metrics.sharpeRatio?.toFixed(2),
          trades: metrics.totalTrades
        });
      }
    });

    return completed;
  }

  /**
   * Parse metrics from ZORRO log
   */
  parseMetrics(logFile) {
    const metrics = {
      profitFactor: null,
      winRate: null,
      sharpeRatio: null,
      totalTrades: null,
      maxDrawdown: null,
      returnPercent: null
    };

    try {
      const content = fs.readFileSync(logFile, 'utf8');

      const pfMatch = content.match(/Profit Factor:\s*([\d.]+)/i);
      if (pfMatch) metrics.profitFactor = parseFloat(pfMatch[1]);

      const wrMatch = content.match(/Win Rate:\s*([\d.]+)%/i);
      if (wrMatch) metrics.winRate = parseFloat(wrMatch[1]);

      const sharpeMatch = content.match(/Sharpe Ratio:\s*([\d.]+)/i);
      if (sharpeMatch) metrics.sharpeRatio = parseFloat(sharpeMatch[1]);

      const tradesMatch = content.match(/Total Trades:\s*(\d+)/i);
      if (tradesMatch) metrics.totalTrades = parseInt(tradesMatch[1]);

      const ddMatch = content.match(/Max Drawdown:\s*([\d.]+)%/i);
      if (ddMatch) metrics.maxDrawdown = parseFloat(ddMatch[1]);

      const retMatch = content.match(/Return:\s*([\d.]+)%/i);
      if (retMatch) metrics.returnPercent = parseFloat(retMatch[1]);
    } catch (err) {
      // Ignore parse errors
    }

    return metrics;
  }

  /**
   * Display progress dashboard
   */
  displayDashboard(completed) {
    console.clear();

    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    const total = this.manifest.candidates.length;
    const pending = total - completed.length;
    const percentComplete = Math.round((completed.length / total) * 100);
    const progressBar = this.getProgressBar(percentComplete);

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║          🔬 ZORRO Stage A - Real-time Monitor             ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log(`⏱️  Elapsed: ${minutes}m ${seconds}s`);
    console.log(`📊 Progress: ${completed.length}/${total} (${percentComplete}%)`);
    console.log(`   ${progressBar}\n`);

    if (pending > 0) {
      const estimatedMinPerScript = 5;
      const estimatedRemaining = pending * estimatedMinPerScript;
      console.log(`⏳ Estimated remaining: ~${estimatedRemaining} minutes\n`);
    }

    // Show top performers so far
    if (completed.length > 0) {
      console.log('🏆 Top Performers (so far):\n');
      const sorted = [...completed]
        .sort((a, b) => (parseFloat(b.pf) || 0) - (parseFloat(a.pf) || 0))
        .slice(0, 5);

      console.log('  | # | Strategy | Asset | PF | Win% | Sharpe | Trades |');
      console.log('  |---|----------|-------|-----|------|--------|--------|');

      sorted.forEach((s, idx) => {
        console.log(
          `  | ${idx + 1} | ${s.name.substring(0, 20).padEnd(20)} | ${s.asset.padEnd(6)} | ${(s.pf || '-').padEnd(4)} | ${(s.wr || '-').padEnd(5)} | ${(s.sharpe || '-').padEnd(6)} | ${s.trades || '-'} |`
        );
      });
      console.log();
    }

    // Show recently completed
    if (completed.length > 0) {
      console.log('✅ Recently Completed:\n');
      const recent = completed.slice(-5);
      recent.forEach(s => {
        const status = parseFloat(s.pf) > 1.5 ? '✅' : parseFloat(s.pf) > 1.0 ? '⚠️' : '❌';
        console.log(
          `   ${status} [${String(s.id).padStart(2)}] ${s.name} (${s.asset}) → PF: ${s.pf}`
        );
      });
      console.log();
    }

    // Show pending
    if (pending > 0 && pending <= 10) {
      console.log('⏳ Pending:\n');
      const pending_list = this.manifest.candidates.slice(completed.length, completed.length + 10);
      pending_list.forEach((c, idx) => {
        console.log(`   [ ] [${String(idx + completed.length + 1).padStart(2)}] ${c.name}`);
      });
      console.log();
    }

    // Status
    if (completed.length === total) {
      console.log('\n✅ ✅ ✅ ALL STAGE A BACKTESTS COMPLETE! ✅ ✅ ✅\n');
      console.log('Next step:');
      console.log('  node run-robustness-suite.js parse --stage A\n');
    } else {
      console.log('\n📌 Monitoring... (Ctrl+C to exit)\n');
    }
  }

  /**
   * Create progress bar
   */
  getProgressBar(percent) {
    const filled = Math.round(percent / 5);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `[${bar}] ${percent}%`;
  }

  /**
   * Start monitoring
   */
  start() {
    console.log('\n🔍 Initializing monitor...\n');

    if (!this.manifest) {
      console.error('❌ MANIFEST.json not found. Run stage-a first.\n');
      process.exit(1);
    }

    // Initial display
    this.display();

    // Update every 10 seconds
    this.interval = setInterval(() => {
      this.display();
    }, 10000);

    // Also on ENTER key
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('line', () => {
      this.display();
    });

    rl.on('close', () => {
      clearInterval(this.interval);
      process.exit(0);
    });
  }

  /**
   * Display and update manifest
   */
  display() {
    const completed = this.checkCompletion();
    this.completedCount = completed.length;
    this.displayDashboard(completed);

    // Save updated manifest
    fs.writeFileSync(manifestPath, JSON.stringify(this.manifest, null, 2), 'utf8');
  }
}

// Start monitor
const monitor = new StageAMonitor();
monitor.start();
