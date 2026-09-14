/**
 * Asset Manager - Handles ZORRO asset mapping, validation, and data management
 * Maps common trading symbols to ZORRO equivalents
 * Validates data availability and downloads if needed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const utils = require('./utils');

class AssetManager {
  constructor(zorroPath = 'D:\\ZORRO') {
    this.zorroPath = zorroPath;
    this.historyPath = path.join(zorroPath, 'History');
    this.strategyPath = path.join(zorroPath, 'Strategy');

    // Load available assets from CSV
    this.assets = this.loadAssetsList();

    // Map common symbols to ZORRO equivalents
    this.symbolMap = {
      // Index Futures → ZORRO Index Names
      'ES': 'SPX500',           // E-mini S&P 500 → S&P 500 Index
      'MES': 'SPX500',          // Micro E-mini S&P → S&P 500
      'NQ': 'NAS100',           // E-mini Nasdaq → Nasdaq 100 Index
      'MNQ': 'NAS100',          // Micro E-mini Nasdaq → Nasdaq 100
      'YM': 'US30',             // E-mini Dow → Dow 30
      'MYM': 'US30',            // Micro E-mini Dow → Dow 30
      'GC': 'XAU/USD',          // Gold Futures → Gold
      'SI': 'XAG/USD',          // Silver Futures → Silver
      'CL': 'WTIUSD',           // Crude Oil (if available)
      'NG': 'NGAS',             // Natural Gas (if available)

      // Forex Direct Mapping
      'EUR/USD': 'EUR/USD',
      'GBP/USD': 'GBP/USD',
      'USD/JPY': 'USD/JPY',
      'USD/CHF': 'USD/CHF',
      'AUD/USD': 'AUD/USD',
      'USD/CAD': 'USD/CAD',

      // Stocks/ETFs
      'AAPL': 'AAPL',
      'MSFT': 'MSFT',
      'GOOGL': 'GOOGL',
      'AMZN': 'AMZN',
      'TSLA': 'TSLA',
      'SPY': 'SPX500',           // SPY ETF tracks S&P 500
      'QQQ': 'NAS100',           // QQQ ETF tracks Nasdaq 100
      'IWM': 'US2000',           // Russell 2000

      // European Indices
      'DAX': 'GER30',
      'FTSE': 'UK100'
    };
  }

  /**
   * Load available assets from ZORRO's asset CSV file
   */
  loadAssetsList() {
    const assets = {};

    try {
      const csvPath = path.join(this.historyPath, 'AssetsFix.csv');
      if (!fs.existsSync(csvPath)) {
        console.warn(`Asset file not found: ${csvPath}`);
        return assets;
      }

      const content = fs.readFileSync(csvPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        if (idx === 0) return; // Skip header
        if (!line.trim()) return;

        const parts = line.split(',');
        if (parts.length < 12) return;

        const asset = {
          name: parts[0].trim(),
          price: parseFloat(parts[1]),
          spread: parseFloat(parts[2]),
          pip: parseFloat(parts[5]),
          pipCost: parseFloat(parts[6]),
          symbol: parts[11].trim()
        };

        assets[asset.name] = asset;
      });

      console.log(`✅ Loaded ${Object.keys(assets).length} assets from ZORRO`);
      return assets;
    } catch (error) {
      console.error(`Failed to load assets: ${error.message}`);
      return assets;
    }
  }

  /**
   * Map user's symbol to ZORRO equivalent
   */
  mapSymbol(userSymbol) {
    // Direct match
    if (this.symbolMap[userSymbol]) {
      return this.symbolMap[userSymbol];
    }

    // Check if it exists in ZORRO
    if (this.assets[userSymbol]) {
      return userSymbol;
    }

    // If not found, suggest alternatives
    console.warn(`Symbol "${userSymbol}" not found in mapping. Available indices: SPX500, NAS100, US30, GER30, UK100`);
    return null;
  }

  /**
   * Validate asset exists in ZORRO
   */
  validateAsset(assetName) {
    const mapped = this.mapSymbol(assetName);

    if (!mapped) {
      return {
        valid: false,
        error: `Asset "${assetName}" not recognized`,
        alternatives: this.getAlternatives(assetName)
      };
    }

    if (!this.assets[mapped]) {
      return {
        valid: false,
        error: `Asset "${mapped}" not found in ZORRO asset list`,
        alternatives: Object.keys(this.assets).slice(0, 10)
      };
    }

    return {
      valid: true,
      mapped: mapped,
      asset: this.assets[mapped]
    };
  }

  /**
   * Check if data exists for asset in date range
   */
  checkDataAvailability(assetName, startDate, endDate) {
    const mapped = this.mapSymbol(assetName);
    if (!mapped) return { available: false, reason: 'Asset not found' };

    const dataFiles = [];
    const startYear = parseInt(startDate.toString().substring(0, 4));
    const endYear = parseInt(endDate.toString().substring(0, 4));

    for (let year = startYear; year <= endYear; year++) {
      // Check for .t6 files (candles) - most common
      const t6File = path.join(this.historyPath, `${mapped}_${year}.t6`);
      const t6FileNoYear = path.join(this.historyPath, `${mapped}.t6`);

      if (fs.existsSync(t6File) || fs.existsSync(t6FileNoYear)) {
        dataFiles.push({
          file: t6File,
          type: '.t6',
          year: year
        });
      }
    }

    return {
      available: dataFiles.length > 0,
      files: dataFiles,
      mapped: mapped,
      missingYears: this.getMissingYears(startYear, endYear, dataFiles)
    };
  }

  /**
   * Get which years don't have data
   */
  getMissingYears(startYear, endYear, foundFiles) {
    const foundYears = new Set(foundFiles.map(f => f.year));
    const missing = [];

    for (let year = startYear; year <= endYear; year++) {
      if (!foundYears.has(year)) {
        missing.push(year);
      }
    }

    return missing;
  }

  /**
   * Get alternative symbol suggestions
   */
  getAlternatives(userSymbol) {
    const suggestions = [];

    // Fuzzy matching
    const lowerUser = userSymbol.toLowerCase();

    for (const [key, mapped] of Object.entries(this.symbolMap)) {
      if (key.toLowerCase().includes(lowerUser) || mapped.toLowerCase().includes(lowerUser)) {
        suggestions.push(`${key} → ${mapped}`);
      }
    }

    return suggestions.slice(0, 5);
  }

  /**
   * Download data for asset using ZORRO's Download script
   * This requires ZORRO to be running or using command-line interface
   */
  async downloadData(assetName, startDate, endDate) {
    const mapped = this.mapSymbol(assetName);
    if (!mapped) {
      return { success: false, error: `Cannot map "${assetName}" to ZORRO symbol` };
    }

    utils.logEvent('DATA_DOWNLOAD_START', {
      asset: assetName,
      mapped: mapped,
      dateRange: `${startDate}-${endDate}`
    });

    try {
      // Method 1: Try using ZORRO Download script
      // ZORRO has a built-in Download script that can fetch data
      const downloadScript = path.join(this.strategyPath, 'Download.c');

      if (!fs.existsSync(downloadScript)) {
        return {
          success: false,
          error: 'ZORRO Download.c script not found',
          instruction: 'Please open ZORRO, go to View → Download, and download data for ' + mapped
        };
      }

      // Try to run ZORRO in download mode
      // This is complex because it requires ZORRO GUI interaction
      // For now, provide instructions
      return {
        success: false,
        needsManualDownload: true,
        instruction: `To download ${mapped} data:
1. Open ZORRO.exe
2. Click [View] → [Download]
3. Select "${mapped}" from the list
4. Set date range: ${startDate} to ${endDate}
5. Click [Download]
6. Wait for completion`,
        dataPath: this.historyPath
      };

    } catch (error) {
      utils.logEvent('DATA_DOWNLOAD_ERROR', { error: error.message });

      return {
        success: false,
        error: error.message,
        instruction: 'Please download data manually in ZORRO'
      };
    }
  }

  /**
   * Generate pre-backtest report
   */
  generatePreBacktestReport(assetName, startDate, endDate) {
    const validation = this.validateAsset(assetName);

    if (!validation.valid) {
      return {
        status: 'INVALID',
        issues: [validation.error],
        suggestions: validation.alternatives
      };
    }

    const dataCheck = this.checkDataAvailability(assetName, startDate, endDate);

    const report = {
      status: dataCheck.available ? 'READY' : 'MISSING_DATA',
      asset: assetName,
      mappedTo: dataCheck.mapped,
      dataAvailable: dataCheck.files,
      missingYears: dataCheck.missingYears,
      assetDetails: validation.asset
    };

    if (!dataCheck.available) {
      report.action = 'Download data using ZORRO before backtesting';
      report.instruction = `Missing data for years: ${dataCheck.missingYears.join(', ')}`;
    }

    return report;
  }

  /**
   * Get list of available assets
   */
  listAvailableAssets() {
    return Object.keys(this.assets).sort();
  }

  /**
   * Get detailed asset info
   */
  getAssetDetails(assetName) {
    const mapped = this.mapSymbol(assetName);

    if (!mapped || !this.assets[mapped]) {
      return null;
    }

    const asset = this.assets[mapped];
    const dataCheck = this.checkDataAvailability(mapped, 20200101, 20261231);

    return {
      name: asset.name,
      mappedFrom: assetName,
      symbol: asset.symbol,
      pip: asset.pip,
      pipCost: asset.pipCost,
      spread: asset.spread,
      dataAvailable: dataCheck.available,
      dataFiles: dataCheck.files,
      ready: dataCheck.available
    };
  }
}

module.exports = AssetManager;
