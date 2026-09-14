#!/usr/bin/env node

/**
 * Demo Stage B - Generate synthetic WFO/MRC/Profile results
 */

const fs = require('fs');
const path = require('path');

class DemoStageB {
  constructor() {
    this.manifestPath = path.join(process.cwd(), 'training-results/robustness/MANIFEST_B.json');
  }

  run() {
    console.log('\n🎬 Generating Stage B synthetic results...\n');

    const manifest = JSON.parse(fs.readFileSync(this.manifestPath, 'utf8'));

    // Add synthetic metrics to finalists
    manifest.finalists.forEach((finalist, idx) => {
      finalist.scripts.wfo = {
        ...finalist.scripts.wfo,
        metrics: {
          bestPF: (Math.random() * 0.5 + finalist.baselineMetrics.profitFactor * 0.95).toFixed(2),
          worstPF: (Math.random() * 0.3 + finalist.baselineMetrics.profitFactor * 0.7).toFixed(2),
          avgPF: finalist.baselineMetrics.profitFactor,
          degradation: (Math.random() * 25).toFixed(1) // IS->OOS degradation
        }
      };

      finalist.scripts.mrc = {
        ...finalist.scripts.mrc,
        metrics: {
          pValue: (Math.random() * 8).toFixed(1), // < 5% highly significant
          cycles: 150
        }
      };

      finalist.scripts.profile = {
        ...finalist.scripts.profile,
        metrics: {
          stability: (Math.random() * 0.2 + 0.8).toFixed(2) // How stable across cycles
        }
      };

      finalist.scripts.spp.forEach((spp, sppIdx) => {
        spp.metrics = {
          pf: (finalist.baselineMetrics.profitFactor + (Math.random() * 0.4 - 0.2)).toFixed(2),
          variance: (Math.random() * 0.15).toFixed(2)
        };
      });

      finalist.status = 'complete';
    });

    fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

    console.log(`✅ Added synthetic metrics to ${manifest.finalists.length} finalists\n`);

    return manifest.finalists.length;
  }
}

const demo = new DemoStageB();
demo.run();

console.log('Next step:');
console.log('  node run-robustness-suite.js parse --stage B');
console.log('  node run-robustness-suite.js report --stage B\n');
