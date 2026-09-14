/**
 * Real Code Generator - Generates valid Lite-C code for ZORRO strategies
 * Supports all 12 indicator types with proper parameterization
 * Generates 3 variants: baseline, WFO (optimized), and SPP (parameter-perturbed)
 */

const fs = require('fs');
const path = require('path');
const AssetManager = require('./asset-manager');

class RealCodeGenerator {
  constructor(zorroPath = 'D:\\ZORRO') {
    this.assetManager = new AssetManager(zorroPath);
    this.indicatorConfig = {
      SMA: { func: 'SMA', params: ['period'] },
      EMA: { func: 'EMA', params: ['period'] },
      WMA: { func: 'WMA', params: ['period'] },
      DEMA: { func: 'DEMA', params: ['period'] },
      RSI: { func: 'RSI', params: ['period'] },
      MACD: { func: 'MACD', params: ['fast', 'slow', 'signal'] },
      ROC: { func: 'ROC', params: ['period'] },
      Stochastic: { func: 'Stochastic', params: ['kPeriod', 'dPeriod'] },
      CCI: { func: 'CCI', params: ['period'] },
      ATR: { func: 'ATR', params: ['period'] },
      BBands: { func: 'BBands', params: ['period', 'stdDev'] },
      ADX: { func: 'ADX', params: ['period'] }
    };
  }

  /**
   * Generate baseline Lite-C code (fixed parameters, no optimization)
   */
  generateBaseline(strategy) {
    const header = this.generateHeader(strategy, 'BASELINE');
    const indicators = this.generateIndicators(strategy);
    const entry = this.generateEntry(strategy);
    const exit = this.generateExit(strategy);
    const riskMgmt = this.generateRiskManagement(strategy);

    return `${header}\n${indicators}\n${entry}\n${exit}\n${riskMgmt}\n}`;
  }

  /**
   * Generate WFO variant with optimization directives
   */
  generateWFOVariant(strategy) {
    const header = this.generateHeader(strategy, 'WFO');
    const indicators = this.generateIndicatorsOptimized(strategy);
    const wfoConfig = this.generateWFOConfig();
    const entry = this.generateEntry(strategy);
    const exit = this.generateExit(strategy);
    const riskMgmt = this.generateRiskManagement(strategy);

    return `${header}\n${wfoConfig}\n${indicators}\n${entry}\n${exit}\n${riskMgmt}\n}`;
  }

  /**
   * Generate SPP variant with fixed perturbed parameter
   */
  generateSPPVariant(strategy, perturbedParam, perturbedValue) {
    const header = this.generateHeader(strategy, `SPP_${perturbedParam}`);
    const indicators = this.generateIndicatorsSPP(strategy, perturbedParam, perturbedValue);
    const entry = this.generateEntry(strategy);
    const exit = this.generateExit(strategy);
    const riskMgmt = this.generateRiskManagement(strategy);

    return `${header}\n${indicators}\n${entry}\n${exit}\n${riskMgmt}\n}`;
  }

  /**
   * Generate file header with asset and configuration
   */
  generateHeader(strategy, variant) {
    const mapped = this.assetManager.mapSymbol(strategy.asset);
    if (!mapped) {
      throw new Error(`Cannot map asset: ${strategy.asset}`);
    }

    const timeframeMap = { 5: 'M5', 15: 'M15', 60: 'H1', 240: 'H4' };
    const tf = timeframeMap[strategy.timeframe] || `M${strategy.timeframe}`;

    return `// ===================================================
// ZORRO Strategy: ${strategy.name} (${variant})
// Asset: ${mapped} | Timeframe: ${tf}
// Generated: ${new Date().toISOString()}
// ===================================================

#include <default.c>

void run() {
  // Asset configuration
  asset("${mapped}");
  TimeFrame = ${strategy.timeframe};
  BarPeriod = ${strategy.timeframe};

  // Risk management
  MaxBars = 0;  // unlimited
  MaxLong = 1;   // max 1 long position
  MaxShort = 0;  // no shorts
  MaxPosSize = ${this.extractLotsFromRiskParams(strategy)};
`;
  }

  /**
   * Generate indicator declarations (baseline)
   */
  generateIndicators(strategy) {
    let code = '\n  // ===== INDICATORS =====\n';

    strategy.indicators.forEach((ind, idx) => {
      code += this.generateIndicatorVar(ind, idx, strategy);
    });

    return code;
  }

  /**
   * Generate indicator declarations with optimize() calls
   */
  generateIndicatorsOptimized(strategy) {
    let code = '\n  // ===== INDICATORS (Optimized) =====\n';

    strategy.indicators.forEach((ind, idx) => {
      code += this.generateIndicatorVarOptimized(ind, idx, strategy);
    });

    return code;
  }

  /**
   * Generate indicator declarations with SPP perturbation
   */
  generateIndicatorsSPP(strategy, perturbedParam, perturbedValue) {
    let code = '\n  // ===== INDICATORS (SPP Variant) =====\n';

    strategy.indicators.forEach((ind, idx) => {
      const isMod = `${ind.name}_${idx}` === perturbedParam;
      if (isMod) {
        code += this.generateIndicatorVarSPP(ind, idx, perturbedValue);
      } else {
        code += this.generateIndicatorVar(ind, idx, strategy);
      }
    });

    return code;
  }

  /**
   * Generate single indicator variable declaration
   */
  generateIndicatorVar(indicator, index, strategy) {
    const varName = `${indicator.name}_${index}`;
    const config = this.indicatorConfig[indicator.name];

    if (!config) {
      throw new Error(`Unknown indicator: ${indicator.name}`);
    }

    // Build parameter list
    const params = config.params.map(p => indicator.params[p] || 10).join(', ');
    const call = `${config.func}(${params})`;

    return `  var ${varName} = ${call};\n`;
  }

  /**
   * Generate indicator with optimize() wrapper
   */
  generateIndicatorVarOptimized(indicator, index, strategy) {
    const varName = `${indicator.name}_${index}`;
    const config = this.indicatorConfig[indicator.name];

    if (!config) {
      throw new Error(`Unknown indicator: ${indicator.name}`);
    }

    // Find the primary parameter to optimize (usually period)
    const primaryParam = config.params[0];
    const primaryValue = indicator.params[primaryParam] || 10;

    // Build call with optimize() on primary parameter
    let params = config.params.map(p => {
      if (p === primaryParam) {
        return `optimize("${varName}_${p}", ${primaryValue}, 5, 50, 1)`;
      }
      return indicator.params[p] || 10;
    }).join(', ');

    const call = `${config.func}(${params})`;
    return `  var ${varName} = ${call};\n`;
  }

  /**
   * Generate indicator with SPP perturbation (fixed value, not optimize)
   */
  generateIndicatorVarSPP(indicator, index, perturbedValue) {
    const varName = `${indicator.name}_${index}`;
    const config = this.indicatorConfig[indicator.name];

    const params = config.params.map((p, i) => {
      if (i === 0) return perturbedValue; // Use perturbed value for first param
      return indicator.params[p] || 10;
    }).join(', ');

    const call = `${config.func}(${params})`;
    return `  var ${varName} = ${call};\n`;
  }

  /**
   * Generate entry logic from conditions array
   */
  generateEntry(strategy) {
    if (!strategy.entry || !strategy.entry.conditions || strategy.entry.conditions.length === 0) {
      return '\n  // ===== ENTRY (NO CONDITIONS) =====\n  // No entry conditions defined\n';
    }

    let code = '\n  // ===== ENTRY =====\n  if(enterLong()) {\n';

    // Build condition chain (AND logic between all conditions)
    const conditions = strategy.entry.conditions.map((cond, idx) => {
      return this.generateCondition(cond, idx, strategy);
    });

    code += `    if(${conditions.join(' && ')}) {\n`;
    code += `      enterLong();\n`;
    code += `    }\n`;
    code += `  }\n`;

    return code;
  }

  /**
   * Generate single condition check
   */
  generateCondition(condition, condIndex, strategy) {
    const { indicator, operator, value } = condition;

    // Find indicator variable name
    let varName = null;
    for (let i = 0; i < strategy.indicators.length; i++) {
      if (strategy.indicators[i].name === indicator) {
        varName = `${indicator}_${i}`;
        break;
      }
    }

    if (!varName) {
      return 'true'; // Fallback if indicator not found
    }

    // Build operator logic
    switch (operator.toLowerCase()) {
      case 'above':
      case 'gt':
        return `${varName} > ${value}`;
      case 'below':
      case 'lt':
        return `${varName} < ${value}`;
      case 'cross':
      case 'crossover':
        return `crossover(${varName}, ${value})`;
      case 'crossunder':
      case 'crossdown':
        return `crossunder(${varName}, ${value})`;
      case 'equal':
      case 'eq':
        return `${varName} == ${value}`;
      default:
        return `${varName} > ${value}`;
    }
  }

  /**
   * Generate exit logic
   */
  generateExit(strategy) {
    let code = '\n  // ===== EXIT =====\n';

    if (strategy.exit && strategy.exit.type === 'TIME_BASED') {
      code += `  if(bar >= ${strategy.exit.bars}) {\n`;
      code += `    exitLong();\n`;
      code += `  }\n`;
    } else {
      code += `  // Exit after 20 bars by default\n`;
      code += `  if(bar >= 20) {\n`;
      code += `    exitLong();\n`;
      code += `  }\n`;
    }

    return code;
  }

  /**
   * Generate risk management (stop loss, take profit)
   */
  generateRiskManagement(strategy) {
    let code = '\n  // ===== RISK MANAGEMENT =====\n';

    const { stopLoss, takeProfit, maxLots } = strategy.riskParams || {};

    if (stopLoss) {
      const pips = this.extractPips(stopLoss);
      code += `  Stop = ${pips} * PIP;  // Stop loss\n`;
    } else {
      code += `  Stop = 50 * PIP;  // Default stop\n`;
    }

    if (takeProfit) {
      const pips = this.extractPips(takeProfit);
      code += `  TakeProfit = ${pips} * PIP;  // Take profit\n`;
    } else {
      code += `  TakeProfit = 200 * PIP;  // Default target\n`;
    }

    if (maxLots) {
      code += `  Lots = ${maxLots};  // Position size\n`;
    } else {
      code += `  Lots = 1;  // Default size\n`;
    }

    return code;
  }

  /**
   * Generate WFO configuration block
   */
  generateWFOConfig() {
    return `
  // ===== WFO CONFIGURATION =====
  if(Train) {
    NumWFOCycles = 10;  // Number of WFO cycles
    DataSplit = 80;      // 80% training, 20% out-of-sample
    WFOPeriod = 252;     // WFO cycle length (trading days)
  }
`;
  }

  /**
   * Extract numeric pips value from string like "50 pips"
   */
  extractPips(riskStr) {
    if (typeof riskStr === 'number') return riskStr;
    if (typeof riskStr === 'string') {
      const match = riskStr.match(/(\d+)/);
      return match ? parseInt(match[1]) : 50;
    }
    return 50;
  }

  /**
   * Extract lots from risk params
   */
  extractLotsFromRiskParams(strategy) {
    const { maxLots } = strategy.riskParams || {};
    return maxLots || 1;
  }

  /**
   * Save generated code to file
   */
  saveToFile(code, filepath) {
    fs.ensureDirSync(path.dirname(filepath));
    fs.writeFileSync(filepath, code, 'utf8');
    return { success: true, file: filepath, size: code.length };
  }

  /**
   * Generate all 3 variants for a strategy
   */
  generateAllVariants(strategy, outputDir) {
    const basename = `RB_${strategy.id.toString().padStart(4, '0')}_${strategy.name}`;

    const results = {
      baseline: null,
      wfo: null,
      spp: []
    };

    try {
      // Baseline
      const baselineCode = this.generateBaseline(strategy);
      const baselineFile = path.join(outputDir, `${basename}_Base.c`);
      this.saveToFile(baselineCode, baselineFile);
      results.baseline = { file: baselineFile, code: baselineCode };

      // WFO variant
      const wfoCode = this.generateWFOVariant(strategy);
      const wfoFile = path.join(outputDir, `${basename}_WFO.c`);
      this.saveToFile(wfoCode, wfoFile);
      results.wfo = { file: wfoFile, code: wfoCode };

      // SPP variants (perturb first indicator's primary parameter ±20%)
      if (strategy.indicators && strategy.indicators.length > 0) {
        const firstInd = strategy.indicators[0];
        const primaryParam = this.indicatorConfig[firstInd.name]?.params[0] || 'period';
        const baseValue = firstInd.params[primaryParam] || 10;

        // Generate 3 SPP variants: -20%, original, +20%
        const perturbations = [
          Math.round(baseValue * 0.8),
          baseValue,
          Math.round(baseValue * 1.2)
        ];

        perturbations.forEach((value, i) => {
          if (value > 0) {
            const sppCode = this.generateSPPVariant(strategy, `${firstInd.name}_0`, value);
            const sppFile = path.join(outputDir, `${basename}_SPP${i}.c`);
            this.saveToFile(sppCode, sppFile);
            results.spp.push({
              variant: i,
              paramValue: value,
              file: sppFile,
              code: sppCode
            });
          }
        });
      }

      return { success: true, strategyId: strategy.id, results };
    } catch (err) {
      return { success: false, strategyId: strategy.id, error: err.message };
    }
  }
}

// Ensure directory exists utility
if (!fs.ensureDirSync) {
  fs.ensureDirSync = function(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };
}

module.exports = RealCodeGenerator;
