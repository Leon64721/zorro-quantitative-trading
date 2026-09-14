/**
 * Learning Tracker - Tracks agent learning progression across 500 strategies
 * Records metrics evolution and identifies patterns
 */

const fs = require('fs');
const path = require('path');

class LearningTracker {
  constructor(outputDir = './training-results') {
    this.outputDir = outputDir;
    this.learningLog = path.join(outputDir, 'learning-log.json');
    this.metricsHistory = [];
    this.topStrategies = [];
    this.generationMetrics = {};

    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Record strategy backtest result
   */
  recordStrategy(strategyId, metrics, strategyData) {
    const record = {
      strategyId,
      timestamp: new Date().toISOString(),
      metrics: {
        totalTrades: metrics.totalTrades || 0,
        winRate: metrics.winRate || 0,
        profitFactor: metrics.profitFactor || 1.0,
        sharpeRatio: metrics.sharpeRatio || 0,
        maxDrawdown: metrics.maxDrawdown || 0,
        returnPercent: metrics.returnPercent || 0,
        avgTrade: metrics.avgTrade || 0
      },
      strategy: {
        indicators: strategyData.indicators,
        asset: strategyData.asset,
        timeframe: strategyData.timeframe
      },
      quality: this.assessQuality(metrics)
    };

    this.metricsHistory.push(record);

    // Update top strategies
    this.updateTopStrategies(record);

    return record;
  }

  /**
   * Assess strategy quality
   */
  assessQuality(metrics) {
    let score = 0;
    const issues = [];
    const strengths = [];

    // Win rate (0-40 points)
    if (metrics.winRate >= 50) {
      score += 40;
      strengths.push('Good win rate');
    } else if (metrics.winRate >= 40) {
      score += 30;
    } else if (metrics.winRate >= 30) {
      score += 20;
    } else {
      issues.push('Low win rate');
    }

    // Profit factor (0-40 points)
    if (metrics.profitFactor >= 2.0) {
      score += 40;
      strengths.push('Excellent profit factor');
    } else if (metrics.profitFactor >= 1.5) {
      score += 30;
      strengths.push('Good profit factor');
    } else if (metrics.profitFactor >= 1.0) {
      score += 15;
    } else {
      issues.push('Negative profit factor');
      score = Math.max(0, score - 20);
    }

    // Sharpe ratio (0-20 points)
    if (metrics.sharpeRatio >= 0.8) {
      score += 20;
      strengths.push('Excellent risk-adjusted returns');
    } else if (metrics.sharpeRatio >= 0.5) {
      score += 10;
    }

    // Drawdown (0-10 points penalty)
    if (metrics.maxDrawdown > 40) {
      score -= 10;
      issues.push('High drawdown');
    } else if (metrics.maxDrawdown > 25) {
      score -= 5;
    }

    // Trade count bonus
    if (metrics.totalTrades > 100) {
      score += 5;
      strengths.push('High activity');
    } else if (metrics.totalTrades < 10) {
      score -= 15;
      issues.push('Too few trades');
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      rating: score >= 70 ? 'EXCELLENT' : score >= 50 ? 'GOOD' : score >= 30 ? 'FAIR' : 'POOR',
      issues,
      strengths
    };
  }

  /**
   * Update top performers list
   */
  updateTopStrategies(record) {
    this.topStrategies.push(record);
    // Sort by profit factor, then win rate
    this.topStrategies.sort((a, b) => {
      if (b.metrics.profitFactor !== a.metrics.profitFactor) {
        return b.metrics.profitFactor - a.metrics.profitFactor;
      }
      return b.metrics.winRate - a.metrics.winRate;
    });
    // Keep top 50
    this.topStrategies = this.topStrategies.slice(0, 50);
  }

  /**
   * Get learning progression at checkpoint
   */
  getLearningCheckpoint(upToGeneration) {
    const records = this.metricsHistory.slice(0, upToGeneration);

    if (records.length === 0) {
      return null;
    }

    const metrics = {
      avgWinRate: this.average(records.map(r => r.metrics.winRate)),
      avgProfitFactor: this.average(records.map(r => r.metrics.profitFactor)),
      avgSharpe: this.average(records.map(r => r.metrics.sharpeRatio)),
      avgDrawdown: this.average(records.map(r => r.metrics.maxDrawdown)),
      avgReturn: this.average(records.map(r => r.metrics.returnPercent)),
      goodCount: records.filter(r => r.quality.rating === 'GOOD' || r.quality.rating === 'EXCELLENT').length,
      totalCount: records.length
    };

    return {
      generation: upToGeneration,
      timestamp: new Date().toISOString(),
      metrics,
      progression: {
        winRateProgression: this.metricsHistory.slice(0, upToGeneration).map(r => r.metrics.winRate),
        profitFactorProgression: this.metricsHistory.slice(0, upToGeneration).map(r => r.metrics.profitFactor)
      }
    };
  }

  /**
   * Get evolution report for specific generations
   */
  getEvolutionReport() {
    const checkpoints = [100, 250, 500];
    const report = {
      title: 'Agent Learning Evolution Report',
      generatedAt: new Date().toISOString(),
      checkpoints: []
    };

    checkpoints.forEach(gen => {
      const checkpoint = this.getLearningCheckpoint(gen);
      if (checkpoint) {
        report.checkpoints.push(checkpoint);
      }
    });

    return report;
  }

  /**
   * Get learning metrics by indicator
   */
  getIndicatorEffectiveness() {
    const indicatorMetrics = {};

    this.metricsHistory.forEach(record => {
      record.strategy.indicators.forEach(ind => {
        if (!indicatorMetrics[ind.name]) {
          indicatorMetrics[ind.name] = {
            count: 0,
            totalWinRate: 0,
            totalProfitFactor: 0,
            totalSharpe: 0,
            strategies: []
          };
        }

        indicatorMetrics[ind.name].count++;
        indicatorMetrics[ind.name].totalWinRate += record.metrics.winRate;
        indicatorMetrics[ind.name].totalProfitFactor += record.metrics.profitFactor;
        indicatorMetrics[ind.name].totalSharpe += record.metrics.sharpeRatio;
        indicatorMetrics[ind.name].strategies.push(record.strategyId);
      });
    });

    // Calculate averages
    const effectiveness = {};
    for (const [ind, data] of Object.entries(indicatorMetrics)) {
      effectiveness[ind] = {
        appearances: data.count,
        percentage: ((data.count / this.metricsHistory.length) * 100).toFixed(1),
        avgWinRate: (data.totalWinRate / data.count).toFixed(2),
        avgProfitFactor: (data.totalProfitFactor / data.count).toFixed(2),
        avgSharpe: (data.totalSharpe / data.count).toFixed(2),
        topPerformers: this.topStrategies
          .filter(s => s.strategy.indicators.some(i => i.name === ind))
          .slice(0, 5)
          .map(s => ({ id: s.strategyId, pf: s.metrics.profitFactor }))
      };
    }

    return effectiveness;
  }

  /**
   * Get top 10 strategies
   */
  getTop10() {
    return this.topStrategies.slice(0, 10).map((s, idx) => ({
      rank: idx + 1,
      strategyId: s.strategyId,
      indicators: s.strategy.indicators.map(i => i.name).join('+'),
      asset: s.strategy.asset,
      timeframe: `M${s.strategy.timeframe}`,
      winRate: s.metrics.winRate.toFixed(2),
      profitFactor: s.metrics.profitFactor.toFixed(2),
      sharpeRatio: s.metrics.sharpeRatio.toFixed(2),
      drawdown: s.metrics.maxDrawdown.toFixed(2),
      quality: s.quality.rating
    }));
  }

  /**
   * Generate learning summary
   */
  generateLearningReport() {
    const report = {
      title: 'ZORRO Agent Training Report',
      generatedAt: new Date().toISOString(),
      totalStrategies: this.metricsHistory.length,
      overview: {
        avgWinRate: this.average(this.metricsHistory.map(r => r.metrics.winRate)).toFixed(2),
        avgProfitFactor: this.average(this.metricsHistory.map(r => r.metrics.profitFactor)).toFixed(2),
        avgSharpe: this.average(this.metricsHistory.map(r => r.metrics.sharpeRatio)).toFixed(2),
        excellentCount: this.metricsHistory.filter(r => r.quality.rating === 'EXCELLENT').length,
        goodCount: this.metricsHistory.filter(r => r.quality.rating === 'GOOD').length,
        fairCount: this.metricsHistory.filter(r => r.quality.rating === 'FAIR').length,
        poorCount: this.metricsHistory.filter(r => r.quality.rating === 'POOR').length
      },
      evolution: this.getEvolutionReport(),
      indicatorEffectiveness: this.getIndicatorEffectiveness(),
      top10: this.getTop10(),
      insights: this.generateInsights()
    };

    return report;
  }

  /**
   * Generate actionable insights from learning
   */
  generateInsights() {
    const insights = [];

    if (this.metricsHistory.length === 0) {
      return insights;
    }

    // Insight 1: Best indicator combinations
    const topIndCombos = this.getTopIndicatorCombinations();
    insights.push({
      title: 'Best Indicator Combinations',
      finding: topIndCombos.length > 0 ? topIndCombos[0] : 'No clear winner',
      recommendation: 'Focus on combinations appearing in top performers'
    });

    // Insight 2: Asset performance
    const assetPerf = this.getAssetPerformance();
    if (Object.keys(assetPerf).length > 0) {
      const bestAsset = Object.keys(assetPerf).reduce((a, b) =>
        assetPerf[a].avgProfitFactor > assetPerf[b].avgProfitFactor ? a : b
      );
      insights.push({
        title: 'Best Performing Asset',
        finding: bestAsset,
        recommendation: `${bestAsset} shows strongest results - prioritize for deployment`
      });
    }

    // Insight 3: Optimal timeframe
    const tfPerf = this.getTimeframePerformance();
    if (Object.keys(tfPerf).length > 0) {
      const bestTF = Object.keys(tfPerf).reduce((a, b) =>
        tfPerf[a].avgSharpe > tfPerf[b].avgSharpe ? a : b
      );
      insights.push({
        title: 'Optimal Timeframe',
        finding: bestTF,
        recommendation: `${bestTF} offers best risk-adjusted returns`
      });
    }

    // Insight 4: Learning rate
    if (this.metricsHistory.length >= 100) {
      const earlyAvg = this.average(this.metricsHistory.slice(0, 100).map(r => r.metrics.profitFactor));
      const lateAvg = this.average(this.metricsHistory.slice(-100).map(r => r.metrics.profitFactor));
      const improvement = (((lateAvg - earlyAvg) / earlyAvg) * 100).toFixed(1);

      insights.push({
        title: 'Agent Learning Progress',
        finding: `${improvement}% improvement in profit factor`,
        recommendation: 'Agent is learning and improving over time'
      });
    }

    return insights;
  }

  /**
   * Get top indicator combinations
   */
  getTopIndicatorCombinations() {
    const combos = {};

    this.topStrategies.slice(0, 20).forEach(s => {
      const combo = s.strategy.indicators.map(i => i.name).sort().join('+');
      if (!combos[combo]) {
        combos[combo] = { count: 0, avgPF: 0 };
      }
      combos[combo].count++;
      combos[combo].avgPF += s.metrics.profitFactor;
    });

    return Object.entries(combos)
      .map(([combo, data]) => ({
        combination: combo,
        frequency: data.count,
        avgProfitFactor: (data.avgPF / data.count).toFixed(2)
      }))
      .sort((a, b) => b.avgProfitFactor - a.avgProfitFactor);
  }

  /**
   * Get asset performance metrics
   */
  getAssetPerformance() {
    if (this.metricsHistory.length === 0) {
      return {};
    }

    const assetData = {};

    this.metricsHistory.forEach(record => {
      const asset = record.strategy.asset;
      if (!assetData[asset]) {
        assetData[asset] = { count: 0, totalPF: 0, totalSharpe: 0 };
      }
      assetData[asset].count++;
      assetData[asset].totalPF += record.metrics.profitFactor;
      assetData[asset].totalSharpe += record.metrics.sharpeRatio;
    });

    const performance = {};
    for (const [asset, data] of Object.entries(assetData)) {
      performance[asset] = {
        count: data.count,
        avgProfitFactor: (data.totalPF / data.count).toFixed(2),
        avgSharpe: (data.totalSharpe / data.count).toFixed(2)
      };
    }

    return performance;
  }

  /**
   * Get timeframe performance
   */
  getTimeframePerformance() {
    const tfData = {};

    this.metricsHistory.forEach(record => {
      const tf = `M${record.strategy.timeframe}`;
      if (!tfData[tf]) {
        tfData[tf] = { count: 0, totalSharpe: 0, totalPF: 0 };
      }
      tfData[tf].count++;
      tfData[tf].totalSharpe += record.metrics.sharpeRatio;
      tfData[tf].totalPF += record.metrics.profitFactor;
    });

    const performance = {};
    for (const [tf, data] of Object.entries(tfData)) {
      performance[tf] = {
        count: data.count,
        avgSharpe: (data.totalSharpe / data.count).toFixed(2),
        avgProfitFactor: (data.totalPF / data.count).toFixed(2)
      };
    }

    return performance;
  }

  /**
   * Save learning log
   */
  saveLearningLog() {
    const report = this.generateLearningReport();
    fs.writeFileSync(this.learningLog, JSON.stringify(report, null, 2));
    return report;
  }

  /**
   * Helper: Calculate average
   */
  average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}

module.exports = LearningTracker;
