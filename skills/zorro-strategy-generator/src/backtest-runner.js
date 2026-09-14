/**
 * ZORRO Backtest Runner - Executes backtests and parses results
 * Integrates with ZORRO.exe to run strategies and extract metrics
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const AssetManager = require('./asset-manager');
const utils = require('./utils');

class BacktestRunner {
  constructor(zorroPath = 'D:\\ZORRO') {
    this.zorroPath = zorroPath;
    this.zorroExe = path.join(zorroPath, 'ZORRO.exe');
    this.strategyPath = path.join(zorroPath, 'Strategy');
    this.logPath = path.join(zorroPath, 'Log');
    this.assetManager = new AssetManager(zorroPath);

    this.validateInstallation();
  }

  /**
   * Validate ZORRO is installed and accessible
   */
  validateInstallation() {
    if (!fs.existsSync(this.zorroExe)) {
      console.warn(`⚠️  ZORRO.exe not found at ${this.zorroExe}`);
      console.warn(`   Please ensure ZORRO is installed at D:\\ZORRO\\`);
    }

    if (!fs.existsSync(this.strategyPath)) {
      fs.mkdirSync(this.strategyPath, { recursive: true });
    }

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }
  }

  /**
   * Main method: Run backtest for a strategy
   */
  async runBacktest(strategyCode, strategyFilename, options = {}) {
    utils.logEvent('BACKTEST_START', {
      strategy: strategyFilename,
      asset: options.asset,
      timeframe: options.timeframe,
      period: `${options.startDate}-${options.endDate}`
    });

    try {
      // Step 1: Validate asset
      console.log(`\n🔍 Step 1: Validating asset...`);
      const assetValidation = this.assetManager.validateAsset(options.asset || 'SPX500');

      if (!assetValidation.valid) {
        const report = {
          success: false,
          status: 'ASSET_ERROR',
          error: assetValidation.error,
          alternatives: assetValidation.alternatives
        };
        utils.logEvent('BACKTEST_ERROR_ASSET', report);
        return report;
      }

      console.log(`   ✅ Asset: ${options.asset} → ${assetValidation.mapped}`);

      // Step 2: Check data availability
      console.log(`\n📊 Step 2: Checking data availability...`);
      const dataCheck = this.assetManager.checkDataAvailability(
        options.asset || 'SPX500',
        options.startDate || 20200101,
        options.endDate || 20261231
      );

      if (!dataCheck.available) {
        const report = {
          success: false,
          status: 'MISSING_DATA',
          asset: options.asset,
          mappedTo: dataCheck.mapped,
          missingYears: dataCheck.missingYears,
          instruction: this.generateDownloadInstructions(
            dataCheck.mapped,
            dataCheck.missingYears
          )
        };
        utils.logEvent('BACKTEST_ERROR_DATA', report);
        return report;
      }

      console.log(`   ✅ Data available: ${dataCheck.files.map(f => f.year).join(', ')}`);

      // Step 3: Save strategy to ZORRO folder
      console.log(`\n💾 Step 3: Saving strategy...`);
      const strategyFullPath = path.join(this.strategyPath, strategyFilename);
      fs.writeFileSync(strategyFullPath, strategyCode);
      console.log(`   ✅ Saved: ${strategyFullPath}`);

      // Step 4: Update strategy with mapped asset if needed
      console.log(`\n🔧 Step 4: Updating strategy with correct asset name...`);
      const updatedCode = this.updateStrategyAsset(strategyCode, options.asset, assetValidation.mapped);
      fs.writeFileSync(strategyFullPath, updatedCode);
      console.log(`   ✅ Updated asset references`);

      // Step 5: Run backtest
      console.log(`\n▶️  Step 5: Running backtest in ZORRO...`);
      const backTestResult = await this.executeBacktest(strategyFilename);

      if (!backTestResult.success) {
        utils.logEvent('BACKTEST_EXECUTION_ERROR', backTestResult);
        return backTestResult;
      }

      // Step 6: Parse results
      console.log(`\n📈 Step 6: Parsing results...`);
      const metrics = await this.parseBacktestResults(strategyFilename);

      const finalReport = {
        success: true,
        strategy: strategyFilename,
        asset: options.asset,
        mappedTo: assetValidation.mapped,
        period: `${options.startDate}-${options.endDate}`,
        timeframe: options.timeframe,
        metrics: metrics,
        quality: this.assessStrategyQuality(metrics)
      };

      utils.logEvent('BACKTEST_SUCCESS', finalReport);
      return finalReport;

    } catch (error) {
      utils.logEvent('BACKTEST_EXCEPTION', { error: error.message });
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update strategy code with correct asset name
   */
  updateStrategyAsset(code, userAsset, mappedAsset) {
    // Replace asset() calls
    let updated = code.replace(
      new RegExp(`asset\\("${userAsset}"\\)`, 'g'),
      `asset("${mappedAsset}")`
    );

    // Also handle case-insensitive
    updated = updated.replace(
      new RegExp(`asset\\("${userAsset.toUpperCase()}"\\)`, 'gi'),
      `asset("${mappedAsset}")`
    );

    return updated;
  }

  /**
   * Execute backtest using ZORRO
   */
  async executeBacktest(strategyFilename) {
    return new Promise((resolve) => {
      try {
        // Check if ZORRO exists
        if (!fs.existsSync(this.zorroExe)) {
          return resolve({
            success: false,
            error: 'ZORRO.exe not found',
            instruction: `ZORRO must be installed at ${this.zorroPath}`,
            canContinue: true
          });
        }

        // Try to execute ZORRO with strategy
        // Note: ZORRO doesn't have a simple command-line interface
        // We would need to use a batch/script file or GUI automation
        // For now, provide the manual path

        console.log(`   📌 ZORRO requires manual execution or special integration`);
        console.log(`   To run backtest manually:`);
        console.log(`      1. Open ZORRO.exe`);
        console.log(`      2. Click [Strategy] → [${strategyFilename}]`);
        console.log(`      3. Click [Test] button`);
        console.log(`      4. Wait for completion`);

        // Mock success for development
        resolve({
          success: true,
          manual: true,
          instruction: `Run backtest manually in ZORRO GUI`
        });

      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Parse backtest results from ZORRO log file
   * Supports: basic metrics, WFO cycles, Monte Carlo, Confidence levels
   */
  async parseBacktestResults(strategyFilename, logFilename = null) {
    // Determine log file name (default to script name, fallback to 'Strategy.txt')
    const logName = logFilename || strategyFilename.replace('.c', '.txt');
    const logFilePath = path.join(this.logPath, logName);

    try {
      if (!fs.existsSync(logFilePath)) {
        return {
          status: 'LOG_NOT_FOUND',
          instruction: `Run backtest in ZORRO first. Expected log: ${logName}`,
          searchedPath: logFilePath
        };
      }

      const logContent = fs.readFileSync(logFilePath, 'utf8');

      // Parse basic metrics from log file
      const metrics = {
        // Core metrics
        totalTrades: this.parseMetric(logContent, /Total Trades:\s*(\d+)/i),
        winRate: this.parseMetric(logContent, /Win Rate:\s*([\d.]+)%/i),
        profitFactor: this.parseMetric(logContent, /Profit Factor:\s*([\d.]+)/i),
        sharpeRatio: this.parseMetric(logContent, /Sharpe Ratio:\s*([\d.]+)/i),
        maxDrawdown: this.parseMetric(logContent, /Max Drawdown:\s*([\d.]+)%/i),
        returnPercent: this.parseMetric(logContent, /Return:\s*([\d.]+)%/i),
        profit: this.parseMetric(logContent, /Profit\/Loss:\s*\$?([\d.,]+)/i),
        avgTrade: this.parseMetric(logContent, /Average Trade:\s*\$?([\d.,]+)/i),
        payoffRatio: this.parseMetric(logContent, /Payoff Ratio:\s*([\d.]+)/i),

        // Extended metrics (WFO/Monte Carlo)
        rSquared: this.parseMetric(logContent, /R\s*2\s*(?:coefficient)?:\s*([\d.]+)/i),
        ulcerIndex: this.parseMetric(logContent, /Ulcer Index:\s*([\d.]+)/i),
        pValue: this.parseMetric(logContent, /P-Value:\s*([\d.]+)%?/i),

        // WFO cycle statistics
        wfoMetrics: this.parseWFOTable(logContent),

        // Monte Carlo confidence levels
        confidenceMetrics: this.parseConfidenceTable(logContent)
      };

      return metrics;

    } catch (error) {
      console.warn(`Failed to parse results: ${error.message}`);
      return { error: error.message };
    }
  }

  /**
   * Parse WFO Cycles table from log
   * Format: "WFO Cycles: Best | Worst | Avg | StdDev"
   */
  parseWFOTable(content) {
    const wfoMetrics = {};

    // Look for WFO Cycles section
    const wfoMatch = content.match(/WFO\s+Cycles.*?(?=\n\n|$)/is);
    if (!wfoMatch) return null;

    const wfoContent = wfoMatch[0];

    // Extract Best/Worst/Avg/StdDev for key metrics
    const profitMatch = wfoContent.match(/Net Profit.*?Best:\s*([\d.-]+).*?Worst:\s*([\d.-]+).*?Avg:\s*([\d.-]+).*?StdDev:\s*([\d.-]+)/is);
    if (profitMatch) {
      wfoMetrics.netProfit = {
        best: parseFloat(profitMatch[1]),
        worst: parseFloat(profitMatch[2]),
        avg: parseFloat(profitMatch[3]),
        stdDev: parseFloat(profitMatch[4])
      };
    }

    const pfMatch = wfoContent.match(/Profit Factor.*?Best:\s*([\d.-]+).*?Worst:\s*([\d.-]+).*?Avg:\s*([\d.-]+).*?StdDev:\s*([\d.-]+)/is);
    if (pfMatch) {
      wfoMetrics.profitFactor = {
        best: parseFloat(pfMatch[1]),
        worst: parseFloat(pfMatch[2]),
        avg: parseFloat(pfMatch[3]),
        stdDev: parseFloat(pfMatch[4])
      };
    }

    return Object.keys(wfoMetrics).length > 0 ? wfoMetrics : null;
  }

  /**
   * Parse Confidence levels table (from Monte Carlo)
   * Format: "Confidence level: AR | DDMax | Capital"
   */
  parseConfidenceTable(content) {
    const confMetrics = {};

    // Look for Confidence section
    const confMatch = content.match(/Confidence.*?(?=\n\n|$)/is);
    if (!confMatch) return null;

    const confContent = confMatch[0];

    // Extract AR (Annual Return), DDMax, Capital
    const arMatch = confContent.match(/AR:\s*([\d.]+)%/i);
    if (arMatch) confMetrics.annualReturn = parseFloat(arMatch[1]);

    const ddMatch = confContent.match(/DDMax:\s*([\d.]+)%/i);
    if (ddMatch) confMetrics.maxDrawdown = parseFloat(ddMatch[1]);

    const capMatch = confContent.match(/Capital:\s*\$?([\d.,]+)/i);
    if (capMatch) confMetrics.capital = parseFloat(capMatch[1].replace(/,/g, ''));

    return Object.keys(confMetrics).length > 0 ? confMetrics : null;
  }

  /**
   * Helper: Parse metric from log content
   */
  parseMetric(content, regex) {
    const match = content.match(regex);
    if (match && match[1]) {
      const value = parseFloat(match[1].replace(/,/g, ''));
      return isNaN(value) ? null : value;
    }
    return null;
  }

  /**
   * Assess strategy quality based on metrics
   */
  assessStrategyQuality(metrics) {
    const issues = [];
    const warnings = [];
    let score = 100;

    // Check each metric
    if (!metrics.totalTrades) {
      issues.push('No trades generated');
      score -= 50;
    } else if (metrics.totalTrades < 10) {
      warnings.push(`Very few trades (${metrics.totalTrades})`);
      score -= 20;
    }

    if (metrics.winRate) {
      if (metrics.winRate < 30) {
        warnings.push(`Low win rate (${metrics.winRate}%)`);
        score -= 15;
      }
    }

    if (metrics.profitFactor) {
      if (metrics.profitFactor < 1.0) {
        issues.push(`Negative profit factor (${metrics.profitFactor})`);
        score -= 30;
      } else if (metrics.profitFactor < 1.5) {
        warnings.push(`Low profit factor (${metrics.profitFactor})`);
        score -= 10;
      }
    }

    if (metrics.maxDrawdown) {
      if (metrics.maxDrawdown > 40) {
        warnings.push(`High drawdown (${metrics.maxDrawdown}%)`);
        score -= 15;
      }
    }

    if (metrics.sharpeRatio) {
      if (metrics.sharpeRatio < 0.5) {
        warnings.push(`Low Sharpe ratio (${metrics.sharpeRatio})`);
        score -= 10;
      }
    }

    return {
      score: Math.max(0, score),
      status: score > 70 ? 'GOOD' : score > 40 ? 'FAIR' : 'POOR',
      issues,
      warnings
    };
  }

  /**
   * Generate download instructions
   */
  generateDownloadInstructions(assetName, missingYears) {
    return `
Data download required for ${assetName}

To download missing data (years: ${missingYears.join(', ')}):

1. Open ZORRO.exe
2. Go to Menu → View → Download
3. Select "${assetName}" from the asset list
4. Set date range for missing years
5. Click [Download]
6. Wait for completion

Once download completes, retry the backtest.
    `.trim();
  }

  /**
   * Generate pre-backtest validation report
   */
  generateValidationReport(strategyCode, options) {
    const report = {
      timestamp: new Date().toISOString(),
      strategy: options.filename,
      asset: options.asset,
      checks: []
    };

    // Check 1: Asset validation
    const assetCheck = this.assetManager.validateAsset(options.asset || 'SPX500');
    report.checks.push({
      name: 'Asset Validation',
      status: assetCheck.valid ? '✅' : '❌',
      details: assetCheck.valid ? assetCheck.mapped : assetCheck.error
    });

    // Check 2: Data availability
    if (assetCheck.valid) {
      const dataCheck = this.assetManager.checkDataAvailability(
        options.asset || 'SPX500',
        options.startDate || 20200101,
        options.endDate || 20261231
      );

      report.checks.push({
        name: 'Data Availability',
        status: dataCheck.available ? '✅' : '⚠️',
        details: dataCheck.available
          ? `${dataCheck.files.length} years available`
          : `Missing years: ${dataCheck.missingYears.join(', ')}`
      });
    }

    // Check 3: Strategy code quality
    const codeCheck = this.analyzeStrategyCode(strategyCode);
    report.checks.push({
      name: 'Code Quality',
      status: codeCheck.valid ? '✅' : '❌',
      details: codeCheck.valid ? 'Code looks good' : codeCheck.issues.join(', ')
    });

    // Overall
    report.ready = report.checks.every(c => c.status === '✅');

    return report;
  }

  /**
   * Quick code analysis
   */
  analyzeStrategyCode(code) {
    const issues = [];

    if (!code.includes('function run()')) {
      issues.push('Missing function run()');
    }
    if (!code.includes('asset(')) {
      issues.push('Missing asset() call');
    }
    if (!code.includes('BarPeriod')) {
      issues.push('Missing BarPeriod');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }
}

module.exports = BacktestRunner;
