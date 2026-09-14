/**
 * Risk Management Framework - Position sizing, portfolio allocation, drawdown protection
 * Prepares robust strategies for live trading deployment
 */

class RiskFramework {
  constructor(accountSize = 10000) {
    this.accountSize = accountSize;
    this.riskPerTrade = 0.02; // 2% per trade
    this.maxPortfolioDD = 0.20; // 20% max portfolio drawdown
    this.maxConcentration = 0.40; // 40% max per asset
  }

  /**
   * Calculate position size for a strategy
   */
  calculatePositionSize(strategy, accountBalance = null) {
    const balance = accountBalance || this.accountSize;

    // Extract risk parameters
    const stopLoss = this.parsePips(strategy.riskParams?.stopLoss) || 50;
    const riskAmount = balance * this.riskPerTrade;

    // Position size = Risk Amount / Stop Loss (in pips * pip value)
    // Assumes standard pip value; adjust based on instrument
    const pipValue = this.getPipValue(strategy.asset);
    const riskInDollars = balance * this.riskPerTrade;
    const lotSize = riskInDollars / (stopLoss * pipValue);

    return {
      riskPercentage: this.riskPerTrade * 100,
      riskAmount: riskInDollars.toFixed(2),
      stopLoss: stopLoss,
      pipValue: pipValue,
      lotSize: Math.max(0.01, Math.round(lotSize * 100) / 100), // Min 0.01 lots
      accountBalance: balance
    };
  }

  /**
   * Allocate capital across portfolio of strategies
   */
  allocatePortfolio(strategies, totalCapital = null) {
    const capital = totalCapital || this.accountSize;

    // Rank strategies by expected return (Profit Factor)
    const ranked = [...strategies].sort((a, b) => (b.profitFactor || 0) - (a.profitFactor || 0));

    const allocation = [];
    let remainingCapital = capital;

    ranked.forEach((strategy, idx) => {
      // Higher ranked get more capital (pyramid allocation)
      const weight = this.calculateAllocationWeight(idx, ranked.length);
      const allocatedCapital = capital * weight;

      // Respect max concentration limit
      const finalAllocation = Math.min(allocatedCapital, capital * this.maxConcentration);

      allocation.push({
        strategyId: strategy.id,
        rank: idx + 1,
        weight: (weight * 100).toFixed(1) + '%',
        allocatedCapital: finalAllocation.toFixed(2),
        positionSize: this.calculatePositionSize(strategy, finalAllocation)
      });

      remainingCapital -= finalAllocation;
    });

    return {
      totalCapital: capital,
      allocations: allocation,
      totalAllocated: (capital - remainingCapital).toFixed(2),
      remaining: Math.max(0, remainingCapital).toFixed(2)
    };
  }

  /**
   * Calculate allocation weight using pyramid distribution
   */
  calculateAllocationWeight(rank, total) {
    // Best strategy gets 40%, next gets 30%, etc.
    const weights = [0.40, 0.30, 0.20, 0.10, 0.05];
    if (rank < weights.length) {
      return weights[rank];
    }
    // Remaining strategies split evenly
    return 0.05 / (total - weights.length);
  }

  /**
   * Get pip value for currency/asset
   */
  getPipValue(asset) {
    // Standard pip values (USD)
    const pipValues = {
      'EUR/USD': 10.00,
      'GBP/USD': 10.00,
      'USD/JPY': 0.01,
      'USD/CHF': 10.00,
      'AUD/USD': 10.00,
      'USD/CAD': 10.00,
      'SPX500': 0.01,
      'NAS100': 0.01,
      'US30': 0.01,
      'XAU/USD': 0.01,
      'UK100': 0.01,
      'GER30': 0.01
    };

    return pipValues[asset] || 10.00;
  }

  /**
   * Drawdown monitoring and alerts
   */
  createDrawdownMonitor(initialBalance = null) {
    const balance = initialBalance || this.accountSize;
    const maxDD = balance * this.maxPortfolioDD;

    return {
      initialBalance: balance,
      maxAllowedDrawdown: maxDD.toFixed(2),
      alertLevel1: (maxDD * 0.5).toFixed(2), // 50% of max
      alertLevel2: (maxDD * 0.75).toFixed(2), // 75% of max
      alertLevel3: maxDD.toFixed(2), // Full drawdown
      checkpoints: [
        { label: 'Green', threshold: (maxDD * 0.3).toFixed(2), action: 'MONITOR' },
        { label: 'Yellow', threshold: (maxDD * 0.6).toFixed(2), action: 'ALERT' },
        { label: 'Red', threshold: maxDD.toFixed(2), action: 'REDUCE_POSITION_SIZE' },
        { label: 'Critical', threshold: (balance * 0.25).toFixed(2), action: 'HALT_TRADING' }
      ]
    };
  }

  /**
   * Generate trading rules for live deployment
   */
  generateTradingRules(strategy, portfolio = null) {
    const posSize = this.calculatePositionSize(strategy);

    return {
      strategyId: strategy.id,
      tradingRules: {
        entry: {
          indicator: strategy.indicators?.map(i => i.name).join(' + '),
          timeframe: this.timeframeToString(strategy.timeframe),
          conditions: strategy.entry?.conditions?.length || 0
        },
        riskManagement: {
          stopLoss: `${posSize.stopLoss} pips`,
          takeProfit: strategy.riskParams?.takeProfit || 'Time-based',
          positionSize: posSize.lotSize.toFixed(2) + ' lots',
          riskPerTrade: posSize.riskAmount
        },
        dailyLimits: {
          maxDailyLoss: (parseFloat(posSize.riskAmount) * 3).toFixed(2),
          maxDailyTrades: 10,
          timeWindow: '08:00 - 16:00 (Market hours)'
        },
        qualityChecks: {
          minTradesPerDay: 1,
          maxConsecutiveLosses: 3,
          correlationCheck: 'Verify asset correlation < 0.7',
          dataFreshness: '< 5 minutes old'
        }
      },
      preTradeChecklist: [
        '✓ Account funded and connected',
        '✓ Strategy code deployed',
        '✓ Data feed live',
        '✓ Risk limits set',
        '✓ Drawdown monitor active',
        '✓ News events reviewed',
        '✓ Market conditions suitable'
      ],
      alerts: {
        profitTarget: 'Log when PL > 10% account',
        stopLoss: 'Auto-halt if 3 consecutive losses',
        drawdown: 'Alert at 10%, 15%, 20% DD',
        dataQuality: 'Halt if data lag > 5 seconds'
      }
    };
  }

  /**
   * Calculate required equity for deployment
   */
  calculateMinimumEquity(strategies) {
    // Each strategy needs minimum equity
    const minPerStrategy = 1000; // $1000 minimum per strategy
    const baseCapital = minPerStrategy * strategies.length;

    // Add buffer for drawdown (20% max)
    const withBuffer = baseCapital / (1 - this.maxPortfolioDD);

    return {
      minimumPerStrategy: minPerStrategy,
      baseRequired: baseCapital.toFixed(2),
      withDrawdownBuffer: Math.ceil(withBuffer).toFixed(2),
      recommendation: `Recommended: $${Math.ceil(withBuffer * 1.5)}`
    };
  }

  /**
   * Pre-deployment validation
   */
  validateDeployment(strategies, accountSize) {
    const validations = [];
    const minEquity = this.calculateMinimumEquity(strategies);

    // Check 1: Account size
    if (accountSize < parseFloat(minEquity.withDrawdownBuffer)) {
      validations.push({
        check: 'Account Size',
        status: 'FAIL',
        message: `Account $${accountSize} < required $${minEquity.withDrawdownBuffer}`,
        severity: 'CRITICAL'
      });
    } else {
      validations.push({
        check: 'Account Size',
        status: 'PASS',
        message: `Sufficient capital: $${accountSize}`,
        severity: 'OK'
      });
    }

    // Check 2: Strategy quality
    const goodStrategies = strategies.filter(s => (s.profitFactor || 0) > 1.5).length;
    if (goodStrategies < 3) {
      validations.push({
        check: 'Strategy Quality',
        status: 'WARN',
        message: `Only ${goodStrategies} strategies with PF > 1.5 (recommend 3+)`,
        severity: 'WARNING'
      });
    } else {
      validations.push({
        check: 'Strategy Quality',
        status: 'PASS',
        message: `${goodStrategies} high-quality strategies identified`,
        severity: 'OK'
      });
    }

    // Check 3: Asset diversification
    const assets = new Set(strategies.map(s => s.asset));
    if (assets.size < 3) {
      validations.push({
        check: 'Asset Diversification',
        status: 'WARN',
        message: `Low diversification: ${assets.size} assets (recommend 4+)`,
        severity: 'WARNING'
      });
    } else {
      validations.push({
        check: 'Asset Diversification',
        status: 'PASS',
        message: `Good diversification: ${assets.size} assets`,
        severity: 'OK'
      });
    }

    // Check 4: Robustness testing
    const robustStrategies = strategies.filter(s => s.robustnessVerdict === 'ROBUSTA').length;
    if (robustStrategies === 0) {
      validations.push({
        check: 'Robustness Testing',
        status: 'WARN',
        message: 'No strategies marked as ROBUSTA - recommendation pending',
        severity: 'WARNING'
      });
    } else {
      validations.push({
        check: 'Robustness Testing',
        status: 'PASS',
        message: `${robustStrategies} strategies passed robustness tests`,
        severity: 'OK'
      });
    }

    return {
      deploymentReady: validations.every(v => v.status !== 'FAIL'),
      validations,
      overallStatus: validations.some(v => v.status === 'FAIL') ? 'BLOCKED' :
                     validations.some(v => v.status === 'WARN') ? 'CONDITIONAL' : 'APPROVED'
    };
  }

  /**
   * Helper: Convert timeframe to string
   */
  timeframeToString(tf) {
    const map = { 5: 'M5', 15: 'M15', 60: 'H1', 240: 'H4' };
    return map[tf] || `M${tf}`;
  }

  /**
   * Helper: Parse pips
   */
  parsePips(str) {
    if (typeof str === 'number') return str;
    if (typeof str === 'string') {
      const match = str.match(/(\d+)/);
      return match ? parseInt(match[1]) : 50;
    }
    return 50;
  }
}

module.exports = RiskFramework;
