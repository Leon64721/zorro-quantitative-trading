/**
 * Auditor Agent - Real-time monitoring and quality assurance
 * Detects anomalies, validates data quality, and alerts on issues
 */

const fs = require('fs');
const path = require('path');

class AuditorAgent {
  constructor(outputDir = './training-results') {
    this.outputDir = outputDir;
    this.auditLog = path.join(outputDir, 'audit-log.txt');
    this.alerts = [];
    this.issues = [];
    this.checks = {
      dataIntegrity: 0,
      resultValidity: 0,
      metricConsistency: 0,
      riskChecks: 0
    };
    this.processedCount = 0;
    this.validCount = 0;
    this.invalidCount = 0;

    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Audit strategy result before it's saved
   */
  auditStrategy(strategyId, metrics, strategyData) {
    this.processedCount++;
    const auditResult = {
      strategyId,
      timestamp: new Date().toISOString(),
      checks: [],
      valid: true,
      issues: []
    };

    // Check 1: Data Integrity
    const integrityCheck = this.checkDataIntegrity(metrics);
    auditResult.checks.push(integrityCheck);
    if (!integrityCheck.passed) {
      auditResult.valid = false;
      auditResult.issues.push(integrityCheck.message);
    }

    // Check 2: Result Validity
    const validityCheck = this.checkResultValidity(metrics);
    auditResult.checks.push(validityCheck);
    if (!validityCheck.passed) {
      auditResult.valid = false;
      auditResult.issues.push(validityCheck.message);
    }

    // Check 3: Metric Consistency
    const consistencyCheck = this.checkMetricConsistency(metrics);
    auditResult.checks.push(consistencyCheck);
    if (!consistencyCheck.passed) {
      auditResult.valid = false;
      auditResult.issues.push(consistencyCheck.message);
    }

    // Check 4: Risk Management
    const riskCheck = this.checkRiskParameters(metrics, strategyData);
    auditResult.checks.push(riskCheck);
    if (!riskCheck.passed) {
      auditResult.issues.push(riskCheck.message);
      // Risk issues don't invalidate, just warn
    }

    // Check 5: Anomaly Detection
    const anomalyCheck = this.detectAnomalies(metrics);
    auditResult.checks.push(anomalyCheck);
    if (anomalyCheck.alerts.length > 0) {
      auditResult.issues.push(...anomalyCheck.alerts);
    }

    if (auditResult.valid) {
      this.validCount++;
    } else {
      this.invalidCount++;
      this.issues.push(auditResult);
    }

    // Log if there are issues
    if (auditResult.issues.length > 0) {
      auditResult.issues.forEach(issue => {
        this.logAlert(strategyId, issue);
      });
    }

    return auditResult;
  }

  /**
   * Check data integrity
   */
  checkDataIntegrity(metrics) {
    const required = ['winRate', 'profitFactor', 'sharpeRatio', 'maxDrawdown'];
    const missing = [];

    required.forEach(field => {
      if (metrics[field] === undefined || metrics[field] === null) {
        missing.push(field);
      }
    });

    return {
      name: 'Data Integrity',
      passed: missing.length === 0,
      message: missing.length > 0 ? `Missing fields: ${missing.join(', ')}` : 'All required fields present'
    };
  }

  /**
   * Check result validity
   */
  checkResultValidity(metrics) {
    const issues = [];

    // Check value ranges
    if (metrics.winRate < 0 || metrics.winRate > 100) {
      issues.push(`Invalid win rate: ${metrics.winRate}%`);
    }

    if (metrics.totalTrades !== undefined && metrics.totalTrades < 0) {
      issues.push(`Negative trade count: ${metrics.totalTrades}`);
    }

    if (metrics.profitFactor < 0) {
      issues.push(`Negative profit factor: ${metrics.profitFactor}`);
    }

    if (metrics.maxDrawdown < 0 || metrics.maxDrawdown > 100) {
      issues.push(`Invalid drawdown: ${metrics.maxDrawdown}%`);
    }

    return {
      name: 'Result Validity',
      passed: issues.length === 0,
      message: issues.length > 0 ? issues.join('; ') : 'All values in valid ranges'
    };
  }

  /**
   * Check metric consistency
   */
  checkMetricConsistency(metrics) {
    const issues = [];

    // Win rate + profit factor relationship
    if (metrics.winRate < 40 && metrics.profitFactor > 2.5) {
      issues.push('Unusual: High profit factor with low win rate (possible gap risk)');
    }

    if (metrics.winRate > 80 && metrics.profitFactor < 1.0) {
      issues.push('Inconsistent: High win rate but negative profit factor');
    }

    // Sharpe should correlate with profit factor
    if (metrics.profitFactor > 2.0 && metrics.sharpeRatio < 0.3) {
      issues.push('Suspicious: High profit factor but very low Sharpe ratio');
    }

    // Total trades should relate to win/loss count
    if (metrics.totalTrades > 0 && metrics.winTrades === undefined) {
      // Can't fully verify, just note
    }

    return {
      name: 'Metric Consistency',
      passed: issues.length === 0,
      message: issues.length > 0 ? issues.join('; ') : 'Metrics are consistent'
    };
  }

  /**
   * Check risk management parameters
   */
  checkRiskParameters(metrics, strategyData) {
    const warnings = [];

    // Check max drawdown
    if (metrics.maxDrawdown > 50) {
      warnings.push(`⚠️  High drawdown (${metrics.maxDrawdown}%) - risk may be too high`);
    }

    // Check if strategy has any trades
    if (!metrics.totalTrades || metrics.totalTrades === 0) {
      warnings.push('⚠️  No trades generated - entry conditions may be too strict');
    }

    // Check if too many trades
    if (metrics.totalTrades > 500) {
      warnings.push(`⚠️  Very high trade count (${metrics.totalTrades}) - may be over-trading`);
    }

    return {
      name: 'Risk Management',
      passed: warnings.length === 0,
      message: warnings.length > 0 ? warnings.join('; ') : 'Risk parameters acceptable'
    };
  }

  /**
   * Detect anomalies
   */
  detectAnomalies(metrics) {
    const alerts = [];

    // Anomaly 1: Unrealistic returns
    if (metrics.returnPercent > 500) {
      alerts.push(`🚨 ALERT: Unrealistic return (${metrics.returnPercent}%) - likely overfitted`);
    }

    // Anomaly 2: Perfect win rate
    if (metrics.winRate === 100) {
      alerts.push(`🚨 ALERT: Perfect 100% win rate - data error or overfitting`);
    }

    // Anomaly 3: Extreme profit factor
    if (metrics.profitFactor > 10) {
      alerts.push(`🚨 ALERT: Extreme profit factor (${metrics.profitFactor}) - verify data quality`);
    }

    // Anomaly 4: Negative Sharpe with profit
    if (metrics.sharpeRatio < 0 && metrics.profitFactor > 1.5) {
      alerts.push(`🚨 ALERT: Negative Sharpe with high profit factor - inconsistent`);
    }

    // Anomaly 5: Too few trades
    if (metrics.totalTrades && metrics.totalTrades < 5) {
      alerts.push(`⚠️  Very few trades (${metrics.totalTrades}) - limited statistical significance`);
    }

    return {
      name: 'Anomaly Detection',
      passed: alerts.length === 0,
      alerts
    };
  }

  /**
   * Log alert
   */
  logAlert(strategyId, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Strategy ${strategyId}: ${message}\n`;

    try {
      fs.appendFileSync(this.auditLog, logEntry);
      this.alerts.push({ strategyId, message, timestamp });
    } catch (error) {
      console.error(`Failed to log alert: ${error.message}`);
    }
  }

  /**
   * Generate audit summary
   */
  generateAuditSummary() {
    const summary = {
      title: 'Audit Report',
      generatedAt: new Date().toISOString(),
      totalProcessed: this.processedCount,
      validStrategies: this.validCount,
      invalidStrategies: this.invalidCount,
      validityRate: this.processedCount > 0 ? ((this.validCount / this.processedCount) * 100).toFixed(2) + '%' : 'N/A',
      totalAlerts: this.alerts.length,
      issues: this.issues.slice(0, 20), // Top 20 issues
      qualityScore: this.calculateQualityScore(),
      recommendations: this.generateRecommendations()
    };

    return summary;
  }

  /**
   * Calculate overall quality score
   */
  calculateQualityScore() {
    if (this.processedCount === 0) return 0;

    let score = 100;

    // Deduct for invalid strategies
    const invalidRate = (this.invalidCount / this.processedCount) * 100;
    score -= invalidRate * 0.3;

    // Deduct for alerts
    const alertRate = (this.alerts.length / this.processedCount) * 100;
    score -= alertRate * 0.2;

    return Math.max(0, Math.round(score * 10) / 10);
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    const qualityScore = this.calculateQualityScore();

    if (qualityScore > 90) {
      recommendations.push('✅ Excellent data quality - results are reliable');
    } else if (qualityScore > 70) {
      recommendations.push('⚠️  Good quality overall, but some anomalies detected');
    } else {
      recommendations.push('❌ Data quality issues - review audit log carefully');
    }

    if (this.validCount / this.processedCount < 0.9) {
      recommendations.push('⚠️  Consider reviewing strategy generation parameters');
    }

    if (this.alerts.filter(a => a.message.includes('ALERT')).length > 20) {
      recommendations.push('🚨 Multiple critical alerts - investigate data sources');
    }

    recommendations.push('Continue monitoring quality during training');

    return recommendations;
  }

  /**
   * Create audit checkpoint
   */
  createCheckpoint(generationNumber) {
    const checkpoint = {
      generation: generationNumber,
      timestamp: new Date().toISOString(),
      stats: {
        processed: this.processedCount,
        valid: this.validCount,
        invalid: this.invalidCount
      },
      summary: this.generateAuditSummary()
    };

    const checkpointPath = path.join(this.outputDir, `audit-checkpoint-${generationNumber}.json`);
    fs.writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));

    return checkpoint;
  }

  /**
   * Print real-time status
   */
  printStatus() {
    const validRate = this.processedCount > 0
      ? ((this.validCount / this.processedCount) * 100).toFixed(1)
      : 0;

    console.log(`\n📋 Audit Status:`);
    console.log(`   Processed: ${this.processedCount}`);
    console.log(`   Valid: ${this.validCount} (${validRate}%)`);
    console.log(`   Invalid: ${this.invalidCount}`);
    console.log(`   Alerts: ${this.alerts.length}`);
    console.log(`   Quality Score: ${this.calculateQualityScore()}/100`);
  }
}

module.exports = AuditorAgent;
