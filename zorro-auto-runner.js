#!/usr/bin/env node

/**
 * ZORRO Auto Runner - Automated script loading and execution guide
 * Opens ZORRO, loads scripts in sequence, guides user through execution
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const readline = require('readline');

class ZorroAutoRunner {
  constructor() {
    this.zorroPath = 'D:\\ZORRO';
    this.zorroExe = path.join(this.zorroPath, 'ZORRO.exe');
    this.strategyPath = path.join(this.zorroPath, 'Strategy');
    this.logPath = path.join(this.zorroPath, 'Log');
    this.manifestPath = path.join(process.cwd(), 'training-results/robustness/MANIFEST.json');

    this.currentScriptIndex = 0;
    this.scripts = [];
    this.completedScripts = [];
  }

  /**
   * Load list of scripts to execute
   */
  loadScriptList() {
    const manifest = JSON.parse(fs.readFileSync(this.manifestPath, 'utf8'));
    this.scripts = manifest.candidates.map(c => ({
      id: c.id,
      name: c.name,
      file: c.baselineFile,
      asset: c.asset,
      timeframe: c.timeframe,
      indicators: c.indicators.join('+'),
      status: 'pending'
    }));

    return this.scripts;
  }

  /**
   * Check if ZORRO is installed
   */
  checkZorroInstallation() {
    console.log('\n🔍 Checking ZORRO installation...\n');

    if (!fs.existsSync(this.zorroExe)) {
      console.error(`❌ ZORRO.exe not found at: ${this.zorroExe}`);
      console.error('   Please install ZORRO at D:\\ZORRO\\\n');
      return false;
    }

    if (!fs.existsSync(this.strategyPath)) {
      console.error(`❌ Strategy folder not found: ${this.strategyPath}`);
      return false;
    }

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
      console.log(`✅ Created Log folder: ${this.logPath}`);
    }

    console.log(`✅ ZORRO found at: ${this.zorroExe}`);
    console.log(`✅ Strategy folder: ${this.strategyPath}`);
    console.log(`✅ Log folder: ${this.logPath}\n`);

    return true;
  }

  /**
   * Open ZORRO
   */
  openZorro() {
    console.log('🚀 Opening ZORRO...\n');

    try {
      spawn(this.zorroExe, [], {
        detached: true,
        stdio: 'ignore'
      });

      console.log('⏳ Waiting for ZORRO to fully load (30 seconds)...\n');
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 30000); // Wait 30 seconds for ZORRO to load
      });
    } catch (err) {
      console.error(`❌ Failed to open ZORRO: ${err.message}`);
      return false;
    }
  }

  /**
   * Show current script info and instructions
   */
  displayScriptInfo(scriptIndex) {
    if (scriptIndex >= this.scripts.length) {
      this.displayCompletion();
      return;
    }

    const script = this.scripts[scriptIndex];
    const progress = ((scriptIndex / this.scripts.length) * 100).toFixed(0);

    console.clear();

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║          🔬 ZORRO Stage A - Auto Runner                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log(`📊 Progress: ${scriptIndex + 1}/${this.scripts.length} (${progress}%)`);
    console.log(`   ${'█'.repeat(Math.floor(progress/5))}${'░'.repeat(20-Math.floor(progress/5))}\n`);

    console.log('📋 NEXT SCRIPT:\n');
    console.log(`   ID:          ${script.id}`);
    console.log(`   Name:        ${script.name}`);
    console.log(`   File:        ${script.file}`);
    console.log(`   Asset:       ${script.asset}`);
    console.log(`   Timeframe:   ${script.timeframe}`);
    console.log(`   Indicators:  ${script.indicators}\n`);

    console.log('📌 INSTRUCTIONS:\n');
    console.log(`   1. In ZORRO menu: Strategy → Open File`);
    console.log(`   2. Navigate to: D:\\ZORRO\\Strategy\\`);
    console.log(`   3. Find file: ${script.file}`);
    console.log(`   4. Click [Open] or double-click file\n`);
    console.log(`   5. Click [Test] button in ZORRO`);
    console.log(`   6. Wait for completion (2-5 minutes)`);
    console.log(`   7. Come back here when done\n`);

    console.log('⚠️  IMPORTANT:\n');
    console.log(`   • Check for compilation errors in ZORRO`);
    console.log(`   • Log file auto-saves to: D:\\ZORRO\\Log\\${script.file.replace('.c', '.txt')}`);
    console.log(`   • If error → Note it, click [OK], and tell me\n`);
  }

  /**
   * Wait for user to complete current script
   */
  async waitForCompletion(scriptIndex) {
    const script = this.scripts[scriptIndex];
    const logFile = path.join(this.logPath, script.file.replace('.c', '.txt'));

    console.log(`\n⏳ Waiting for script to complete...\n`);
    console.log(`   Checking for log file: ${path.basename(logFile)}\n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (fs.existsSync(logFile)) {
          const stats = fs.statSync(logFile);
          const now = Date.now();
          const modTime = stats.mtimeMs;

          // Log file was recently modified (within last 30 seconds = test just completed)
          if (now - modTime < 30000) {
            clearInterval(checkInterval);

            console.log(`\n✅ Log file detected: ${path.basename(logFile)}`);

            // Parse metrics
            const metrics = this.parseMetrics(logFile);
            console.log(`\n📊 Quick Results:`);
            console.log(`   Profit Factor: ${metrics.profitFactor || '—'}`);
            console.log(`   Win Rate: ${metrics.winRate || '—'}%`);
            console.log(`   Sharpe Ratio: ${metrics.sharpeRatio || '—'}`);
            console.log(`   Trades: ${metrics.totalTrades || '—'}\n`);

            this.scripts[scriptIndex].status = 'complete';
            this.scripts[scriptIndex].metrics = metrics;

            resolve(true);
          }
        }
      }, 2000); // Check every 2 seconds

      console.log(`   Press ENTER when ZORRO test is complete and you're back here...`);

      rl.question('', () => {
        clearInterval(checkInterval);

        // Check if log was created
        if (fs.existsSync(logFile)) {
          const metrics = this.parseMetrics(logFile);
          this.scripts[scriptIndex].status = 'complete';
          this.scripts[scriptIndex].metrics = metrics;

          console.log(`\n✅ Script marked as complete!`);
          console.log(`📊 Metrics extracted\n`);
        } else {
          console.log(`\n⚠️  No log file found. You may need to check ZORRO manually.`);
        }

        rl.close();
        resolve(true);
      });
    });
  }

  /**
   * Parse metrics from log file
   */
  parseMetrics(logFile) {
    const metrics = {
      profitFactor: null,
      winRate: null,
      sharpeRatio: null,
      totalTrades: null
    };

    try {
      const content = fs.readFileSync(logFile, 'utf8');

      const pfMatch = content.match(/Profit Factor:\s*([\d.]+)/i);
      if (pfMatch) metrics.profitFactor = parseFloat(pfMatch[1]).toFixed(2);

      const wrMatch = content.match(/Win Rate:\s*([\d.]+)%/i);
      if (wrMatch) metrics.winRate = parseFloat(wrMatch[1]).toFixed(1);

      const sharpeMatch = content.match(/Sharpe Ratio:\s*([\d.]+)/i);
      if (sharpeMatch) metrics.sharpeRatio = parseFloat(sharpeMatch[1]).toFixed(2);

      const tradesMatch = content.match(/Total Trades:\s*(\d+)/i);
      if (tradesMatch) metrics.totalTrades = parseInt(tradesMatch[1]);
    } catch (err) {
      // Ignore parse errors
    }

    return metrics;
  }

  /**
   * Show completion summary
   */
  displayCompletion() {
    console.clear();

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║         ✅ STAGE A COMPLETE!                              ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Summary:\n');
    console.log(`   Total Scripts: ${this.scripts.length}`);
    console.log(`   Completed: ${this.scripts.filter(s => s.status === 'complete').length}`);
    console.log(`   Pending: ${this.scripts.filter(s => s.status === 'pending').length}\n`);

    // Show top performers
    const completed = this.scripts.filter(s => s.metrics);
    if (completed.length > 0) {
      console.log('🏆 Top Performers:\n');

      const sorted = [...completed]
        .sort((a, b) => (parseFloat(b.metrics.profitFactor) || 0) - (parseFloat(a.metrics.profitFactor) || 0))
        .slice(0, 5);

      sorted.forEach((s, idx) => {
        console.log(`   ${idx + 1}. ${s.name.substring(0, 30).padEnd(30)} PF: ${s.metrics.profitFactor || '—'}`);
      });
      console.log();
    }

    console.log('📋 Next Step:\n');
    console.log(`   Run: node run-robustness-suite.js parse --stage A\n`);
    console.log('   This will:');
    console.log(`   • Extract all metrics from logs`);
    console.log(`   • Select top 8 finalists`);
    console.log(`   • Prepare for Stage B\n`);
  }

  /**
   * Main execution loop
   */
  async run() {
    console.clear();
    console.log('\n🚀 ZORRO Auto Runner - Stage A\n');

    // Check ZORRO
    if (!this.checkZorroInstallation()) {
      process.exit(1);
    }

    // Load scripts
    this.loadScriptList();
    console.log(`✅ Loaded ${this.scripts.length} scripts from manifest\n`);

    // Open ZORRO
    const opened = await this.openZorro();
    if (!opened) {
      process.exit(1);
    }

    console.log('✅ ZORRO should now be opening...\n');
    console.log('Proceeding to script execution...\n');

    // Execute scripts one by one
    let scriptIndex = 0;

    while (scriptIndex < this.scripts.length) {
      this.displayScriptInfo(scriptIndex);

      // Wait for user to complete script in ZORRO
      await this.waitForCompletion(scriptIndex);

      scriptIndex++;

      if (scriptIndex < this.scripts.length) {
        console.log('\n⏳ Loading next script in 3 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    // Show completion
    this.displayCompletion();

    // Save manifest
    const manifest = JSON.parse(fs.readFileSync(this.manifestPath, 'utf8'));
    this.scripts.forEach(script => {
      const candidate = manifest.candidates.find(c => c.baselineFile === script.file);
      if (candidate && script.metrics) {
        candidate.metrics = script.metrics;
        candidate.status = 'complete';
      }
    });
    fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

    console.log('✅ Manifest updated with completed scripts\n');
    console.log('🎉 Ready for: node run-robustness-suite.js parse --stage A\n');
  }
}

// Run
const runner = new ZorroAutoRunner();
runner.run().catch(err => {
  console.error(`❌ Error: ${err.message}`);
  process.exit(1);
});
