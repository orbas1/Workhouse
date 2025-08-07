const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const envPath = path.join(__dirname, '..', '.env');
const logPath = path.join(__dirname, 'setup.log');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Load existing configuration if present
let current = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [k, v] = line.split('=');
    if (k) current[k.trim()] = v ? v.replace(/^"|"$/g, '').trim() : '';
  }
  console.log('Current configuration:');
  Object.entries(current).forEach(([k, v]) => console.log(`${k}=${v}`));
} else {
  console.log('No existing .env found. Using defaults.');
}

// Launch default browser to show the UI once setup completes
function openBrowser(url) {
  const start = process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
    ? 'start'
    : 'xdg-open';
  try {
    execSync(`${start} ${url}`);
  } catch (err) {
    console.error('Failed to open browser:', err.message);
  }
}

const questions = [
  { key: 'SITE_NAME', question: 'Site name', default: current.SITE_NAME || 'Workhouse' },
  { key: 'SITE_URL', question: 'Site URL', default: current.SITE_URL || 'http://localhost:5173' },
  { key: 'DB_TYPE', question: 'Database type (postgres/mysql)', default: current.DB_TYPE || 'postgres' },
  { key: 'DB_HOST', question: 'Database host', default: current.DB_HOST || 'localhost' },
  { key: 'DB_PORT', question: 'Database port', default: current.DB_PORT || '5432' },
  { key: 'DB_USER', question: 'Database user', default: current.DB_USER || 'workhouse' },
  { key: 'DB_PASSWORD', question: 'Database password', default: current.DB_PASSWORD || 'workhouse' },
  { key: 'DB_NAME', question: 'Database name', default: current.DB_NAME || 'workhouse' },
];

const answers = {};

function ask(index = 0) {
  if (index === questions.length) {
    const content =
      questions.map(q => `${q.key}=${JSON.stringify(answers[q.key])}`).join('\n') +
      `\nVITE_APP_URL=${JSON.stringify(answers.SITE_URL)}\n`;
    fs.writeFileSync(envPath, content);
    fs.appendFileSync(logPath, `${new Date().toISOString()}\n${content}\n`);
    console.log(`Created ${envPath}`);
    try {
      execSync('node scripts/dbSetup.js', { stdio: 'inherit' });
      execSync('node scripts/seedData.js', { stdio: 'inherit' });
      // open frontend for convenience
      openBrowser(answers.SITE_URL);
    } catch (err) {
      console.error('Setup scripts failed:', err.message);
    }
    rl.close();
    return;
  }
  const q = questions[index];
  if (q.key === 'DB_PORT') {
    q.default = answers.DB_TYPE === 'mysql' ? '3306' : (current.DB_PORT || '5432');
  }
  rl.question(`${q.question} (${q.default}): `, answer => {
    answers[q.key] = answer || q.default;
    ask(index + 1);
  });
}

ask();
