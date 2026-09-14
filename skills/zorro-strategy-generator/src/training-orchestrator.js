/**
 * Training Orchestrator - Coordinates 500-strategy agent training
 * Manages: generation, backtesting, optimization, auditing, and reporting
 */

const fs = require('fs');
const path = require('path');
const StrategyRandomizer = require('./randomizer');
const StrategyGenerator = require('./generator');
const StrategyValidator = require('./validator');
const BacktestRunner = require('./backtest-runner');
const LearningTracker = require('./learning-tracker');
const AuditorAgent = require('./auditor-agent');
const utils = require('./utils');

class TrainingOrchestrator {
  constructor(config = {}) {
    this.config = {
      strategyCount: config.strategyCount || 500,
      outputDir: config.outputDir || './training-results',
      batchSize: config.batchSize || 10, // Process N at a time
      parallel: config.parallel !== false,
      generateReports: config.generateReports !== false
    };

    this.randomizer = new StrategyRandomizer();
    this.generator = config.generator || null;
    this.validator = new StrategyValidator();
    this.backtestRunner = config.backtestRunner || null;
    this.learningTracker = new LearningTracker(this.config.outputDir);
    this.auditorAgent = new AuditorAgent(this.config.outputDir);

    this.ensureOutputDirs();
    this.startTime = null;
  }

  ensureOutputDirs() {
    const dirs = [
      this.config.outputDir,
      path.join(this.config.outputDir, 'strategies'),
      path.join(this.config.outputDir, 'backtests'),
      path.join(this.config.outputDir, 'audit'),
      path.join(this.config.outputDir, 'report')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Run complete training pipeline
   */
  async runTraining() {
    this.startTime = new Date();
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🤖 ZORRO AGENT TRAINING STARTED`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📊 Config: ${this.config.strategyCount} strategies`);
    console.log(`📁 Output: ${this.config.outputDir}`);
    console.log(`🔄 Parallel: ${this.config.parallel}\n`);

    try {
      // Phase 1: Generation
      console.log(`\n${'─'.repeat(60)}`);
      console.log(`PHASE 1: STRATEGY GENERATION (${this.config.strategyCount} strategies)`);
      console.log(`${'─'.repeat(60)}\n`);
      const strategies = await this.generateStrategies();

      // Phase 2: Backtesting & Optimization
      console.log(`\n${'─'.repeat(60)}`);
      console.log(`PHASE 2: BACKTESTING & OPTIMIZATION`);
      console.log(`${'─'.repeat(60)}\n`);
      await this.backtestAndOptimize(strategies);

      // Phase 3: Analysis & Reporting
      console.log(`\n${'─'.repeat(60)}`);
      console.log(`PHASE 3: ANALYSIS & REPORTING`);
      console.log(`${'─'.repeat(60)}\n`);
      const report = await this.generateReports();

      // Final Summary
      this.printFinalSummary(report);

      return report;

    } catch (error) {
      console.error(`\n❌ Training failed: ${error.message}`);
      utils.logEvent('TRAINING_ERROR', { error: error.message });
      throw error;
    }
  }

  /**
   * Phase 1: Generate random strategies
   */
  async generateStrategies() {
    console.log(`🎲 Generating ${this.config.strategyCount} random strategies...\n`);

    const { strategies, summary } = this.randomizer.generateTrainingBatch(this.config.strategyCount);

    console.log(`✅ Generated ${strategies.length} strategies`);
    console.log(`   Assets: ${Object.entries(summary.assets).map(([k, v]) => `${k}(${v})`).join(', ')}`);
    console.log(`   Timeframes: ${Object.entries(summary.timeframes).map(([k, v]) => `${k}(${v})`).join(', ')}`);

    // Save strategy metadata
    const metadataPath = path.join(this.config.outputDir, 'strategies-metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify({ strategies, summary }, null, 2));

    return strategies;
  }

  /**
   * Phase 2: Backtest and optimize each strategy
   */
  async backtestAndOptimize(strategies) {
    const total = strategies.length;
    let processed = 0;

    for (let i = 0; i < total; i += this.config.batchSize) {
      const batch = strategies.slice(i, Math.min(i + this.config.batchSize, total));

      console.log(`\n📦 Batch ${Math.floor(i / this.config.batchSize) + 1}/${Math.ceil(total / this.config.batchSize)}`);
      console.log(`   Processing strategies ${i + 1}-${Math.min(i + this.config.batchSize, total)}...`);

      for (const strategy of batch) {
        processed++;
        const progress = ((processed / total) * 100).toFixed(1);

        try {
          await this.processStrategy(strategy);
          process.stdout.write(`\r   Progress: ${progress}% (${processed}/${total})`);
        } catch (error) {
          console.error(`\n   ❌ Strategy ${strategy.id} failed: ${error.message}`);
          utils.logEvent('STRATEGY_FAILED', { id: strategy.id, error: error.message });
        }
      }

      // Checkpoint after each batch
      if (processed % 100 === 0 || processed === total) {
        this.auditorAgent.createCheckpoint(processed);
      }
    }

    console.log(`\n\n✅ Backtesting complete! Processed ${processed} strategies`);
    this.auditorAgent.printStatus();
  }

  /**
   * Process single strategy: generate → validate → backtest
   */
  async processStrategy(strategy) {
    // Step 1: Generate code from strategy spec
    let code;
    if (this.generator) {
      const genResult = this.generator.generateStrategy(strategy.description, strategy);
      if (!genResult.success) {
        throw new Error(`Generation failed: ${genResult.error}`);
      }
      code = genResult.code;
    } else {
      // Mock: create simple strategy code
      code = this.createMockStrategyCode(strategy);
    }

    // Step 2: Validate
    const validation = this.validator.validate(code);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }

    // Step 3: Mock backtest (in real scenario, would call ZORRO)
    const metrics = this.createMockMetrics(strategy);

    // Step 4: Audit
    const auditResult = this.auditorAgent.auditStrategy(strategy.id, metrics, strategy);
    if (!auditResult.valid) {
      throw new Error(`Audit failed: ${auditResult.issues.join(', ')}`);
    }

    // Step 5: Track learning
    this.learningTracker.recordStrategy(strategy.id, metrics, strategy);

    return {
      success: true,
      strategyId: strategy.id,
      metrics,
      auditResult
    };
  }

  /**
   * Create mock strategy code for testing
   */
  createMockStrategyCode(strategy) {
    const indicators = strategy.indicators.map(i => `var ${i.name.toLowerCase()} = ${i.name}(${i.period});`).join('\n    ');

    return `
// Strategy ${strategy.id} - Auto-generated
function run()
{
    BarPeriod = ${strategy.timeframe};
    asset("${strategy.asset}");
    StartDate = 20200101;
    EndDate = 20261231;
    LookBack = 100;

    vars Close = series(priceClose());

    ${indicators}

    Stop = 50 * PIP;
    TakeProfit = 100 * PIP;
    Lots = 1;

    if(!NumOpenLong)
        enterLong();

    if(NumOpenLong > 0)
        exitLong();
}
    `;
  }

  /**
   * Create mock backtest metrics for testing
   */
  createMockMetrics(strategy) {
    // Simulate realistic metrics with some variation
    const baseWinRate = 35 + Math.random() * 30;
    const basePF = 0.8 + Math.random() * 2;

    return {
      totalTrades: Math.floor(50 + Math.random() * 200),
      winRate: parseFloat((baseWinRate + (strategy.id % 10) - 5).toFixed(2)),
      profitFactor: parseFloat((basePF + (strategy.id % 5) * 0.1).toFixed(2)),
      sharpeRatio: parseFloat(((Math.random() * 1.5) + (strategy.id % 3) * 0.2).toFixed(2)),
      maxDrawdown: parseFloat((Math.random() * 35 + 5).toFixed(2)),
      returnPercent: parseFloat(((Math.random() * 100) + (strategy.id % 10) * 5).toFixed(2)),
      avgTrade: parseFloat(((Math.random() * 200) - 50).toFixed(2))
    };
  }

  /**
   * Phase 3: Generate reports
   */
  async generateReports() {
    console.log(`\n📊 Generating comprehensive learning report...\n`);

    // Learning report
    const learningReport = this.learningTracker.generateLearningReport();
    const reportPath = path.join(this.config.outputDir, 'report', 'LEARNING_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(learningReport, null, 2));

    // Markdown report
    const markdownReport = this.generateMarkdownReport(learningReport);
    const mdPath = path.join(this.config.outputDir, 'report', 'TRAINING_REPORT.md');
    fs.writeFileSync(mdPath, markdownReport);

    // Audit report
    const auditReport = this.auditorAgent.generateAuditSummary();
    const auditPath = path.join(this.config.outputDir, 'report', 'AUDIT_REPORT.json');
    fs.writeFileSync(auditPath, JSON.stringify(auditReport, null, 2));

    console.log(`✅ Reports generated:`);
    console.log(`   📋 ${reportPath}`);
    console.log(`   📝 ${mdPath}`);
    console.log(`   🔍 ${auditPath}`);

    return {
      learning: learningReport,
      audit: auditReport,
      markdown: mdPath
    };
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport(learningReport) {
    const overview = learningReport.overview;
    const top10 = learningReport.top10;
    const insights = learningReport.insights;

    let md = `# 🤖 ZORRO Agent Training Report\n\n`;
    md += `**Generated**: ${new Date().toISOString()}\n\n`;

    md += `## Executive Summary\n\n`;
    md += `- **Total Strategies Trained**: ${learningReport.totalStrategies}\n`;
    md += `- **Excellent**: ${overview.excellentCount} | **Good**: ${overview.goodCount} | **Fair**: ${overview.fairCount} | **Poor**: ${overview.poorCount}\n\n`;

    md += `## Performance Metrics\n\n`;
    md += `| Metric | Value |\n`;
    md += `|--------|-------|\n`;
    md += `| Avg Win Rate | ${overview.avgWinRate}% |\n`;
    md += `| Avg Profit Factor | ${overview.avgProfitFactor} |\n`;
    md += `| Avg Sharpe Ratio | ${overview.avgSharpe} |\n`;
    md += `| Avg Drawdown | ${overview.avgDrawdown}% |\n\n`;

    md += `## Top 10 Strategies\n\n`;
    md += `| Rank | Strategy | Indicators | Asset | TF | Win% | PF | Sharpe |\n`;
    md += `|------|----------|------------|-------|----|----- |-----|--------|\n`;
    top10.forEach(s => {
      md += `| ${s.rank} | ${s.strategyId} | ${s.indicators} | ${s.asset} | ${s.timeframe} | ${s.winRate} | ${s.profitFactor} | ${s.sharpeRatio} |\n`;
    });

    md += `\n## Key Insights\n\n`;
    insights.forEach((insight, idx) => {
      md += `### ${idx + 1}. ${insight.title}\n`;
      md += `**Finding**: ${insight.finding}\n`;
      md += `**Recommendation**: ${insight.recommendation}\n\n`;
    });

    return md;
  }

  /**
   * Print final summary
   */
  printFinalSummary(report) {
    const duration = ((new Date() - this.startTime) / 1000 / 60).toFixed(1);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ TRAINING COMPLETE`);
    console.log(`${'='.repeat(60)}`);
    console.log(`⏱️  Duration: ${duration} minutes`);
    console.log(`📊 Strategies trained: ${report.learning.totalStrategies}`);
    console.log(`🏆 Best performer:`);
    console.log(`   Strategy: ${report.learning.top10[0].strategyId}`);
    console.log(`   Win Rate: ${report.learning.top10[0].winRate}%`);
    console.log(`   Profit Factor: ${report.learning.top10[0].profitFactor}`);
    console.log(`   Sharpe Ratio: ${report.learning.top10[0].sharpeRatio}`);
    console.log(`\n📈 Average performance:`);
    console.log(`   Win Rate: ${report.learning.overview.avgWinRate}%`);
    console.log(`   Profit Factor: ${report.learning.overview.avgProfitFactor}`);
    console.log(`   Sharpe Ratio: ${report.learning.overview.avgSharpe}`);
    console.log(`\n📁 Reports: ${this.config.outputDir}/report/`);
    console.log(`${'='.repeat(60)}\n`);
  }
}

module.exports = TrainingOrchestrator;
