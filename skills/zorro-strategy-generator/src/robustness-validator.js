/**
 * Robustness Validator - Advanced analysis of strategy performance
 * Evaluates statistical significance, overfitting risk, and deployment readiness
 */

const fs = require('fs');
const path = require('path');

class RobustnessValidator {
  constructor() {
    this.thresholds = {
      minProfitFactor: 1.5,
      minWinRate: 40,
      minSharpe: 0.5,
      maxDrawdown: 40,
      minTrades: 10,
      minConfidence: 85
    };
  }

  /**
   * Comprehensive strategy evaluation
   */
  evaluateStrategy(metrics, baseline) {
    const evaluation = {
      passed: true,
      score: 100,
      checks: [],
      riskFactors: [],
      warnings: [],
      verdict: 'UNKNOWN'
    };

    // Check 1: Profitability
    const pfCheck = this.checkProfitFactor(metrics.profitFactor, baseline);
    evaluation.checks.push(pfCheck);
    if (!pfCheck.pass) evaluation.score -= 25;

    // Check 2: Win Rate
    const wrCheck = this.checkWinRate(metrics.winRate);
    evaluation.checks.push(wrCheck);
    if (!wrCheck.pass) evaluation.score -= 15;

    // Check 3: Risk Metrics
    const riskCheck = this.checkRiskMetrics(metrics);
    evaluation.checks.push(riskCheck);
    if (!riskCheck.pass) evaluation.score -= 20;

    // Check 4: Trade Quality
    const tradeCheck = this.checkTradeQuality(metrics);
    evaluation.checks.push(tradeCheck);
    if (!tradeCheck.pass) evaluation.score -= 15;

    // Check 5: Statistical Significance (if available)
    if (metrics.pValue !== undefined) {
      const statCheck = this.checkStatisticalSignificance(metrics.pValue);
      evaluation.checks.push(statCheck);
      if (!statCheck.pass) evaluation.score -= 25;
    }

    // Overall verdict
    evaluation.verdict = this.calculateVerdict(evaluation.score, metrics);
    evaluation.passed = evaluation.score >= 60;

    return evaluation;
  }

  /**
   * Check Profit Factor
   */
  checkProfitFactor(pf, baseline = 1.5) {
    const passed = pf >= this.thresholds.minProfitFactor;
    return {
      name: 'Profit Factor',
      value: pf?.toFixed(2) || 'N/A',
      threshold: baseline,
      pass: passed,
      message: passed
        ? `✅ PF ${pf?.toFixed(2)} exceeds minimum ${baseline}`
        : `❌ PF ${pf?.toFixed(2)} below minimum ${baseline}`,
      severity: !passed ? 'critical' : 'ok'
    };
  }

  /**
   * Check Win Rate
   */
  checkWinRate(wr) {
    const passed = wr >= this.thresholds.minWinRate;
    return {
      name: 'Win Rate',
      value: wr?.toFixed(1) + '%' || 'N/A',
      threshold: `${this.thresholds.minWinRate}%`,
      pass: passed,
      message: passed
        ? `✅ Win rate ${wr?.toFixed(1)}% is acceptable`
        : `⚠️ Win rate ${wr?.toFixed(1)}% is low (< 40%)`,
      severity: !passed ? 'warning' : 'ok'
    };
  }

  /**
   * Check Risk Metrics (Sharpe, Drawdown)
   */
  checkRiskMetrics(metrics) {
    const checks = [];
    let passed = true;

    // Sharpe Ratio
    if (metrics.sharpeRatio) {
      const sharpeOk = metrics.sharpeRatio >= this.thresholds.minSharpe;
      checks.push({
        metric: 'Sharpe Ratio',
        value: metrics.sharpeRatio.toFixed(2),
        status: sharpeOk ? '✅' : '⚠️'
      });
      if (!sharpeOk) passed = false;
    }

    // Max Drawdown
    if (metrics.maxDrawdown) {
      const ddOk = metrics.maxDrawdown <= this.thresholds.maxDrawdown;
      checks.push({
        metric: 'Max Drawdown',
        value: metrics.maxDrawdown.toFixed(1) + '%',
        status: ddOk ? '✅' : '❌'
      });
      if (!ddOk) passed = false;
    }

    return {
      name: 'Risk Metrics',
      details: checks,
      pass: passed,
      message: passed ? '✅ Risk metrics acceptable' : '⚠️ High drawdown or low Sharpe',
      severity: !passed ? 'warning' : 'ok'
    };
  }

  /**
   * Check Trade Quality
   */
  checkTradeQuality(metrics) {
    const passed = metrics.totalTrades >= this.thresholds.minTrades;
    return {
      name: 'Trade Count',
      value: metrics.totalTrades || 0,
      threshold: this.thresholds.minTrades,
      pass: passed,
      message: passed
        ? `✅ Sufficient trades: ${metrics.totalTrades}`
        : `❌ Too few trades: ${metrics.totalTrades} (< 10)`,
      severity: !passed ? 'critical' : 'ok'
    };
  }

  /**
   * Check Statistical Significance (p-value from MRC)
   */
  checkStatisticalSignificance(pValue) {
    // p-value: < 5% highly significant, 5-15% significant, > 15% not significant
    let passed = pValue < 10; // 10% threshold
    let level = pValue < 5 ? 'Highly Significant' : pValue < 15 ? 'Significant' : 'Not Significant';

    return {
      name: 'Statistical Significance',
      value: pValue?.toFixed(1) + '%' || 'N/A',
      threshold: '< 10%',
      pass: passed,
      message: `${passed ? '✅' : '⚠️'} P-Value: ${pValue?.toFixed(1)}% (${level})`,
      severity: !passed ? 'warning' : 'ok'
    };
  }

  /**
   * Calculate overall verdict
   */
  calculateVerdict(score, metrics) {
    if (score >= 80) return 'EXCELLENT';
    if (score >= 70) return 'GOOD';
    if (score >= 60) return 'FAIR';
    if (score >= 40) return 'POOR';
    return 'REJECT';
  }

  /**
   * Overfitting detection (WFO degradation analysis)
   */
  detectOverfitting(wfoMetrics) {
    if (!wfoMetrics || !wfoMetrics.profitFactor) {
      return { detected: false, confidence: 0 };
    }

    const { best, worst, avg, stdDev } = wfoMetrics.profitFactor;
    if (!best || !worst || !avg) {
      return { detected: false, confidence: 0 };
    }

    const degradation = ((best - worst) / best) * 100;
    const coefficient = stdDev / avg; // Volatility of results

    // Overfitting indicators:
    // 1. Large degradation between best and worst WFO cycle
    // 2. High coefficient of variation (inconsistent performance)
    const highDegradation = degradation > 30;
    const highVolatility = coefficient > 0.4;

    return {
      detected: highDegradation || highVolatility,
      degradation: degradation.toFixed(1),
      coefficient: coefficient.toFixed(2),
      confidence: (degradation / 100) * 100,
      indicators: {
        highDegradation,
        highVolatility
      }
    };
  }

  /**
   * Risk assessment for deployment
   */
  assessDeploymentRisk(metrics, wfoMetrics = null, sppVariants = null) {
    const risks = {
      overallRisk: 'LOW',
      factors: [],
      score: 100
    };

    // Factor 1: WFO Degradation
    if (wfoMetrics) {
      const overfit = this.detectOverfitting(wfoMetrics);
      if (overfit.detected) {
        risks.factors.push({
          name: 'Overfitting Risk',
          severity: 'HIGH',
          description: `WFO degradation: ${overfit.degradation}%`,
          recommendation: 'Consider retraining with different parameters'
        });
        risks.score -= 30;
      }
    }

    // Factor 2: Parameter Sensitivity (SPP)
    if (sppVariants) {
      const sensitivity = this.analyzeSPPVariants(sppVariants);
      if (sensitivity.highVolatility) {
        risks.factors.push({
          name: 'Parameter Sensitivity',
          severity: 'MEDIUM',
          description: `High variation across parameter values: ${sensitivity.stdDev?.toFixed(2)}`,
          recommendation: 'Parameters may need stabilization'
        });
        risks.score -= 15;
      }
    }

    // Factor 3: Drawdown Risk
    if (metrics.maxDrawdown && metrics.maxDrawdown > 35) {
      risks.factors.push({
        name: 'High Drawdown',
        severity: 'MEDIUM',
        description: `Max drawdown: ${metrics.maxDrawdown?.toFixed(1)}%`,
        recommendation: 'Reduce position size or add stop-loss'
      });
      risks.score -= 10;
    }

    // Determine overall risk level
    if (risks.score >= 80) risks.overallRisk = 'LOW';
    else if (risks.score >= 60) risks.overallRisk = 'MEDIUM';
    else if (risks.score >= 40) risks.overallRisk = 'HIGH';
    else risks.overallRisk = 'CRITICAL';

    return risks;
  }

  /**
   * Analyze SPP variants for parameter sensitivity
   */
  analyzeSPPVariants(variants) {
    if (!variants || variants.length === 0) {
      return { available: false };
    }

    const pfs = variants.map(v => v.metrics?.profitFactor).filter(pf => pf !== undefined);

    if (pfs.length < 2) {
      return { available: false };
    }

    const avg = pfs.reduce((a, b) => a + b, 0) / pfs.length;
    const variance = pfs.reduce((sum, pf) => sum + Math.pow(pf - avg, 2), 0) / pfs.length;
    const stdDev = Math.sqrt(variance);
    const coefficient = stdDev / avg;

    return {
      available: true,
      pfs,
      avg: avg.toFixed(2),
      stdDev: stdDev.toFixed(2),
      coefficient: coefficient.toFixed(3),
      highVolatility: coefficient > 0.25, // >25% variation is high
      stable: coefficient < 0.15
    };
  }

  /**
   * Generate detailed audit report
   */
  generateAuditReport(strategyId, metrics, wfoMetrics = null, sppVariants = null) {
    const report = {
      strategyId,
      timestamp: new Date().toISOString(),
      basicEvaluation: this.evaluateStrategy(metrics),
      riskAssessment: this.assessDeploymentRisk(metrics, wfoMetrics, sppVariants),
      overfiittingAnalysis: wfoMetrics ? this.detectOverfitting(wfoMetrics) : null,
      sppAnalysis: sppVariants ? this.analyzeSPPVariants(sppVariants) : null,
      recommendation: this.getRecommendation(metrics, wfoMetrics, sppVariants)
    };

    return report;
  }

  /**
   * Get deployment recommendation
   */
  getRecommendation(metrics, wfoMetrics = null, sppVariants = null) {
    const pf = metrics.profitFactor || 0;
    const wr = metrics.winRate || 0;

    if (pf < 1.2 || wr < 35) {
      return {
        action: 'REJECT',
        reason: 'Does not meet minimum profitability thresholds',
        confidence: 'HIGH'
      };
    }

    if (wfoMetrics) {
      const overfit = this.detectOverfitting(wfoMetrics);
      if (overfit.detected && overfit.confidence > 60) {
        return {
          action: 'REVIEW',
          reason: 'Signs of overfitting detected in WFO analysis',
          confidence: 'HIGH'
        };
      }
    }

    if (pf > 2.0 && wr > 50) {
      return {
        action: 'APPROVE',
        reason: 'Excellent metrics, passes all thresholds',
        confidence: 'HIGH'
      };
    }

    return {
      action: 'CONDITIONAL_APPROVAL',
      reason: 'Acceptable metrics, recommend additional validation',
      confidence: 'MEDIUM'
    };
  }
}

module.exports = RobustnessValidator;
