/**
 * Strategy Randomizer - Generates random strategies with varied indicators
 * Creates 500 unique strategies for agent training
 */

const utils = require('./utils');

class StrategyRandomizer {
  constructor() {
    // Indicator pools
    this.trendIndicators = [
      { name: 'SMA', params: { period: [5, 10, 15, 20, 25, 30] } },
      { name: 'EMA', params: { period: [5, 10, 15, 20, 25, 30] } },
      { name: 'WMA', params: { period: [10, 20, 30] } },
      { name: 'DEMA', params: { period: [10, 20] } }
    ];

    this.momentumIndicators = [
      { name: 'RSI', params: { period: [14, 21, 28], threshold: [20, 30, 40, 50, 60, 70] } },
      { name: 'MACD', params: { fast: [12], slow: [26], signal: [9] } },
      { name: 'ROC', params: { period: [5, 10, 14] } },
      { name: 'Stochastic', params: { period: [14, 21] } },
      { name: 'CCI', params: { period: [20, 30] } }
    ];

    this.volatilityIndicators = [
      { name: 'ATR', params: { period: [14, 21] } },
      { name: 'BBands', params: { period: [20, 30], stdDev: [1.5, 2.0, 2.5] } },
      { name: 'ADX', params: { period: [14, 21] } }
    ];

    this.assets = ['SPX500', 'NAS100', 'US30', 'GER30', 'UK100', 'XAU/USD', 'EUR/USD', 'GBP/USD'];
    this.timeframes = [5, 15, 60, 240]; // M5, M15, H1, H4
  }

  /**
   * Generate N random strategies
   */
  generateStrategies(count = 500) {
    const strategies = [];

    for (let i = 1; i <= count; i++) {
      const strategy = this.generateRandomStrategy(i);
      strategies.push(strategy);
    }

    return strategies;
  }

  /**
   * Generate single random strategy
   */
  generateRandomStrategy(id) {
    const indicators = this.selectRandomIndicators();
    const asset = this.randomItem(this.assets);
    const timeframe = this.randomItem(this.timeframes);
    const entryLogic = this.generateEntryLogic(indicators);
    const exitLogic = this.generateExitLogic(indicators);

    return {
      id,
      name: `STRATEGY_RANDOM_${id}`,
      description: this.generateDescription(indicators, entryLogic, exitLogic),
      indicators,
      asset,
      timeframe,
      entry: entryLogic,
      exit: exitLogic,
      riskParams: this.generateRiskParams(),
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Select 1-4 random indicators for strategy
   */
  selectRandomIndicators() {
    const count = this.randomInt(1, 4); // 1-4 indicators
    const selected = [];
    const pools = [
      this.trendIndicators,
      this.momentumIndicators,
      this.volatilityIndicators
    ];

    for (let i = 0; i < count; i++) {
      const pool = this.randomItem(pools);
      const indicator = this.randomItem(pool);
      const params = this.randomizeParams(indicator.params);

      selected.push({
        name: indicator.name,
        period: params.period || params.fast,
        params: params
      });
    }

    return selected;
  }

  /**
   * Randomize indicator parameters within valid ranges
   */
  randomizeParams(paramDef) {
    const result = {};

    for (const [key, values] of Object.entries(paramDef)) {
      if (Array.isArray(values)) {
        result[key] = this.randomItem(values);
      }
    }

    return result;
  }

  /**
   * Generate random entry logic
   */
  generateEntryLogic(indicators) {
    const conditions = [];

    // Use first 1-2 indicators for entry
    const count = Math.min(2, indicators.length);

    for (let i = 0; i < count; i++) {
      const ind = indicators[i];
      const condition = this.generateCondition(ind);
      conditions.push(condition);
    }

    return {
      type: 'LONG',
      conditions: conditions,
      logic: conditions.join(' && ')
    };
  }

  /**
   * Generate random exit logic
   */
  generateExitLogic(indicators) {
    const exitType = this.randomInt(1, 3);

    switch (exitType) {
      case 1:
        // Exit on opposite signal
        return {
          type: 'OPPOSITE_SIGNAL',
          description: 'Exit when entry condition reverses'
        };
      case 2:
        // Exit on overbought/oversold
        return {
          type: 'EXTREMES',
          description: 'Exit when indicator reaches extremes'
        };
      case 3:
        // Exit on time
        return {
          type: 'TIME_BASED',
          bars: this.randomInt(100, 500),
          description: `Exit after ${this.randomInt(100, 500)} bars`
        };
      default:
        return { type: 'DEFAULT' };
    }
  }

  /**
   * Generate condition for indicator
   */
  generateCondition(indicator) {
    const operators = ['crossover', 'crossunder', 'above', 'below', 'above_threshold'];
    const operator = this.randomItem(operators);

    return {
      indicator: indicator.name,
      operator: operator,
      value: this.randomInt(20, 80)
    };
  }

  /**
   * Generate risk management parameters
   */
  generateRiskParams() {
    return {
      stopLoss: this.randomItem([30, 50, 75, 100]) + ' pips',
      takeProfit: this.randomItem([50, 100, 150, 200]) + ' pips',
      riskReward: this.randomItem([1.5, 2.0, 2.5, 3.0]),
      maxLots: this.randomItem([1, 2, 3, 5])
    };
  }

  /**
   * Generate human-readable description
   */
  generateDescription(indicators, entry, exit) {
    const indNames = indicators.map(i => i.name).join(' + ');
    return `Strategy using ${indNames}: ${entry.logic}. Exit: ${exit.type}`;
  }

  /**
   * Random integer in range
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Random item from array
   */
  randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Generate batch of strategies for training
   */
  generateTrainingBatch(count = 500) {
    console.log(`\n🎲 Generating ${count} random strategies...`);

    const strategies = this.generateStrategies(count);

    const summary = {
      total: strategies.length,
      indicators: this.countIndicatorUsage(strategies),
      assets: this.countAssets(strategies),
      timeframes: this.countTimeframes(strategies)
    };

    console.log(`✅ Generated ${strategies.length} strategies`);
    console.log(`   Assets: ${Object.keys(summary.assets).join(', ')}`);
    console.log(`   Timeframes: ${Object.keys(summary.timeframes).join(', ')}`);

    return { strategies, summary };
  }

  /**
   * Count indicator usage
   */
  countIndicatorUsage(strategies) {
    const counts = {};

    strategies.forEach(s => {
      s.indicators.forEach(ind => {
        counts[ind.name] = (counts[ind.name] || 0) + 1;
      });
    });

    return counts;
  }

  /**
   * Count assets used
   */
  countAssets(strategies) {
    const counts = {};

    strategies.forEach(s => {
      counts[s.asset] = (counts[s.asset] || 0) + 1;
    });

    return counts;
  }

  /**
   * Count timeframes used
   */
  countTimeframes(strategies) {
    const counts = {};

    strategies.forEach(s => {
      const tf = s.timeframe;
      const label = tf === 5 ? 'M5' : tf === 15 ? 'M15' : tf === 60 ? 'H1' : 'H4';
      counts[label] = (counts[label] || 0) + 1;
    });

    return counts;
  }
}

module.exports = StrategyRandomizer;
