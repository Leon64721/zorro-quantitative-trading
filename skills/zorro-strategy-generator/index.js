/**
 * ZORRO Strategy Generator Skill - Main Entry Point
 * Orchestrates all components to generate, validate, and optimize strategies
 */

const fs = require('fs');
const path = require('path');
const StrategyGenerator = require('./src/generator');
const StrategyValidator = require('./src/validator');
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
  }

  /**
   * Main method: Process user request and generate strategy
   */
  async execute(userInput) {
    console.log(`\n🤖 ZORRO Strategy Generator Skill`);
    console.log(`📝 Input: ${userInput}`);
    console.log(`${'='.repeat(50)}\n`);

    try {
      // Parse input
      const request = this.parseRequest(userInput);
      console.log(`📊 Parsed Request:`, request);

      // Generate strategy
      const generationResult = this.generator.generateStrategy(
        request.description,
        request.options
      );

      if (!generationResult.success) {
        throw new Error(generationResult.error);
      }

      console.log(`✅ Strategy Generated: ${generationResult.filename}`);

      // Validate strategy
      const validationResult = this.validator.validate(generationResult.code);
      const validationReport = this.validator.generateReport(validationResult);

      console.log(`\n📋 Validation Report:\n${validationReport}`);

      if (!validationResult.valid) {
        console.log(`\n⚠️  Strategy has validation issues. Fix before backtesting.`);
      } else {
        console.log(`\n✅ Strategy is 100% ZORRO compatible!`);
      }

      // Save strategy file
      const strategyPath = path.join(
        this.config.strategiesPath,
        generationResult.filename
      );

      fs.writeFileSync(strategyPath, generationResult.code);
      console.log(`💾 Saved to: ${strategyPath}`);

      // Save validation report
      const reportPath = path.join(
        this.config.outputPath,
        generationResult.filename.replace('.c', '_VALIDATION.md')
      );

      fs.writeFileSync(reportPath, validationReport);
      console.log(`📄 Report saved to: ${reportPath}`);

      // Return complete result
      return {
        success: true,
        filename: generationResult.filename,
        strategyPath,
        reportPath,
        code: generationResult.code,
        validation: validationResult,
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
