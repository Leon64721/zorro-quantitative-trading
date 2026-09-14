/**
 * ZORRO Strategy Generator - RAG-based strategy creation
 * Generates Lite-C code using knowledge graph and corpus
 */

const fs = require('fs');
const path = require('path');
const utils = require('./utils');

class StrategyGenerator {
  constructor(graphPath, corpusPath, templatesPath) {
    this.graph = utils.loadKnowledgeGraph(graphPath);
    this.corpusIndex = utils.loadCorpusIndex(corpusPath);
    this.corpusPath = corpusPath;
    this.templatesPath = templatesPath;
    this.indicators = this.extractIndicators();
  }

  /**
   * Extract all valid indicators from knowledge graph
   */
  extractIndicators() {
    const indicatorNodes = this.graph.nodes.filter(node => {
      const id = (node.id || '').toLowerCase();
      const label = (node.label || '').toLowerCase();
      return node.group === 'function' ||
             id.includes('indicator') ||
             ['sma', 'ema', 'rsi', 'atr', 'macd', 'bbands', 'stochastic'].some(ind => label.includes(ind));
    });

    return indicatorNodes.map(n => n.id);
  }

  /**
   * Main method: Generate strategy from description
   */
  generateStrategy(description, options = {}) {
    utils.logEvent('STRATEGY_GENERATION_START', { description, options });

    try {
      // Parse user description
      const strategySpec = this.parseDescription(description);
      utils.logEvent('SPECIFICATION_PARSED', strategySpec);

      // Select template based on indicators
      const template = this.selectTemplate(strategySpec.indicators);
      utils.logEvent('TEMPLATE_SELECTED', { template });

      // Generate code from template
      let code = this.fillTemplate(template, strategySpec, options);

      // Format and finalize
      code = utils.formatCode(code);

      const filename = utils.generateStrategyFilename(description);

      utils.logEvent('STRATEGY_GENERATION_SUCCESS', {
        filename,
        indicators: strategySpec.indicators,
        conditions: strategySpec.conditions.length
      });

      return {
        success: true,
        filename,
        code,
        specification: strategySpec,
        template: template
      };
    } catch (error) {
      utils.logEvent('STRATEGY_GENERATION_ERROR', { error: error.message });
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Parse user description into strategy specification
   */
  parseDescription(description) {
    // Extract key terms
    const terms = utils.extractTerms(description);

    // Find related concepts in graph
    const concepts = utils.findSimilarConcepts(this.graph, terms, 15);

    // Identify indicators mentioned
    const indicators = this.identifyIndicators(description);

    // Parse entry and exit conditions
    const conditions = this.parseConditions(description);

    // Determine asset (default ES if not specified)
    const asset = this.parseAsset(description) || 'ES';

    return {
      description,
      indicators,
      conditions,
      asset,
      concepts: concepts.map(c => c.id)
    };
  }

  /**
   * Identify which indicators are mentioned
   */
  identifyIndicators(description) {
    const lowerDesc = description.toLowerCase();
    const found = [];

    // Standard indicator patterns
    const patterns = {
      'sma': ['sma', 'simple moving average'],
      'ema': ['ema', 'exponential moving average'],
      'rsi': ['rsi', 'relative strength index'],
      'atr': ['atr', 'average true range'],
      'macd': ['macd'],
      'bbands': ['bollinger', 'bands', 'bband'],
      'stochastic': ['stochastic'],
      'cci': ['cci', 'commodity channel'],
      'roc': ['roc', 'rate of change'],
      'momentum': ['momentum']
    };

    for (const [indicator, keywords] of Object.entries(patterns)) {
      if (keywords.some(kw => lowerDesc.includes(kw))) {
        found.push(indicator.toUpperCase());
      }
    }

    return found.length > 0 ? found : ['SMA', 'ATR']; // Default indicators
  }

  /**
   * Parse entry and exit conditions
   */
  parseConditions(description) {
    const conditions = [];
    const lowerDesc = description.toLowerCase();

    // Entry patterns
    if (lowerDesc.includes('buy') || lowerDesc.includes('long') || lowerDesc.includes('enter')) {
      conditions.push({
        type: 'entry',
        direction: 'long',
        description: this.extractClause(description, ['when', 'if', 'buy', 'enter'])
      });
    }

    if (lowerDesc.includes('sell') || lowerDesc.includes('short') || lowerDesc.includes('exit')) {
      conditions.push({
        type: 'exit',
        direction: 'long',
        description: this.extractClause(description, ['when', 'if', 'sell', 'exit'])
      });
    }

    // If no explicit conditions, infer from indicators
    if (conditions.length === 0) {
      conditions.push({
        type: 'entry',
        direction: 'long',
        description: 'crossover of fast and slow indicators'
      });
      conditions.push({
        type: 'exit',
        direction: 'long',
        description: 'crossunder or overbought condition'
      });
    }

    return conditions;
  }

  /**
   * Extract clause from description
   */
  extractClause(description, keywords) {
    for (const keyword of keywords) {
      const idx = description.toLowerCase().indexOf(keyword);
      if (idx !== -1) {
        return description.substring(idx + keyword.length, idx + 100).trim();
      }
    }
    return description;
  }

  /**
   * Parse asset from description
   */
  parseAsset(description) {
    const assets = {
      'es': 'ES', 'sp500': 'ES', 's&p': 'ES',
      'nq': 'NQ', 'nasdaq': 'NQ',
      'gold': 'GC', 'gc': 'GC',
      'btc': 'BTC/USD',
      'eur': 'EUR/USD', 'eurusd': 'EUR/USD',
      'gbp': 'GBP/USD', 'gbpusd': 'GBP/USD'
    };

    const lower = description.toLowerCase();
    for (const [key, symbol] of Object.entries(assets)) {
      if (lower.includes(key)) {
        return symbol;
      }
    }

    return null;
  }

  /**
   * Select appropriate template based on indicators
   */
  selectTemplate(indicators) {
    // Determine which template to use based on indicators
    const templateMap = {
      'SMA': 'sma-crossover.c',
      'RSI': 'rsi-oversold.c',
      'ATR': 'atr-volatility.c',
      'MACD': 'macd-trend.c',
      'BBANDS': 'bbands-breakout.c'
    };

    // Select template: prefer more specific indicators
    let selectedTemplate = 'base-strategy.c'; // Default

    for (const indicator of indicators) {
      if (templateMap[indicator]) {
        selectedTemplate = templateMap[indicator];
        break; // Use first match
      }
    }

    const templatePath = path.join(this.templatesPath, selectedTemplate);
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, 'utf8');
    }

    // Fallback to base template
    return fs.readFileSync(path.join(this.templatesPath, 'base-strategy.c'), 'utf8');
  }

  /**
   * Fill template with strategy parameters
   */
  fillTemplate(template, strategySpec, options) {
    let code = template;

    // Replace placeholders
    const config = {
      '{{DESCRIPTION}}': strategySpec.description,
      '{{ASSET}}': strategySpec.asset,
      '{{BARPERIOD}}': options.timeframe || 5,
      '{{STARTDATE}}': options.startDate || '20200101',
      '{{ENDDATE}}': options.endDate || '20261231',
      '{{LOOKBACK}}': options.lookback || 100,
      '{{INDICATORS}}': this.generateIndicatorCode(strategySpec.indicators),
      '{{ENTRY_LOGIC}}': this.generateEntryLogic(strategySpec),
      '{{EXIT_LOGIC}}': this.generateExitLogic(strategySpec),
      '{{RISK_MANAGEMENT}}': this.generateRiskCode(options)
    };

    for (const [placeholder, value] of Object.entries(config)) {
      code = code.replace(new RegExp(placeholder, 'g'), value);
    }

    // Add timestamp
    const now = new Date().toISOString().split('T')[0];
    code = code.replace('{{DATE}}', now);

    return code;
  }

  /**
   * Generate indicator initialization code
   */
  generateIndicatorCode(indicators) {
    const code = [];

    indicators.forEach((ind, idx) => {
      const indUpper = ind.toUpperCase();

      switch (indUpper) {
        case 'SMA':
          code.push(`var sma_fast = SMA(Close, 10);   // Fast MA`);
          code.push(`var sma_slow = SMA(Close, 20);   // Slow MA`);
          break;
        case 'EMA':
          code.push(`var ema_fast = EMA(Close, 10);`);
          code.push(`var ema_slow = EMA(Close, 20);`);
          break;
        case 'RSI':
          code.push(`var rsi = RSI(Close, 14);        // RSI(14) for confirmation`);
          break;
        case 'ATR':
          code.push(`var atr = ATR(14);               // Volatility measure`);
          break;
        case 'MACD':
          code.push(`MACD(Close, 12, 26, 9);`);
          code.push(`var macd = rValue;`);
          code.push(`var signal = rSignal;`);
          break;
        case 'BBANDS':
          code.push(`BBands(Close, 20, 2, 2, MAType_SMA);`);
          code.push(`var upper = rRealUpperBand;`);
          code.push(`var lower = rRealLowerBand;`);
          break;
      }
    });

    return code.join('\n    ');
  }

  /**
   * Generate entry logic code
   */
  generateEntryLogic(strategySpec) {
    const lines = [];

    // Default SMA crossover logic
    if (strategySpec.indicators.includes('SMA')) {
      lines.push(`if(crossOver(sma_fast, sma_slow) && !NumOpenLong)`);
      lines.push(`{`);
      lines.push(`    enterLong();`);
      lines.push(`    printf("\\nLONG Entry at %.4f", price());`);
      lines.push(`}`);
    }
    // RSI logic
    else if (strategySpec.indicators.includes('RSI')) {
      lines.push(`if(rsi < 30 && !NumOpenLong)`);
      lines.push(`{`);
      lines.push(`    enterLong();`);
      lines.push(`    printf("\\nRSI Oversold Entry at %.4f", price());`);
      lines.push(`}`);
    }
    // Default fallback
    else {
      lines.push(`if(!NumOpenLong)`);
      lines.push(`{`);
      lines.push(`    // Add your entry logic here`);
      lines.push(`}`);
    }

    return lines.join('\n    ');
  }

  /**
   * Generate exit logic code
   */
  generateExitLogic(strategySpec) {
    const lines = [];

    // Default exit on opposite signal
    if (strategySpec.indicators.includes('SMA')) {
      lines.push(`if(NumOpenLong > 0 && crossUnder(sma_fast, sma_slow))`);
      lines.push(`{`);
      lines.push(`    exitLong();`);
      lines.push(`    printf("\\nExit: SMA crossunder");`);
      lines.push(`}`);
    }
    // RSI exit
    else if (strategySpec.indicators.includes('RSI')) {
      lines.push(`if(NumOpenLong > 0 && rsi > 70)`);
      lines.push(`{`);
      lines.push(`    exitLong();`);
      lines.push(`    printf("\\nExit: RSI Overbought");`);
      lines.push(`}`);
    }
    // Default
    else {
      lines.push(`if(NumOpenLong > 0)`);
      lines.push(`{`);
      lines.push(`    // Add your exit logic here`);
      lines.push(`}`);
    }

    return lines.join('\n    ');
  }

  /**
   * Generate risk management code
   */
  generateRiskCode(options) {
    const lines = [];

    const stopPips = options.stopLoss || '50';
    const profitPips = options.takeProfit || '100';
    const lots = options.lots || '1';

    lines.push(`Stop = ${stopPips} * PIP;          // Stop loss`);
    lines.push(`TakeProfit = ${profitPips} * PIP;  // Take profit`);
    lines.push(`Lots = ${lots};                      // Position size`);

    return lines.join('\n    ');
  }
}

module.exports = StrategyGenerator;
