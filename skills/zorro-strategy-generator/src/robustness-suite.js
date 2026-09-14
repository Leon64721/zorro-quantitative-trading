/**
 * Robustness Suite Orchestrator
 * Manages 2-stage robustness validation: Screening (Etapa A) → Full Suite (Etapa B)
 * Generates scripts, checklists, and robustness reports
 */

const fs = require('fs');
const path = require('path');
const RealCodeGenerator = require('./real-code-generator');
const AssetManager = require('./asset-manager');

class RobustnessSuite {
  constructor(zorroPath = 'D:\\ZORRO', projectRoot = '.') {
    this.zorroPath = zorroPath;
    this.projectRoot = projectRoot;
    this.strategyPath = path.join(zorroPath, 'Strategy');
    this.logPath = path.join(zorroPath, 'Log');
    this.codeGen = new RealCodeGenerator(zorroPath);
    this.assetManager = new AssetManager(zorroPath);

    // Create output directories
    this.robustnessDir = path.join(projectRoot, 'training-results', 'robustness');
    this.scriptsDir = path.join(this.robustnessDir, 'scripts');
    [this.robustnessDir, this.scriptsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Stage A: Select and screen ~25 diverse strategies
   * Returns list of baseline scripts and checklist
   */
  stageA(metadataPath, candidateCount = 25) {
    console.log(`\n📊 STAGE A: Screening ${candidateCount} diverse strategies...`);

    // Load metadata
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const strategies = metadata.strategies || [];

    // Select diverse candidates (stratified by indicator)
    const candidates = this.selectCandidates(strategies, candidateCount);
    console.log(`✅ Selected ${candidates.length} strategies`);

    const manifest = {
      stage: 'A',
      generatedAt: new Date().toISOString(),
      candidates: [],
      stats: {
        totalStrategies: strategies.length,
        selected: candidates.length,
        indicatorDistribution: {},
        assetDistribution: {}
      }
    };

    // Generate baseline scripts
    candidates.forEach((strategy, idx) => {
      console.log(`  ${idx + 1}/${candidates.length}: Generating ${strategy.name}...`);

      try {
        const result = this.codeGen.generateAllVariants(strategy, this.strategyPath);
        if (result.success) {
          // Also copy baseline to scripts dir for version control
          const baselineCode = result.results.baseline.code;
          const basename = `RB_${strategy.id.toString().padStart(4, '0')}_${strategy.name}`;
          const scriptPath = path.join(this.scriptsDir, `${basename}_Base.c`);
          fs.writeFileSync(scriptPath, baselineCode, 'utf8');

          manifest.candidates.push({
            id: strategy.id,
            name: strategy.name,
            asset: strategy.asset,
            timeframe: strategy.timeframe,
            indicators: strategy.indicators.map(i => i.name),
            baselineFile: path.basename(result.results.baseline.file),
            status: 'pending',
            metrics: null
          });

          // Track distributions
          strategy.indicators.forEach(ind => {
            manifest.stats.indicatorDistribution[ind.name] =
              (manifest.stats.indicatorDistribution[ind.name] || 0) + 1;
          });
          manifest.stats.assetDistribution[strategy.asset] =
            (manifest.stats.assetDistribution[strategy.asset] || 0) + 1;
        }
      } catch (err) {
        console.error(`    ❌ Error: ${err.message}`);
      }
    });

    // Save manifest
    const manifestFile = path.join(this.robustnessDir, 'MANIFEST.json');
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), 'utf8');

    // Generate checklist
    const checklist = this.generateStageAChecklist(manifest);
    const checklistFile = path.join(this.robustnessDir, 'STAGE_A_CHECKLIST.md');
    fs.writeFileSync(checklistFile, checklist, 'utf8');

    console.log(`\n✅ Stage A generated:`);
    console.log(`   Manifest: ${manifestFile}`);
    console.log(`   Checklist: ${checklistFile}`);
    console.log(`   Scripts: ${this.strategyPath}`);

    return {
      success: true,
      stage: 'A',
      candidates: manifest.candidates,
      manifestFile,
      checklistFile
    };
  }

  /**
   * Stage B: Run full robustness suite on finalists
   * Requires Stage A to be manually completed in ZORRO
   */
  stageB(manifestPath, finalistCount = 8, sppVariants = 3, mrcCycles = 150) {
    console.log(`\n🔬 STAGE B: Running full robustness suite on ${finalistCount} finalists...`);

    // Load manifest with Stage A results
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Select finalists (those marked complete and top performers)
    const finalists = manifest.candidates
      .filter(c => c.status === 'complete' && c.metrics)
      .sort((a, b) => (b.metrics.profitFactor || 0) - (a.metrics.profitFactor || 0))
      .slice(0, finalistCount);

    if (finalists.length === 0) {
      console.error('❌ No completed strategies in manifest. Run Stage A first and mark as complete.');
      return { success: false, error: 'No finalists found' };
    }

    console.log(`✅ Found ${finalists.length} completed finalists`);

    const stageBManifest = {
      stage: 'B',
      generatedAt: new Date().toISOString(),
      finalists: [],
      config: {
        sppVariants,
        mrcCycles,
        expectedActions: finalists.length * (1 + 1 + 1 + sppVariants) // WFO + MRC + Profile + SPP
      }
    };

    // Generate WFO, MRC, and SPP scripts for each finalist
    finalists.forEach((finalist, idx) => {
      console.log(`  ${idx + 1}/${finalists.length}: Generating suite for ${finalist.name}...`);

      const finalEntry = {
        id: finalist.id,
        name: finalist.name,
        baselineMetrics: finalist.metrics,
        scripts: {
          wfo: null,
          mrc: null,
          profile: null,
          spp: []
        },
        status: 'pending'
      };

      try {
        // WFO script (already generated in Stage A, copy and mark)
        const basename = path.basename(finalist.baselineFile, '_Base.c');
        finalEntry.scripts.wfo = {
          file: `${basename}_WFO.c`,
          mode: 'Train',
          expectedOutput: 'WFO cycle analysis'
        };

        // MRC script (adapt from template)
        const mrcFile = `${basename}_MRC.c`;
        const mrcScript = this.generateMRCScript(finalist, mrcCycles);
        fs.writeFileSync(path.join(this.strategyPath, mrcFile), mrcScript, 'utf8');
        fs.writeFileSync(path.join(this.scriptsDir, mrcFile), mrcScript, 'utf8');
        finalEntry.scripts.mrc = {
          file: mrcFile,
          mode: 'Test',
          cycles: mrcCycles,
          expectedOutput: 'P-Value (probability of edge)'
        };

        // WFO Profile script
        const profileFile = `${basename}_Profile.c`;
        const profileScript = this.generateWFOProfileScript(finalist);
        fs.writeFileSync(path.join(this.strategyPath, profileFile), profileScript, 'utf8');
        fs.writeFileSync(path.join(this.scriptsDir, profileFile), profileScript, 'utf8');
        finalEntry.scripts.profile = {
          file: profileFile,
          mode: 'Train',
          expectedOutput: 'WFO robustness profile'
        };

        // SPP variants (parameter perturbation)
        for (let i = 0; i < sppVariants; i++) {
          const sppFile = `${basename}_SPP${i}.c`;
          finalEntry.scripts.spp.push({
            file: sppFile,
            variant: i,
            mode: 'Test',
            expectedOutput: 'Metrics with perturbed parameters'
          });
        }

        stageBManifest.finalists.push(finalEntry);
      } catch (err) {
        console.error(`    ❌ Error: ${err.message}`);
      }
    });

    // Save Stage B manifest
    const manifestFile = path.join(this.robustnessDir, 'MANIFEST_B.json');
    fs.writeFileSync(manifestFile, JSON.stringify(stageBManifest, null, 2), 'utf8');

    // Generate Stage B checklist
    const checklist = this.generateStageBChecklist(stageBManifest);
    const checklistFile = path.join(this.robustnessDir, 'STAGE_B_CHECKLIST.md');
    fs.writeFileSync(checklistFile, checklist, 'utf8');

    console.log(`\n✅ Stage B generated:`);
    console.log(`   Manifest: ${manifestFile}`);
    console.log(`   Checklist: ${checklistFile}`);

    return {
      success: true,
      stage: 'B',
      finalists: stageBManifest.finalists,
      manifestFile,
      checklistFile
    };
  }

  /**
   * Select stratified candidates (diverse by indicator, asset)
   */
  selectCandidates(strategies, count) {
    // Group by primary indicator
    const byIndicator = {};

    strategies.forEach(strat => {
      const primaryInd = strat.indicators?.[0]?.name || 'unknown';
      if (!byIndicator[primaryInd]) {
        byIndicator[primaryInd] = [];
      }
      byIndicator[primaryInd].push(strat);
    });

    // Sample proportionally from each group
    const selected = [];
    const indicatorNames = Object.keys(byIndicator);

    indicatorNames.forEach(ind => {
      const group = byIndicator[ind];
      const proportion = Math.ceil(count / indicatorNames.length);
      const sample = group.sort(() => Math.random() - 0.5).slice(0, proportion);
      selected.push(...sample);
    });

    // Return exactly count strategies
    return selected.slice(0, count);
  }

  /**
   * Generate MRC (Monte Carlo Reality Check) wrapper script
   */
  generateMRCScript(finalist, cycles) {
    const baselineFile = finalist.baselineFile.replace('_Base.c', '').replace('.c', '');

    return `// ===================================================
// Monte Carlo Reality Check: ${finalist.name}
// Validates if edge is statistically significant
// P-Value: < 5% highly significant, 5-15% significant
// ===================================================

#define CYCLES ${cycles}
#define RANDOMIZE BOOTSTRAP

#include "${baselineFile}_Base.c"

void run() {
  MonteCarlo = CYCLES;
  Confidence = 95;  // 95% confidence level

  // Call original strategy
  strategy();
}
`;
  }

  /**
   * Generate WFO Profile script (robustness across different cycle counts)
   */
  generateWFOProfileScript(finalist) {
    const baselineFile = finalist.baselineFile.replace('_Base.c', '').replace('.c', '');

    return `// ===================================================
// WFO Profile: ${finalist.name}
// Tests robustness across different WFO cycle counts
// Degradation > 30% indicates potential overfitting
// ===================================================

#include "${baselineFile}_Base.c"

void run() {
  // Test different WFO configurations
  int minCycles = 5;
  int maxCycles = 20;

  for(int cycles = minCycles; cycles <= maxCycles; cycles++) {
    NumWFOCycles = cycles;
    DataSplit = 80;

    strategy();
  }
}
`;
  }

  /**
   * Generate Stage A checklist (human-readable manual execution guide)
   */
  generateStageAChecklist(manifest) {
    let md = `# ZORRO Robustness Suite - Stage A: Screening

**Generated**: ${new Date().toISOString()}
**Total Strategies**: ${manifest.candidates.length}
**Estimated Time**: ~3-4 hours (depending on data/backtesting speed)

## Instructions

1. **Open ZORRO** at \`D:\\ZORRO\\Zorro.exe\`
2. For each strategy below:
   - Open the \`.c\` script file (in \`Strategy\` folder)
   - Click **Test** mode to run a single backtest
   - Check for **compilation errors** (fix if any)
   - Wait for completion (~2-5 min per strategy)
   - Note the final metrics (Profit Factor, Win Rate, Sharpe)
   - Mark as ✅ done

3. **After completing all 25 backtests:**
   - Run: \`node run-robustness-suite.js parse --stage A\`
   - This will extract metrics and prepare Stage B

---

## Screening Checklist

| # | Strategy | Asset | TF | Indicators | Script | Status | PF | Win% |
|----|----------|-------|----|----|--------|--------|-----|------|
`;

    manifest.candidates.forEach((c, idx) => {
      md += `| ${idx + 1} | ${c.name} | ${c.asset} | ${c.timeframe} | ${c.indicators.join('+')} | \`${c.baselineFile}\` | [ ] | - | - |\n`;
    });

    md += `\n## Notes

- **Mode**: Test (single backtest)
- **Location**: \`D:\\ZORRO\\Strategy\\RB_*.c\` files
- **Check for**: Compilation errors, missing data, negative results
- **Time per test**: 2-5 minutes depending on asset/timeframe
- **Log file**: \`D:\\ZORRO\\Log\\<scriptname>.txt\` (contains all metrics)

## Next Step

Once all 25 are ✅ complete, run Stage B:
\`\`\`bash
node run-robustness-suite.js stage-b --finalists 8
\`\`\`

---

**Tip**: Keep ZORRO Strategy panel open and drag scripts from file browser to the strategy area for quick loading.
`;

    return md;
  }

  /**
   * Generate Stage B checklist
   */
  generateStageBChecklist(manifest) {
    let md = `# ZORRO Robustness Suite - Stage B: Full Validation

**Generated**: ${new Date().toISOString()}
**Finalists**: ${manifest.finalists.length}
**Expected Actions**: ${manifest.config.expectedActions}
**Estimated Time**: ~6-8 hours

## What Stage B Tests

Each finalist strategy will be tested with:
1. **WFO** (Walk-Forward Optimization) — Out-of-sample validation
2. **MRC** (Monte Carlo Reality Check) — Statistical significance (${manifest.config.mrcCycles} cycles)
3. **WFO Profile** — Robustness across cycle counts
4. **SPP** (Parameter Permutation) — 3 variants with perturbed parameters

---

## Execution Guide

### For Each Finalist:

\`\`\`
1. Open WFO script: Click [Train] (5-10 min)
   - Look for: "WFO Cycles" table with Best/Worst/Avg metrics
   - Check degradation: IS → OOS should be < 20%

2. Open MRC script: Click [Test] (5-15 min, depending on cycles)
   - Look for: "P-Value: X%" in log
   - Goal: < 5% (highly significant) or 5-15% (significant)

3. Open Profile script: Click [Train] (10-20 min)
   - Look for: Performance chart across cycle counts
   - Goal: Relatively flat line (no degradation)

4. Run SPP variants (3×): Click [Test] for each (5 min each = 15 min)
   - Compare PF/Sharpe across the 3 parameter values
   - Goal: Stable results (std/mean < 0.25)
\`\`\`

---

## Stage B Checklist

`;

    manifest.finalists.forEach((f, idx) => {
      md += `\n### ${idx + 1}. **${f.name}** (ID: ${f.id})\n`;
      md += `Baseline PF: **${f.baselineMetrics.profitFactor?.toFixed(2) || '—'}** | Win%: **${f.baselineMetrics.winRate?.toFixed(1) || '—'}%**\n\n`;

      md += `| Script | Mode | Target Metric | Status |\n`;
      md += `|--------|------|---------------|--------|\n`;
      md += `| \`${f.scripts.wfo.file}\` | ${f.scripts.wfo.mode} | WFO Cycles table, IS→OOS degradation | [ ] |\n`;
      md += `| \`${f.scripts.mrc.file}\` | ${f.scripts.mrc.mode} | P-Value < 10% | [ ] |\n`;
      md += `| \`${f.scripts.profile.file}\` | ${f.scripts.profile.mode} | Flat profile across cycles | [ ] |\n`;

      f.scripts.spp.forEach((spp, sppIdx) => {
        md += `| \`${spp.file}\` | ${spp.mode} | SPP variant ${sppIdx} metrics | [ ] |\n`;
      });
    });

    md += `\n## After Completing Stage B

1. Run: \`node run-robustness-suite.js parse --stage B\`
2. Review: \`ROBUSTNESS_REPORT.md\`
   - Each strategy gets a verdict: **ROBUSTA** / **MARGINAL** / **OVERFIT**
   - Decision logic: MRC p-value + WFO degradation + SPP stability

---

**Good Luck!** 🚀
`;

    return md;
  }

  /**
   * Parse results from completed ZORRO backtests (logs)
   */
  parseResults(stageId = 'A') {
    console.log(`\n📖 Parsing Stage ${stageId} results from ZORRO logs...`);

    const manifestFile = path.join(
      this.robustnessDir,
      stageId === 'A' ? 'MANIFEST.json' : 'MANIFEST_B.json'
    );

    if (!fs.existsSync(manifestFile)) {
      return { success: false, error: 'Manifest not found' };
    }

    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    const candidates = stageId === 'A' ? manifest.candidates : manifest.finalists;

    candidates.forEach((c, idx) => {
      const logFile = path.join(this.logPath, `${c.baselineFile?.replace('.c', '')}.txt`);

      if (fs.existsSync(logFile)) {
        const metrics = this.parseLogFile(logFile);
        c.metrics = metrics;
        c.status = 'complete';
        console.log(`  ✅ ${idx + 1}: Parsed ${c.name}`);
      } else {
        console.log(`  ⏳ ${idx + 1}: Waiting for ${c.name} (log not found)`);
      }
    });

    // Save updated manifest
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), 'utf8');

    return { success: true, stage: stageId, parsed: manifest };
  }

  /**
   * Parse ZORRO log file and extract metrics
   */
  parseLogFile(logPath) {
    const content = fs.readFileSync(logPath, 'utf8');
    const metrics = {
      profitFactor: null,
      winRate: null,
      sharpeRatio: null,
      maxDrawdown: null,
      netProfit: null,
      numTrades: null,
      pValue: null
    };

    // Extract basic metrics
    const pfMatch = content.match(/Profit Factor:\s*([\d.]+)/i);
    if (pfMatch) metrics.profitFactor = parseFloat(pfMatch[1]);

    const wrMatch = content.match(/Win Rate:\s*([\d.]+)%/i);
    if (wrMatch) metrics.winRate = parseFloat(wrMatch[1]);

    const sharpeMatch = content.match(/Sharpe Ratio:\s*([\d.]+)/i);
    if (sharpeMatch) metrics.sharpeRatio = parseFloat(sharpeMatch[1]);

    const ddMatch = content.match(/Max Drawdown:\s*([\d.]+)%/i);
    if (ddMatch) metrics.maxDrawdown = parseFloat(ddMatch[1]);

    const npMatch = content.match(/Net Profit:\s*([\d.-]+)/i);
    if (npMatch) metrics.netProfit = parseFloat(npMatch[1]);

    const ntMatch = content.match(/Num Trades:\s*(\d+)/i);
    if (ntMatch) metrics.numTrades = parseInt(ntMatch[1]);

    // Extract MRC P-Value
    const pvalMatch = content.match(/P-Value:\s*([\d.]+)%/i);
    if (pvalMatch) metrics.pValue = parseFloat(pvalMatch[1]);

    return metrics;
  }

  /**
   * Generate final robustness report with verdicts
   */
  generateReport(stageId = 'B') {
    console.log(`\n📊 Generating robustness report...`);

    const manifestFile = path.join(
      this.robustnessDir,
      stageId === 'A' ? 'MANIFEST.json' : 'MANIFEST_B.json'
    );

    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    const candidates = manifest.candidates || [];

    let report = `# 🔬 ZORRO Robustness Report - Stage ${stageId}\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Strategies Tested**: ${candidates.length}\n\n`;

    report += `## Summary\n\n`;

    const completed = candidates.filter(c => c.status === 'complete' && c.metrics);
    report += `- **Completed**: ${completed.length}/${candidates.length}\n`;
    report += `- **Pending**: ${candidates.length - completed.length}\n\n`;

    if (completed.length === 0) {
      report += `*No completed strategies yet. Run Stage ${stageId} backtests to populate metrics.*\n`;
    } else {
      // Summary table
      report += `## Results Table\n\n`;
      report += `| Strategy | Asset | PF | Win% | Sharpe | Verdict |\n`;
      report += `|----------|-------|----|----- |--------|----------|\n`;

      completed.forEach(c => {
        const verdict = this.calculateVerdict(c.metrics);
        const pf = c.metrics.profitFactor?.toFixed(2) || '—';
        const wr = c.metrics.winRate?.toFixed(1) || '—';
        const sharpe = c.metrics.sharpeRatio?.toFixed(2) || '—';

        report += `| ${c.name} | ${c.asset} | ${pf} | ${wr}% | ${sharpe} | **${verdict}** |\n`;
      });

      report += `\n## Verdicts\n\n`;
      report += `- **ROBUSTA**: Strategy passes all robustness tests → Ready for deployment\n`;
      report += `- **MARGINAL**: Mixed results, may need parameter tuning\n`;
      report += `- **OVERFIT**: Shows signs of curve-fitting → Requires redesign\n`;
    }

    const reportFile = path.join(this.robustnessDir, `ROBUSTNESS_REPORT_${stageId}.md`);
    fs.writeFileSync(reportFile, report, 'utf8');

    console.log(`✅ Report: ${reportFile}`);
    return reportFile;
  }

  /**
   * Calculate robustness verdict based on metrics
   */
  calculateVerdict(metrics) {
    const scores = {
      pValue: metrics.pValue ? (metrics.pValue < 5 ? 2 : metrics.pValue < 15 ? 1 : 0) : 1,
      profitFactor: metrics.profitFactor ? (metrics.profitFactor > 2 ? 2 : metrics.profitFactor > 1.5 ? 1 : 0) : 1
    };

    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

    if (avgScore >= 1.5) return '✅ ROBUSTA';
    if (avgScore >= 1) return '⚠️ MARGINAL';
    return '❌ OVERFIT';
  }
}

module.exports = RobustnessSuite;
