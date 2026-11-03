import fs from 'fs';
import path from 'path';

const BANNED_WORDS = [
  'unleash',
  'elevate',
  'seamless',
  'cutting-edge',
  'state-of-the-art',
  'world-class',
  'revolutionize',
  'game-changing',
  'synergy',
  'holistic',
  'next-level',
  'passionate',
  'tailored solutions',
  'one-stop shop',
  "in today's fast-paced world",
];

const PLACEHOLDER_TERMS = [
  'lorem ipsum',
  'coming soon',
  'tba',
  'fixme',
  'todo',
  'placeholder text',
  'sample text',
];

const SCAN_DIRS = ['app', 'components', 'content', 'lib'];
let errorsFound = 0;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

  for (const word of BANNED_WORDS) {
    if (content.includes(word.toLowerCase())) {
      console.error(`[AUDIT FAILED] Banned word "${word}" found in: ${filePath}`);
      errorsFound++;
    }
  }

  for (const term of PLACEHOLDER_TERMS) {
    if (content.includes(term.toLowerCase())) {
      console.error(`[AUDIT FAILED] Placeholder term "${term}" found in: ${filePath}`);
      errorsFound++;
    }
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const safeName = path.basename(entry.name);
    // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
    const fullPath = path.resolve(dir, safeName);
    if (entry.isDirectory()) {
      if (safeName !== 'node_modules' && safeName !== '.next') {
        walk(fullPath);
      }
    } else if (/\.(tsx|ts|jsx|js|md|json)$/.test(safeName)) {
      scanFile(fullPath);
    }
  }
}

console.log('Running Content Guardrails Audit...');
for (const d of SCAN_DIRS) {
  if (fs.existsSync(d)) {
    walk(d);
  }
}

if (errorsFound > 0) {
  console.error(`Content audit failed with ${errorsFound} issues.`);
  process.exit(1);
} else {
  console.log('✔ Content audit passed: Zero banned words, zero placeholders found.');
  process.exit(0);
}
