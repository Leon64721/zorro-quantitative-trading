#!/usr/bin/env node

/**
 * Real-time training monitor - tracks progress of 500-strategy training
 */

const fs = require('fs');
const path = require('path');

const auditLogPath = './training-results/audit-log.txt';
const outputDir = './training-results';

function formatTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function getProgressBar(percent) {
  const filled = Math.round(percent / 5);
  const empty = 20 - filled;
  return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
}

function monitor() {
  console.clear();
  console.log('🤖 ZORRO AGENT TRAINING MONITOR');
  console.log('═════════════════════════════════════════════\n');

  try {
    // Read audit log if exists
    if (fs.existsSync(auditLogPath)) {
      const logContent = fs.readFileSync(auditLogPath, 'utf8');
      const lines = logContent.split('\n').filter(l => l.trim());

      if (lines.length > 0) {
        // Parse last entries
        const lastLine = lines[lines.length - 1];
        const processed = (logContent.match(/\[PROCESSED\]/g) || []).length;
        const valid = (logContent.match(/\[VALID\]/g) || []).length;
        const invalid = (logContent.match(/\[INVALID\]/g) || []).length;

        const percent = (processed / 500) * 100;

        console.log(`📊 Progress: ${processed}/500 strategies`);
        console.log(`${getProgressBar(percent)} ${percent.toFixed(1)}%\n`);

        console.log('📋 Status Summary:');
        console.log(`  ✅ Valid:   ${valid} (${(valid/Math.max(processed,1)*100).toFixed(1)}%)`);
        console.log(`  ❌ Invalid: ${invalid} (${(invalid/Math.max(processed,1)*100).toFixed(1)}%)`);
        console.log(`  ⏳ Remaining: ${500 - processed}\n`);

        // Estimate time remaining
        if (processed > 0) {
          const avgTimePerStrategy = 1000; // ~1 second mock
          const timeRemaining = (500 - processed) * avgTimePerStrategy;
          console.log(`⏱️  Estimated time remaining: ${formatTime(timeRemaining)}\n`);
        }

        // Show last few entries
        console.log('📝 Recent Activities:');
        lines.slice(-5).forEach(line => {
          if (line.includes('[VALID]')) {
            console.log(`  ✅ ${line.substring(0, 80)}`);
          } else if (line.includes('[INVALID]')) {
            console.log(`  ❌ ${line.substring(0, 80)}`);
          } else {
            console.log(`  ℹ️  ${line.substring(0, 80)}`);
          }
        });
      }
    } else {
      console.log('⏳ Waiting for training to start...');
    }

    // Check for generated reports
    console.log('\n📁 Generated Files:');
    if (fs.existsSync(path.join(outputDir, 'report', 'LEARNING_REPORT.json'))) {
      console.log('  ✅ LEARNING_REPORT.json');
    }
    if (fs.existsSync(path.join(outputDir, 'report', 'TRAINING_REPORT.md'))) {
      console.log('  ✅ TRAINING_REPORT.md');
    }
    if (fs.existsSync(path.join(outputDir, 'report', 'AUDIT_REPORT.json'))) {
      console.log('  ✅ AUDIT_REPORT.json');
    }

  } catch (error) {
    console.log('Error reading log:', error.message);
  }

  console.log('\n═════════════════════════════════════════════');
  console.log('Press Ctrl+C to stop monitoring');
  console.log('Refreshing every 5 seconds...\n');
}

// Initial run
monitor();

// Refresh every 5 seconds
setInterval(monitor, 5000);
