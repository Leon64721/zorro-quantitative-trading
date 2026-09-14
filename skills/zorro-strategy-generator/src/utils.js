/**
 * Utility functions for ZORRO Strategy Generator
 */

const fs = require('fs');
const path = require('path');

/**
 * Load knowledge graph from JSON
 */
function loadKnowledgeGraph(graphPath) {
  try {
    const data = fs.readFileSync(graphPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to load knowledge graph: ${error.message}`);
    throw error;
  }
}

/**
 * Load corpus index (markdown files)
 */
function loadCorpusIndex(corpusDir) {
  try {
    const files = fs.readdirSync(corpusDir)
      .filter(f => f.endsWith('.md'))
      .map(f => ({
        name: f.replace('.md', ''),
        path: path.join(corpusDir, f)
      }));
    return files;
  } catch (error) {
    console.error(`Failed to load corpus index: ${error.message}`);
    throw error;
  }
}

/**
 * Extract key terms from description
 */
function extractTerms(description) {
  // Remove common words
  const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'when', 'if', 'as', 'is', 'are', 'be', 'have', 'has',
    'create', 'strategy', 'buy', 'sell', 'using', 'with'
  ]);

  const terms = description
    .toLowerCase()
    .split(/[\s,\.;:]+/)
    .filter(t => t.length > 2 && !stopwords.has(t));

  return [...new Set(terms)]; // Remove duplicates
}

/**
 * Find similar concepts in knowledge graph
 */
function findSimilarConcepts(graph, searchTerms, topN = 10) {
  const nodes = graph.nodes || [];
  const scores = {};

  // Score each node based on matching terms
  nodes.forEach(node => {
    let score = 0;
    const nodeName = (node.id || '').toLowerCase();
    const nodeLabel = (node.label || '').toLowerCase();

    searchTerms.forEach(term => {
      if (nodeName.includes(term)) score += 2;
      if (nodeLabel.includes(term)) score += 1;
    });

    if (score > 0) {
      scores[node.id] = { node, score };
    }
  });

  // Sort by score and return top N
  return Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(item => item.node);
}

/**
 * Get related functions from corpus
 */
function getRelatedFunctions(corpusPath, indicators) {
  const functions = [];

  indicators.forEach(indicator => {
    const filePath = path.join(corpusPath, `${indicator.toLowerCase()}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      functions.push({
        name: indicator,
        content: content,
        path: filePath
      });
    }
  });

  return functions;
}

/**
 * Validate Lite-C syntax (basic checks)
 */
function validateLiteCSyntax(code) {
  const errors = [];

  // Check balanced braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Brace mismatch: ${openBraces} opening, ${closeBraces} closing`);
  }

  // Check for function run()
  if (!code.includes('function run()')) {
    errors.push('Missing function run()');
  }

  // Check for semicolons after statements
  const lines = code.split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.length === 0) return;
    if (!trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
      // Some exceptions
      if (!trimmed.includes('if') && !trimmed.includes('for') && !trimmed.includes('while')) {
        // errors.push(`Line ${idx + 1}: Missing semicolon`);
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Validate ZORRO-specific requirements
 */
function validateZORRORequirements(code) {
  const errors = [];
  const warnings = [];

  // Check required configuration
  if (!code.includes('BarPeriod =')) {
    errors.push('Missing BarPeriod configuration');
  }
  if (!code.includes('asset(')) {
    errors.push('Missing asset() call');
  }
  if (!code.includes('StartDate')) {
    errors.push('Missing StartDate');
  }
  if (!code.includes('EndDate')) {
    errors.push('Missing EndDate');
  }

  // Check for proper series usage
  if (code.includes('Close[')) {
    if (!code.includes('series(')) {
      warnings.push('Using array syntax without series() - may cause issues');
    }
  }

  // Check for deprecated functions
  const deprecated = ['MA(', 'close()', 'Profit', 'setProfit('];
  deprecated.forEach(func => {
    if (code.includes(func)) {
      errors.push(`Deprecated function: ${func}`);
    }
  });

  // Check for proper entry/exit
  if (!code.includes('enterLong') && !code.includes('enterShort')) {
    warnings.push('No entry logic found - strategy may not generate trades');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate unique strategy filename
 */
function generateStrategyFilename(description, timestamp = new Date()) {
  const date = timestamp.toISOString().split('T')[0].replace(/-/g, '');
  const words = description
    .split(/[\s,\.;:]+/)
    .filter(w => w.length > 0)
    .slice(0, 5)
    .join('_')
    .toUpperCase()
    .substring(0, 20);

  return `STRATEGY_${words}_${date}.c`;
}

/**
 * Format code with proper indentation
 */
function formatCode(code) {
  const lines = code.split('\n');
  let indentLevel = 0;
  const formatted = [];

  lines.forEach(line => {
    const trimmed = line.trim();

    // Decrease indent for closing braces
    if (trimmed.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Add indented line
    if (trimmed.length > 0) {
      formatted.push('    '.repeat(indentLevel) + trimmed);
    } else {
      formatted.push('');
    }

    // Increase indent for opening braces
    if (trimmed.endsWith('{')) {
      indentLevel++;
    }
  });

  return formatted.join('\n');
}

/**
 * Log strategy generation event
 */
function logEvent(eventType, details, logPath = './skills/zorro-strategy-generator/logs/generation-log.txt') {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${eventType}: ${JSON.stringify(details)}\n`;

  try {
    const dir = path.dirname(logPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFileSync(logPath, logEntry);
  } catch (error) {
    console.error(`Failed to write log: ${error.message}`);
  }
}

module.exports = {
  loadKnowledgeGraph,
  loadCorpusIndex,
  extractTerms,
  findSimilarConcepts,
  getRelatedFunctions,
  validateLiteCSyntax,
  validateZORRORequirements,
  generateStrategyFilename,
  formatCode,
  logEvent
};
