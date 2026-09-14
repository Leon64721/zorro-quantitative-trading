/**
 * Strategy Analyzer - Pattern discovery and performance analysis
 * Identifies which indicator combinations, assets, and timeframes work best
 * Prepares data for Machine Learning phase
 */

const fs = require('fs');
const path = require('path');

class StrategyAnalyzer {
  constructor() {
    this.strategies = [];
    this.results = null;
    this.patterns = {};
  }

  /**
   * Load strategy metadata and results
   */
  load(metadataPath, resultsPath = null) {
    // Load metadata
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      this.strategies = metadata.strategies || [];
      console.log(`✅ Loaded ${this.strategies.length} strategies`);
    }

    // Load results if provided
    if (resultsPath && fs.existsSync(resultsPath)) {
      this.results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
      console.log(`✅ Loaded ${this.results.strategies?.length || 0} results`);
    }

    return this;
  }

  /**
   * Find top performing strategies
   */
  getTopStrategies(count = 10, metric = 'profitFactor') {
    if (!this.results || !this.results.strategies) {
      return [];
    }

    return this.results.strategies
      .filter(s => s[metric] !== undefined)
      .sort((a, b) => (b[metric] || 0) - (a[metric] || 0))
      .slice(0, count);
  }

  /**
   * Analyze indicator effectiveness
   */
  analyzeIndicatorEffectiveness(topCount = 50) {
    const topStrategies = this.getTopStrategies(topCount);
    const indicatorStats = {};

    topStrategies.forEach(strat => {
      const metadata = this.strategies.find(s => s.id === strat.id);
      if (!metadata) return;

      metadata.indicators?.forEach(ind => {
        if (!indicatorStats[ind.name]) {
          indicatorStats[ind.name] = {
            count: 0,
            totalPF: 0,
            totalWR: 0,
            appearances: []
          };
        }
        indicatorStats[ind.name].count++;
        indicatorStats[ind.name].totalPF += strat.profitFactor || 0;
        indicatorStats[ind.name].totalWR += strat.winRate || 0;
        indicatorStats[ind.name].appearances.push({
          strategyId: strat.id,
          pf: strat.profitFactor,
          wr: strat.winRate
        });
      });
    });

    // Calculate averages
    const analysis = {};
    Object.entries(indicatorStats).forEach(([name, stats]) => {
      analysis[name] = {
        appearances: stats.count,
        avgPF: (stats.totalPF / stats.count).toFixed(2),
        avgWR: (stats.totalWR / stats.count).toFixed(2),
        performance: this.ratePerformance(stats.totalPF / stats.count),
        topStrategies: stats.appearances
          .sort((a, b) => (b.pf || 0) - (a.pf || 0))
          .slice(0, 3)
      };
    });

    return analysis;
  }

  /**
   * Analyze asset performance
   */
  analyzeAssetPerformance(topCount = 50) {
    const topStrategies = this.getTopStrategies(topCount);
    const assetStats = {};

    topStrategies.forEach(strat => {
      const metadata = this.strategies.find(s => s.id === strat.id);
      if (!metadata || !metadata.asset) return;

      const asset = metadata.asset;
      if (!assetStats[asset]) {
        assetStats[asset] = {
          count: 0,
          totalPF: 0,
          totalWR: 0,
          strategies: []
        };
      }

      assetStats[asset].count++;
      assetStats[asset].totalPF += strat.profitFactor || 0;
      assetStats[asset].totalWR += strat.winRate || 0;
      assetStats[asset].strategies.push({
        id: strat.id,
        pf: strat.profitFactor,
        wr: strat.winRate
      });
    });

    // Calculate averages
    const analysis = {};
    Object.entries(assetStats).forEach(([asset, stats]) => {
      analysis[asset] = {
        appearances: stats.count,
        avgPF: (stats.totalPF / stats.count).toFixed(2),
        avgWR: (stats.totalWR / stats.count).toFixed(2),
        performance: this.ratePerformance(stats.totalPF / stats.count),
        topStrategy: stats.strategies
          .sort((a, b) => (b.pf || 0) - (a.pf || 0))
          .slice(0, 1)[0]
      };
    });

    return analysis;
  }

  /**
   * Analyze timeframe performance
   */
  analyzeTimeframePerformance(topCount = 50) {
    const topStrategies = this.getTopStrategies(topCount);
    const tfMap = { 5: 'M5', 15: 'M15', 60: 'H1', 240: 'H4' };
    const timeframeStats = {};

    topStrategies.forEach(strat => {
      const metadata = this.strategies.find(s => s.id === strat.id);
      if (!metadata || !metadata.timeframe) return;

      const tfName = tfMap[metadata.timeframe] || `M${metadata.timeframe}`;
      if (!timeframeStats[tfName]) {
        timeframeStats[tfName] = {
          count: 0,
          totalPF: 0,
          totalWR: 0,
          strategies: []
        };
      }

      timeframeStats[tfName].count++;
      timeframeStats[tfName].totalPF += strat.profitFactor || 0;
      timeframeStats[tfName].totalWR += strat.winRate || 0;
      timeframeStats[tfName].strategies.push({
        id: strat.id,
        pf: strat.profitFactor
      });
    });

    // Calculate averages
    const analysis = {};
    Object.entries(timeframeStats).forEach(([tf, stats]) => {
      analysis[tf] = {
        appearances: stats.count,
        avgPF: (stats.totalPF / stats.count).toFixed(2),
        avgWR: (stats.totalWR / stats.count).toFixed(2),
        performance: this.ratePerformance(stats.totalPF / stats.count)
      };
    });

    return analysis;
  }

  /**
   * Find indicator combinations that work well
   */
  analyzeIndicatorCombinations(topCount = 50) {
    const topStrategies = this.getTopStrategies(topCount);
    const combos = {};

    topStrategies.forEach(strat => {
      const metadata = this.strategies.find(s => s.id === strat.id);
      if (!metadata || !metadata.indicators) return;

      const comboName = metadata.indicators.map(i => i.name).sort().join('+');
      if (!combos[comboName]) {
        combos[comboName] = {
          count: 0,
          totalPF: 0,
          strategies: []
        };
      }

      combos[comboName].count++;
      combos[comboName].totalPF += strat.profitFactor || 0;
      combos[comboName].strategies.push({
        id: strat.id,
        pf: strat.profitFactor
      });
    });

    // Calculate and rank
    const ranked = Object.entries(combos)
      .map(([combo, stats]) => ({
        combination: combo,
        appearances: stats.count,
        avgPF: (stats.totalPF / stats.count).toFixed(2),
        topStrategy: stats.strategies
          .sort((a, b) => (b.pf || 0) - (a.pf || 0))
          .slice(0, 1)[0]
      }))
      .sort((a, b) => parseFloat(b.avgPF) - parseFloat(a.avgPF));

    return ranked.slice(0, 20); // Top 20 combinations
  }

  /**
   * Generate feature matrix for ML training
   */
  generateMLTrainingData() {
    if (!this.results) {
      return { error: 'Results not loaded' };
    }

    const trainingData = [];

    this.strategies.forEach(strategy => {
      const result = this.results.strategies?.find(r => r.id === strategy.id);
      if (!result) return;

      // Encode categorical features
      const indicatorEncoding = this.encodeIndicators(strategy.indicators);
      const assetEncoding = this.encodeAsset(strategy.asset);
      const tfEncoding = this.encodeTimeframe(strategy.timeframe);

      // Create feature vector
      const features = {
        id: strategy.id,
        // Indicator features
        ...indicatorEncoding,
        // Asset encoding
        ...assetEncoding,
        // Timeframe encoding
        ...tfEncoding,
        // Risk parameters
        stopLoss: this.parsePips(strategy.riskParams?.stopLoss),
        takeProfit: this.parsePips(strategy.riskParams?.takeProfit),
        // Target metrics
        profitFactor: result.profitFactor,
        winRate: result.winRate,
        sharpeRatio: result.sharpeRatio,
        maxDrawdown: result.maxDrawdown,
        returnPercent: result.returnPercent
      };

      trainingData.push(features);
    });

    return {
      count: trainingData.length,
      features: trainingData,
      featureNames: trainingData.length > 0 ? Object.keys(trainingData[0]) : []
    };
  }

  /**
   * Encode indicators as binary features
   */
  encodeIndicators(indicators) {
    const encoding = {
      has_SMA: 0,
      has_EMA: 0,
      has_WMA: 0,
      has_DEMA: 0,
      has_RSI: 0,
      has_MACD: 0,
      has_ROC: 0,
      has_Stochastic: 0,
      has_CCI: 0,
      has_ATR: 0,
      has_BBands: 0,
      has_ADX: 0,
      indicator_count: indicators?.length || 0
    };

    indicators?.forEach(ind => {
      const key = `has_${ind.name}`;
      if (key in encoding) {
        encoding[key] = 1;
      }
    });

    return encoding;
  }

  /**
   * Encode asset as one-hot vector
   */
  encodeAsset(asset) {
    const assets = ['SPX500', 'NAS100', 'US30', 'EUR/USD', 'GBP/USD', 'XAU/USD', 'UK100', 'GER30'];
    const encoding = {};

    assets.forEach(a => {
      encoding[`asset_${a}`] = asset === a ? 1 : 0;
    });

    return encoding;
  }

  /**
   * Encode timeframe
   */
  encodeTimeframe(tf) {
    const timeframes = { 5: 'M5', 15: 'M15', 60: 'H1', 240: 'H4' };
    const name = timeframes[tf] || `M${tf}`;

    return {
      timeframe_M5: tf === 5 ? 1 : 0,
      timeframe_M15: tf === 15 ? 1 : 0,
      timeframe_H1: tf === 60 ? 1 : 0,
      timeframe_H4: tf === 240 ? 1 : 0,
      tf_minutes: tf
    };
  }

  /**
   * Parse pips from string
   */
  parsePips(str) {
    if (typeof str === 'number') return str;
    if (typeof str === 'string') {
      const match = str.match(/(\d+)/);
      return match ? parseInt(match[1]) : 50;
    }
    return 50;
  }

  /**
   * Rate performance level
   */
  ratePerformance(pf) {
    if (pf >= 2.0) return '⭐⭐⭐⭐⭐';
    if (pf >= 1.8) return '⭐⭐⭐⭐';
    if (pf >= 1.6) return '⭐⭐⭐';
    if (pf >= 1.4) return '⭐⭐';
    return '⭐';
  }

  /**
   * Generate comprehensive analysis report
   */
  generateReport(outputPath) {
    const indicators = this.analyzeIndicatorEffectiveness();
    const assets = this.analyzeAssetPerformance();
    const timeframes = this.analyzeTimeframePerformance();
    const combos = this.analyzeIndicatorCombinations();

    let report = `# Strategy Analysis Report\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Strategies Analyzed**: ${this.strategies.length}\n\n`;

    report += `## 📊 Best Indicator Combinations\n\n`;
    combos.forEach((c, idx) => {
      report += `${idx + 1}. **${c.combination}** - Avg PF: ${c.avgPF} (${c.appearances} appearances)\n`;
    });

    report += `\n## 💰 Asset Performance\n\n`;
    Object.entries(assets)
      .sort((a, b) => parseFloat(b[1].avgPF) - parseFloat(a[1].avgPF))
      .forEach(([asset, stats]) => {
        report += `- **${asset}**: Avg PF ${stats.avgPF} ${stats.performance} (${stats.appearances} strats)\n`;
      });

    report += `\n## ⏰ Timeframe Performance\n\n`;
    Object.entries(timeframes)
      .sort((a, b) => parseFloat(b[1].avgPF) - parseFloat(a[1].avgPF))
      .forEach(([tf, stats]) => {
        report += `- **${tf}**: Avg PF ${stats.avgPF} ${stats.performance} (${stats.appearances} strats)\n`;
      });

    if (outputPath) {
      fs.writeFileSync(outputPath, report, 'utf8');
      console.log(`✅ Report saved: ${outputPath}`);
    }

    return report;
  }
}

module.exports = StrategyAnalyzer;
