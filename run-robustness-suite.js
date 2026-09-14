#!/usr/bin/env node

/**
 * ZORRO Robustness Suite CLI
 * Commands:
 *   stage-a              Generate Stage A (screening) scripts and checklist
 *   stage-b              Generate Stage B (full suite) scripts
 *   parse [--stage A|B]  Parse completed ZORRO logs and extract metrics
 *   report [--stage A|B] Generate robustness report with verdicts
 */

const path = require('path');
const fs = require('fs');
const RobustnessSuite = require('./skills/zorro-strategy-generator/src/robustness-suite');

const projectRoot = process.cwd();
const metadataPath = path.join(projectRoot, 'training-results', 'strategies-metadata.json');

function printUsage() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   ZORRO Robustness Suite - Phase 3 Validation CLI        ║
╚════════════════════════════════════════════════════════════╝

USAGE:
  node run-robustness-suite.js <command> [options]

COMMANDS:

  stage-a [options]
    Generate Stage A screening scripts (25 diverse strategies)

    Options:
      --candidates N     Number of candidates (default: 25)
      --metadata PATH    Path to strategies-metadata.json

    Example:
      node run-robustness-suite.js stage-a --candidates 25

    Output:
      - STAGE_A_CHECKLIST.md (human-readable guide)
      - 25 \`.c\` scripts in D:\\ZORRO\\Strategy\\
      - MANIFEST.json (tracking)

  stage-b [options]
    Generate Stage B full robustness suite (8 finalists)
    Requires: Stage A already completed with results parsed

    Options:
      --finalists N      Number of finalists (default: 8)
      --spp-variants N   SPP perturbation variants (default: 3)
      --mrc-cycles N     MRC cycle count (default: 150)
      --manifest PATH    Path to MANIFEST.json from Stage A

    Example:
      node run-robustness-suite.js stage-b --finalists 8 --mrc-cycles 150

    Output:
      - STAGE_B_CHECKLIST.md (human-readable guide)
      - Scripts for: WFO, MRC, WFO Profile, SPP variants
      - MANIFEST_B.json (tracking)

  parse [options]
    Parse completed ZORRO backtest logs and extract metrics
    Run this AFTER manually completing backtests in ZORRO

    Options:
      --stage A|B        Which stage to parse (default: A)
      --manifest PATH    Path to manifest file

    Example:
      node run-robustness-suite.js parse --stage A
      node run-robustness-suite.js parse --stage B

    Output:
      - Updates MANIFEST.json with parsed metrics
      - Ready for report generation

  report [options]
    Generate robustness report with ROBUSTA/MARGINAL/OVERFIT verdicts

    Options:
      --stage A|B        Which stage report (default: B)

    Example:
      node run-robustness-suite.js report --stage B

    Output:
      - ROBUSTNESS_REPORT_A.md or ROBUSTNESS_REPORT_B.md

WORKFLOW:

  1. Generate Stage A scripts:
     \$ node run-robustness-suite.js stage-a --candidates 25

  2. [MANUAL] Open ZORRO, run 25 backtests, monitor for completion

  3. Parse Stage A results:
     \$ node run-robustness-suite.js parse --stage A

  4. Generate Stage B suite:
     \$ node run-robustness-suite.js stage-b --finalists 8

  5. [MANUAL] Open ZORRO, run WFO/MRC/Profile/SPP for each finalist

  6. Parse Stage B results:
     \$ node run-robustness-suite.js parse --stage B

  7. Generate final report:
     \$ node run-robustness-suite.js report --stage B

ESTIMATED TIMES:
  - Stage A screening: 3-4 hours (25 backtests × 5-10 min)
  - Stage B full suite: 6-8 hours (8 finalists × (WFO+MRC+Profile+SPP))
  - Total: ~12-15 hours manual work

---
`);
}

function getFlag(args, flagName, defaultValue) {
  const idx = args.indexOf(flagName);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return defaultValue;
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    printUsage();
    process.exit(0);
  }

  try {
    const suite = new RobustnessSuite('D:\\ZORRO', projectRoot);

    switch (command) {
      case 'stage-a': {
        const candidateCount = parseInt(getFlag(args, '--candidates', '25'));
        const metadata = getFlag(args, '--metadata', metadataPath);

        if (!fs.existsSync(metadata)) {
          throw new Error(`Metadata file not found: ${metadata}`);
        }

        console.log(`\n🎯 Launching Stage A screening...`);
        const result = suite.stageA(metadata, candidateCount);

        if (result.success) {
          console.log(`\n✅ SUCCESS!\n`);
          console.log(`📋 NEXT STEPS:`);
          console.log(`   1. Open: ${result.checklistFile}`);
          console.log(`   2. Launch ZORRO at D:\\\\ZORRO\\\\Zorro.exe`);
          console.log(`   3. Follow the checklist to run ${result.candidates.length} backtests`);
          console.log(`   4. After completion, run:\n`);
          console.log(`      node run-robustness-suite.js parse --stage A\n`);
        }
        break;
      }

      case 'stage-b': {
        const finalistCount = parseInt(getFlag(args, '--finalists', '8'));
        const sppVariants = parseInt(getFlag(args, '--spp-variants', '3'));
        const mrcCycles = parseInt(getFlag(args, '--mrc-cycles', '150'));

        const manifestPath = path.join(projectRoot, 'training-results', 'robustness', 'MANIFEST.json');

        if (!fs.existsSync(manifestPath)) {
          throw new Error(`Manifest not found. Run 'stage-a' first: ${manifestPath}`);
        }

        console.log(`\n🔬 Launching Stage B full validation...\n`);
        const result = suite.stageB(manifestPath, finalistCount, sppVariants, mrcCycles);

        if (result.success) {
          console.log(`\n✅ SUCCESS!\n`);
          console.log(`📋 NEXT STEPS:`);
          console.log(`   1. Open: ${result.checklistFile}`);
          console.log(`   2. For each of ${result.finalists.length} finalists, run:`);
          console.log(`      - WFO script (click [Train])`);
          console.log(`      - MRC script (click [Test], ~${mrcCycles} cycles)`);
          console.log(`      - WFO Profile script (click [Train])`);
          console.log(`      - ${sppVariants} SPP variants (click [Test])`);
          console.log(`   3. After completion, run:\n`);
          console.log(`      node run-robustness-suite.js parse --stage B\n`);
          console.log(`   4. Then generate report:\n`);
          console.log(`      node run-robustness-suite.js report --stage B\n`);
        }
        break;
      }

      case 'parse': {
        const stage = getFlag(args, '--stage', 'A');

        console.log(`📖 Parsing Stage ${stage} results...\n`);
        const result = suite.parseResults(stage);

        if (result.success) {
          console.log(`\n✅ Parsing complete!\n`);
          console.log(`📊 Results summary:`);

          const candidates = result.parsed[stage === 'A' ? 'candidates' : 'finalists'];
          const completed = candidates.filter(c => c.status === 'complete');

          console.log(`   - Total: ${candidates.length}`);
          console.log(`   - Completed: ${completed.length}`);
          console.log(`   - Pending: ${candidates.length - completed.length}\n`);

          if (completed.length > 0) {
            console.log(`📋 Next step:\n`);
            if (stage === 'A') {
              console.log(`   node run-robustness-suite.js stage-b --finalists 8\n`);
            } else {
              console.log(`   node run-robustness-suite.js report --stage B\n`);
            }
          }
        }
        break;
      }

      case 'report': {
        const stage = getFlag(args, '--stage', 'B');

        console.log(`📊 Generating report for Stage ${stage}...\n`);
        const reportFile = suite.generateReport(stage);

        console.log(`\n✅ Report generated!\n`);
        console.log(`📄 View report: ${reportFile}\n`);
        break;
      }

      default:
        console.error(`❌ Unknown command: ${command}\n`);
        printUsage();
        process.exit(1);
    }
  } catch (err) {
    console.error(`\n❌ ERROR: ${err.message}\n`);
    process.exit(1);
  }
}

main();
