/**
 * ZORRO Strategy Generator Skill - Main Entry Point
 * Orchestrates all components to generate, validate, and optimize strategies
 */

const fs = require('fs');
const path = require('path');
const StrategyGenerator = require('./src/generator');
const StrategyValidator = require('./src/validator');
const BacktestRunner = require('./src/backtest-runner');
const AssetManager = require('./src/asset-manager');
const utils = require('./src/utils');

class ZORROStrategySkill {
  constructor() {
    const skillDir = __dirname;
    const projectRoot = path.join(skillDir, '..', '..');

    this.config = {
      graphPath: path.join(projectRoot, 'docs/zorro-manual/corpus/graphify-out/graph.json'),
      corpusPath: path.join(projectRoot, 'docs/zorro-manual/corpus/en'),
      templatesPath: path.join(skillDir, 'templates'),
      outputPath: path.join(projectRoot, 'backtest_results'),
      strategiesPath: path.join(projectRoot, 'generated_strategies')
    };

    // Ensure output directories exist
    [this.config.outputPath, this.config.strategiesPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    this.generator = new StrategyGenerator(
      this.config.graphPath,
      this.config.corpusPath,
      this.config.templatesPath
    );

    this.validator = new StrategyValidator();
    this.backtestRunner = new BacktestRunner();
    this.assetManager = new AssetManager();
  }

  /**
   * Main method: Process user request - Generate, Validate, Backtest
   */
  async execute(userInput) {
    console.log(`\n🤖 ZORRO Strategy Generator Skill`);
    console.log(`📝 Input: ${userInput}`);
    console.log(`${'='.repeat(50)}\n`);

    try {
      // Parse input
      const request = this.parseRequest(userInput);
      console.log(`📊 Parsed Request:`, request);

      // ===== PHASE 1: GENERATE =====
      console.log(`\n${'='.repeat(50)}`);
      console.log(`PHASE 1: STRATEGY GENERATION`);
      console.log(`${'='.repeat(50)}`);

      const generationResult = this.generator.generateStrategy(
        request.description,
        request.options
      );

      if (!generationResult.success) {
        throw new Error(generationResult.error);
      }

      console.log(`✅ Strategy Generated: ${generationResult.filename}`);

      // ===== PHASE 2: VALIDATE =====
      console.log(`\n${'='.repeat(50)}`);
      console.log(`PHASE 2: VALIDATION`);
      console.log(`${'='.repeat(50)}`);

      const validationResult = this.validator.validate(generationResult.code);
      const validationReport = this.validator.generateReport(validationResult);

      console.log(`\n📋 Validation Report:\n${validationReport}`);

      if (!validationResult.valid) {
        console.log(`\n⚠️  Strategy has validation issues. Fix before backtesting.`);
        return {
          success: false,
          phase: 'validation',
          error: 'Strategy validation failed',
          validation: validationResult
        };
      }

      console.log(`\n✅ Strategy is 100% ZORRO compatible!`);

      // Save files
      const strategyPath = path.join(
        this.config.strategiesPath,
        generationResult.filename
      );

      fs.writeFileSync(strategyPath, generationResult.code);
      console.log(`💾 Saved to: ${strategyPath}`);

      const reportPath = path.join(
        this.config.outputPath,
        generationResult.filename.replace('.c', '_VALIDATION.md')
      );

      fs.writeFileSync(reportPath, validationReport);

      // ===== PHASE 3: BACKTEST PREP =====
      console.log(`\n${'='.repeat(50)}`);
      console.log(`PHASE 3: BACKTEST PREPARATION`);
      console.log(`${'='.repeat(50)}`);

      // Pre-backtest validation
      const preBacktestReport = this.backtestRunner.generateValidationReport(
        generationResult.code,
        {
          filename: generationResult.filename,
          asset: request.options.asset || 'SPX500',
          startDate: request.options.startDate || 20200101,
          endDate: request.options.endDate || 20261231
        }
      );

      console.log(`\n📋 Pre-Backtest Checks:`);
      preBacktestReport.checks.forEach(check => {
        console.log(`   ${check.status} ${check.name}: ${check.details}`);
      });

      if (!preBacktestReport.ready) {
        console.log(`\n⚠️  Cannot run backtest - issues found:`);
        preBacktestReport.checks.forEach(check => {
          if (check.status !== '✅') {
            console.log(`   - ${check.details}`);
          }
        });

        return {
          success: false,
          phase: 'backtest_prep',
          error: 'Pre-backtest validation failed',
          preBacktestReport,
          filename: generationResult.filename,
          strategyPath
        };
      }

      console.log(`\n✅ All checks passed - Ready for backtesting!`);

      // ===== PHASE 4: BACKTEST =====
      console.log(`\n${'='.repeat(50)}`);
      console.log(`PHASE 4: BACKTEST EXECUTION`);
      console.log(`${'='.repeat(50)}`);

      const backTestResult = await this.backtestRunner.runBacktest(
        generationResult.code,
        generationResult.filename,
        request.options
      );

      // Return complete result
      return {
        success: backTestResult.success,
        phase: 'complete',
        filename: generationResult.filename,
        strategyPath,
        reportPath,
        validation: validationResult,
        preBacktest: preBacktestReport,
        backtest: backTestResult,
        specification: generationResult.specification
      };

    } catch (error) {
      console.error(`\n❌ Error: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Parse user input into structured request
   */
  parseRequest(input) {
    // Default options
    const request = {
      description: '',
      options: {
        timeframe: 5,
        startDate: '20200101',
        endDate: '20261231',
        lookback: 100,
        stopLoss: '50',
        takeProfit: '100',
        lots: '1',
        optimize: false
      }
    };

    // Simple parser - looks for keywords
    const lines = input.split('\n').map(l => l.trim());

    lines.forEach(line => {
      if (line.startsWith('description:')) {
        request.description = line.replace('description:', '').trim();
      } else if (line.startsWith('assets:')) {
        request.options.asset = line.replace('assets:', '').trim().split(',')[0].trim();
      } else if (line.startsWith('timeframe:')) {
        request.options.timeframe = parseInt(line.replace('timeframe:', '').trim());
      } else if (line.startsWith('period:')) {
        const period = line.replace('period:', '').trim();
        const [start, end] = period.split('-').map(p => p.trim());
        if (start) request.options.startDate = start.replace('-', '');
        if (end) request.options.endDate = end.replace('-', '');
      } else if (line.startsWith('optimize:')) {
        request.options.optimize = line.includes('true');
      } else if (line.startsWith('stop:')) {
        request.options.stopLoss = line.replace('stop:', '').trim();
      } else if (line.startsWith('tp:')) {
        request.options.takeProfit = line.replace('tp:', '').trim();
      } else if (line.length > 0 && !line.includes(':')) {
        // Treat as part of description
        request.description += ' ' + line;
      }
    });

    request.description = request.description.trim();

    return request;
  }

  /**
   * List available templates
   */
  listTemplates() {
    const templates = fs.readdirSync(this.config.templatesPath)
      .filter(f => f.endsWith('.c'));

    console.log(`\n📚 Available Strategy Templates:`);
    templates.forEach((t, idx) => {
      console.log(`  ${idx + 1}. ${t}`);
    });

    return templates;
  }

  /**
   * Get skill info
   */
  getInfo() {
    return {
      name: 'ZORRO Strategy Generator',
      version: '1.0.0',
      description: 'Generate, validate, and optimize trading strategies for ZORRO',
      components: {
        generator: 'RAG-based code generation',
        validator: 'ZORRO compatibility validation',
        backtest: 'Integration with ZORRO backtester',
        optimizer: 'Parameter optimization (planned)'
      },
      status: 'Beta - Core features working'
    };
  }
}

// Export for use as skill
module.exports = ZORROStrategySkill;

// CLI usage (if run directly)
if (require.main === module) {
  const skill = new ZORROStrategySkill();

  // Example usage
  const exampleInput = `
description: SMA crossover with RSI confirmation and ATR-based position sizing
assets: ES
timeframe: 5
period: 2020-01-01 - 2026-12-31
optimize: false
stop: 50
tp: 100
  `.trim();

  skill.execute(exampleInput).then(result => {
    if (result.success) {
      console.log(`\n🎉 Strategy ready for backtesting!`);
    }
  });
}
