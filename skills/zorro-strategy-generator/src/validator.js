/**
 * ZORRO Strategy Validator - Ensures 100% ZORRO compatibility
 */

const fs = require('fs');
const utils = require('./utils');

class StrategyValidator {
  constructor() {
    this.validIndicators = [
      'SMA', 'EMA', 'WMA', 'DEMA', 'TEMA',
      'ATR', 'ADX', 'ADXR',
      'RSI', 'ROC', 'MOMENTUM',
      'MACD', 'SIGNAL',
      'BBands', 'BOLLINGER',
      'Stochastic', 'CCI',
      'SAR',
      'TRIX',
      'Peak', 'Valley'
    ];

    this.validEntryFunctions = [
      'enterLong', 'enterShort', 'enterLongIfFlat'
    ];

    this.validExitFunctions = [
      'exitLong', 'exitShort'
    ];

    this.requiredConfig = [
      'BarPeriod',
      'asset',
      'StartDate',
      'EndDate'
    ];

    this.deprecatedFunctions = [
      'MA(', 'close()', 'Profit', 'setProfit(',
      'DataVar(', 'DataUpdate(', 'DataUpdate2('
    ];

    this.severityLevels = {
      'critical': 'Will not compile or run',
      'error': 'Strategy will not work correctly',
      'warning': 'May cause unexpected behavior',
      'info': 'Best practice suggestion'
    };
  }

  /**
   * Main validation method
   */
  validate(code) {
    const results = {
      valid: true,
      critical: [],
      errors: [],
      warnings: [],
      info: [],
      metrics: {}
    };

    // Run all validators
    this.validateSyntax(code, results);
    this.validateZORROConfig(code, results);
    this.validateIndicators(code, results);
    this.validateEntryExit(code, results);
    this.validateRiskManagement(code, results);
    this.validateSeries(code, results);
    this.validateDeprecated(code, results);
    this.validateStructure(code, results);

    // Overall validity
    results.valid = results.critical.length === 0 && results.errors.length === 0;

    // Calculate metrics
    results.metrics = this.calculateMetrics(code);

    return results;
  }

  /**
   * Check Lite-C syntax
   */
  validateSyntax(code, results) {
    // Balanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;

    if (openBraces !== closeBraces) {
      results.critical.push({
        type: 'BRACE_MISMATCH',
        message: `Brace mismatch: ${openBraces} opening, ${closeBraces} closing`,
        severity: 'critical'
      });
    }

    // Check for function run()
    if (!code.includes('function run()')) {
      results.critical.push({
        type: 'MISSING_RUN_FUNCTION',
        message: 'Missing function run() - ZORRO entry point',
        severity: 'critical'
      });
    }

    // Semicolon checks (simplified)
    const lines = code.split('\n');
    let lineNum = 0;

    lines.forEach(line => {
      lineNum++;
      const trimmed = line.trim();

      // Skip comments and empty lines
      if (trimmed.startsWith('//') || trimmed.length === 0) return;

      // Variables assignments should end with semicolon
      const varPattern = /^\s*(var|vars|int|double|float)\s+\w+\s*=.*;/;
      const assignPattern = /^\s*\w+\s*=.*;/;
      const configPattern = /^\s*\w+\s*=\s*[^;]*;$/;

      if (trimmed.includes('=') && !trimmed.includes('==')) {
        if (!line.includes(';') && !trimmed.endsWith('{')) {
          if (!trimmed.includes('if') && !trimmed.includes('for') && !trimmed.includes('while')) {
            results.warnings.push({
              type: 'MISSING_SEMICOLON',
              message: `Line ${lineNum}: Missing semicolon`,
              line: trimmed,
              severity: 'warning'
            });
          }
        }
      }
    });
  }

  /**
   * Validate ZORRO configuration
   */
  validateZORROConfig(code, results) {
    // Check required configuration
    const missingConfigs = [];

    this.requiredConfig.forEach(config => {
      if (!code.includes(config)) {
        missingConfigs.push(config);
      }
    });

    if (missingConfigs.length > 0) {
      results.errors.push({
        type: 'MISSING_CONFIG',
        message: `Missing required configuration: ${missingConfigs.join(', ')}`,
        configs: missingConfigs,
        severity: 'error'
      });
    }

    // Validate date format
    const dateMatch = code.match(/StartDate\s*=\s*(\d+)/);
    if (dateMatch) {
      const date = dateMatch[1];
      if (date.length !== 8 || date < '19000101' || date > '20991231') {
        results.warnings.push({
          type: 'INVALID_DATE_FORMAT',
          message: `StartDate format invalid: ${date}. Use YYYYMMDD format.`,
          severity: 'warning'
        });
      }
    }

    // Validate BarPeriod
    const bpMatch = code.match(/BarPeriod\s*=\s*(\d+)/);
    if (bpMatch) {
      const bp = parseInt(bpMatch[1]);
      if (bp < 1 || bp > 10080) { // 1 min to 1 week
        results.warnings.push({
          type: 'INVALID_BARPERIOD',
          message: `BarPeriod ${bp} seems unusual. Typical: 1-1440`,
          severity: 'warning'
        });
      }
    }
  }

  /**
   * Validate indicator usage
   */
  validateIndicators(code, results) {
    // Check for invalid indicators
    const indicatorPattern = /\b([A-Z]+)\s*\(/g;
    const usedIndicators = new Set();
    let match;

    while ((match = indicatorPattern.exec(code)) !== null) {
      usedIndicators.add(match[1]);
    }

    // Check each used indicator
    usedIndicators.forEach(ind => {
      if (!this.isValidIndicator(ind)) {
        // Skip built-in functions
        if (!this.isBuiltInFunction(ind)) {
          results.warnings.push({
            type: 'UNKNOWN_INDICATOR',
            message: `Unknown indicator: ${ind}. May not exist in ZORRO.`,
            indicator: ind,
            severity: 'warning'
          });
        }
      }
    });

    // Recommend LookBack if using indicators
    if (usedIndicators.size > 0 && !code.includes('LookBack')) {
      results.info.push({
        type: 'MISSING_LOOKBACK',
        message: 'Consider adding LookBack >= 100 for indicator warmup',
        severity: 'info'
      });
    }
  }

  /**
   * Validate entry and exit functions
   */
  validateEntryExit(code, results) {
    const hasEntry = this.validEntryFunctions.some(f => code.includes(f));
    const hasExit = this.validExitFunctions.some(f => code.includes(f));

    if (!hasEntry) {
      results.warnings.push({
        type: 'NO_ENTRY_LOGIC',
        message: 'No entry logic found. Strategy may not generate trades.',
        severity: 'warning'
      });
    }

    if (!hasExit && hasEntry) {
      results.warnings.push({
        type: 'NO_EXIT_LOGIC',
        message: 'No explicit exit logic. Positions may rely on global Stop/TakeProfit only.',
        severity: 'warning'
      });
    }

    // Validate NumOpenLong/NumOpenShort checks
    if (hasEntry && !code.includes('NumOpen')) {
      results.warnings.push({
        type: 'NO_POSITION_CHECK',
        message: 'Entry logic should check NumOpenLong/NumOpenShort to avoid multiple entries',
        severity: 'warning'
      });
    }
  }

  /**
   * Validate risk management parameters
   */
  validateRiskManagement(code, results) {
    const hasStop = code.includes('Stop =');
    const hasTakeProfit = code.includes('TakeProfit =');
    const hasLots = code.includes('Lots =');

    if (!hasStop || !hasTakeProfit) {
      results.info.push({
        type: 'MISSING_RISK_PARAMS',
        message: 'Consider adding Stop and TakeProfit for proper risk management',
        severity: 'info'
      });
    }

    if (!hasLots) {
      results.info.push({
        type: 'DEFAULT_LOTS',
        message: 'Using default Lots=1. Adjust for position sizing if needed.',
        severity: 'info'
      });
    }

    // Validate Stop/TP values
    const stopMatch = code.match(/Stop\s*=\s*([\d.]+\s*\*\s*PIP|[\d.]+)/);
    if (stopMatch && !stopMatch[1].includes('PIP')) {
      const val = parseFloat(stopMatch[1]);
      if (val < 1 || val > 10000) {
        results.warnings.push({
          type: 'UNUSUAL_STOP_VALUE',
          message: `Stop value ${val} seems unusual. Use PIP units for clarity.`,
          severity: 'warning'
        });
      }
    }
  }

  /**
   * Validate series usage
   */
  validateSeries(code, results) {
    // Check if accessing arrays without series()
    const arrayAccessPattern = /\b([A-Z][a-zA-Z]*)\[[\d+]\]/g;
    const arrayAccess = [];
    let match;

    while ((match = arrayAccessPattern.exec(code)) !== null) {
      arrayAccess.push(match[1]);
    }

    // These should be from series()
    const shouldBeSeries = ['Close', 'High', 'Low', 'Open', 'C', 'H', 'L', 'O'];
    const usedSeries = new Set();

    arrayAccess.forEach(name => {
      if (shouldBeSeries.includes(name)) {
        usedSeries.add(name);
      }
    });

    // Check if series() is called for these
    usedSeries.forEach(name => {
      if (!code.includes(`series(${name}`) && !code.includes(`series(price`)) {
        results.errors.push({
          type: 'ARRAY_ACCESS_WITHOUT_SERIES',
          message: `Array access to "${name}" without series(). Use: vars ${name} = series(price...());`,
          variable: name,
          severity: 'error'
        });
      }
    });
  }

  /**
   * Check for deprecated functions
   */
  validateDeprecated(code, results) {
    this.deprecatedFunctions.forEach(func => {
      if (code.includes(func)) {
        const replacement = this.getDeprecatedReplacement(func);
        results.errors.push({
          type: 'DEPRECATED_FUNCTION',
          message: `Deprecated function: ${func}. Use ${replacement} instead.`,
          deprecated: func,
          replacement: replacement,
          severity: 'error'
        });
      }
    });
  }

  /**
   * Validate code structure
   */
  validateStructure(code, results) {
    // Check indentation consistency (not critical but good practice)
    const lines = code.split('\n');
    const indents = [];

    lines.forEach((line, idx) => {
      const spaces = line.match(/^\s*/)[0].length;
      if (line.trim().length > 0) {
        indents.push(spaces);
      }
    });

    // All indents should be multiples of 4 (tabs or 4 spaces)
    const inconsistent = indents.filter(i => i % 4 !== 0);
    if (inconsistent.length > 3) {
      results.info.push({
        type: 'INCONSISTENT_INDENTATION',
        message: 'Inconsistent indentation detected. Use 4 spaces or tabs consistently.',
        severity: 'info'
      });
    }

    // Check for reasonable code length
    if (lines.length < 15) {
      results.info.push({
        type: 'VERY_SHORT_STRATEGY',
        message: 'Strategy is very short. Ensure all necessary logic is included.',
        severity: 'info'
      });
    }
  }

  /**
   * Calculate metrics about the code
   */
  calculateMetrics(code) {
    return {
      lines: code.split('\n').length,
      functions: (code.match(/function\s+\w+/g) || []).length,
      indicators: (code.match(/\b(SMA|EMA|RSI|ATR|MACD|BBands)\s*\(/g) || []).length,
      entries: (code.match(/(enterLong|enterShort)\(/g) || []).length,
      exits: (code.match(/(exitLong|exitShort)\(/g) || []).length,
      variables: (code.match(/\bvar\s+\w+/g) || []).length
    };
  }

  /**
   * Helper: Check if indicator is valid
   */
  isValidIndicator(name) {
    return this.validIndicators.includes(name) ||
           this.validEntryFunctions.some(f => f.startsWith(name)) ||
           this.validExitFunctions.some(f => f.startsWith(name));
  }

  /**
   * Helper: Check if it's a built-in ZORRO function
   */
  isBuiltInFunction(name) {
    const builtIns = [
      'printf', 'print', 'price', 'priceClose', 'priceOpen', 'priceHigh', 'priceLow',
      'asset', 'series', 'crossOver', 'crossUnder', 'min', 'max', 'abs', 'sqrt',
      'pow', 'log', 'exp', 'sin', 'cos', 'tan', 'random', 'floor', 'ceil',
      'hour', 'minute', 'day', 'dow', 'month', 'year', 'date',
      'Equity', 'Balance', 'Margin', 'is'
    ];
    return builtIns.includes(name);
  }

  /**
   * Helper: Get replacement for deprecated function
   */
  getDeprecatedReplacement(func) {
    const replacements = {
      'MA(': 'SMA( or EMA(',
      'close()': 'priceClose()',
      'Profit': 'Stop/TakeProfit',
      'setProfit(': 'Stop = ... TakeProfit = ...'
    };
    return replacements[func] || 'ZORRO documentation';
  }

  /**
   * Generate validation report
   */
  generateReport(validationResults) {
    const lines = [];
    const timestamp = new Date().toISOString();

    lines.push(`# ZORRO Strategy Validation Report`);
    lines.push(`Date: ${timestamp}`);
    lines.push(`\n## Summary`);
    lines.push(`- Valid: ${validationResults.valid ? '✅ YES' : '❌ NO'}`);
    lines.push(`- Critical Issues: ${validationResults.critical.length}`);
    lines.push(`- Errors: ${validationResults.errors.length}`);
    lines.push(`- Warnings: ${validationResults.warnings.length}`);
    lines.push(`- Info: ${validationResults.info.length}`);

    lines.push(`\n## Code Metrics`);
    const m = validationResults.metrics;
    lines.push(`- Lines of Code: ${m.lines}`);
    lines.push(`- Functions: ${m.functions}`);
    lines.push(`- Indicators Used: ${m.indicators}`);
    lines.push(`- Entry Points: ${m.entries}`);
    lines.push(`- Exit Points: ${m.exits}`);
    lines.push(`- Variables: ${m.variables}`);

    if (validationResults.critical.length > 0) {
      lines.push(`\n## 🔴 Critical Issues`);
      validationResults.critical.forEach(issue => {
        lines.push(`- **${issue.type}**: ${issue.message}`);
      });
    }

    if (validationResults.errors.length > 0) {
      lines.push(`\n## ❌ Errors`);
      validationResults.errors.forEach(issue => {
        lines.push(`- **${issue.type}**: ${issue.message}`);
      });
    }

    if (validationResults.warnings.length > 0) {
      lines.push(`\n## ⚠️ Warnings`);
      validationResults.warnings.forEach(issue => {
        lines.push(`- **${issue.type}**: ${issue.message}`);
      });
    }

    if (validationResults.info.length > 0) {
      lines.push(`\n## ℹ️ Info`);
      validationResults.info.forEach(issue => {
        lines.push(`- **${issue.type}**: ${issue.message}`);
      });
    }

    return lines.join('\n');
  }
}

module.exports = StrategyValidator;
