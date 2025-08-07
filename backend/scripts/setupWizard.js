const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync, spawn } = require('child_process');

const envPath = path.join(__dirname, '..', '.env');
const logPath = path.join(__dirname, 'setup.log');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}`;
  console.log(line);
  fs.appendFileSync(logPath, line + '\n');
}

// Load existing configuration if present
let current = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [k, v] = line.split('=');
    if (k) current[k.trim()] = v ? v.replace(/^"|"$/g, '').trim() : '';
  }
  log('Current configuration:');
  Object.entries(current).forEach(([k, v]) => log(`${k}=${v}`));
} else {
  log('No existing .env found. Using defaults.');
}

// Launch default browser to show the UI once setup completes
function openBrowser(url) {
  const start = process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
    ? 'start'
    : 'xdg-open';
  try {
    const child = spawn(start, [url], {
      stdio: 'ignore',
      detached: true,
    });
    child.unref();
  } catch (err) {
    log(`Failed to open browser: ${err.message}`);
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
  { key: 'ENABLE_SSL', question: 'Enable HTTPS? (y/N)', default: current.ENABLE_SSL || 'n' },
  {
    key: 'SSL_CERT',
    question: 'Path to SSL certificate',
    default: current.SSL_CERT || '/path/to/cert.pem',
    when: a => a.ENABLE_SSL && a.ENABLE_SSL.toLowerCase().startsWith('y'),
  },
  {
    key: 'SSL_KEY',
    question: 'Path to SSL key',
    default: current.SSL_KEY || '/path/to/key.pem',
    when: a => a.ENABLE_SSL && a.ENABLE_SSL.toLowerCase().startsWith('y'),
  },
  { key: 'GOOGLE_CLIENT_ID', question: 'Google OAuth Client ID', default: current.GOOGLE_CLIENT_ID || '' },
  { key: 'GOOGLE_CLIENT_SECRET', question: 'Google OAuth Client Secret', default: current.GOOGLE_CLIENT_SECRET || '' },
  { key: 'GOOGLE_REDIRECT_URI', question: 'Google OAuth Redirect URI', default: current.GOOGLE_REDIRECT_URI || 'http://localhost:5173/oauth2callback' },
  { key: 'FIREBASE_PROJECT_ID', question: 'Firebase project ID', default: current.FIREBASE_PROJECT_ID || '' },
  { key: 'FIREBASE_CLIENT_EMAIL', question: 'Firebase client email', default: current.FIREBASE_CLIENT_EMAIL || '' },
  { key: 'FIREBASE_PRIVATE_KEY', question: 'Firebase private key', default: current.FIREBASE_PRIVATE_KEY || '' },
];

const answers = {};
function ask(index = 0) {
  if (index === questions.length) {
    const content =
      questions
        .filter(q => !q.when || q.when(answers))
        .map(q => `${q.key}=${JSON.stringify(answers[q.key])}`)
        .join('\n') +
      `\nVITE_APP_URL=${JSON.stringify(answers.SITE_URL)}\n`;
    fs.writeFileSync(envPath, content);
    log(`Created ${envPath}`);
    fs.appendFileSync(logPath, content + '\n');

    const steps = [
      { label: 'Running database migrations', cmd: 'node scripts/dbSetup.js' },
      { label: 'Seeding database', cmd: 'node scripts/seedData.js' },
      {
        label: 'Starting backend with pm2',
        cmd: 'npx pm2 start app.js --name workhouse',
        options: { cwd: path.join(__dirname, '..') },
      },
      { label: 'Checking pm2 status', cmd: 'npx pm2 status workhouse' },
    ];

    function runStep(i = 0) {
      if (i === steps.length) {
        log(`Opening browser at ${answers.SITE_URL}`);
        openBrowser(answers.SITE_URL);
        log('Setup complete');
        rl.close();
        process.exit(0);
        return;
      }

      const step = steps[i];
      rl.question(`Step ${i + 1}/${steps.length}: ${step.label}? (Y/n) `, answer => {
        if (answer.trim().toLowerCase().startsWith('n')) {
          log(`Skipped ${step.label}`);
          runStep(i + 1);
          return;
        }
        try {
          execSync(step.cmd, { stdio: 'inherit', ...(step.options || {}) });
          log(`Finished ${step.label}`);
        } catch (err) {
          log(`${step.label} failed: ${err.message}`);
        }
        runStep(i + 1);
      });
    }

    runStep();
    return;
  }
  const q = questions[index];
  if (q.when && !q.when(answers)) {
    ask(index + 1);
    return;
  }
  if (q.key === 'DB_PORT') {
    q.default = answers.DB_TYPE === 'mysql' ? '3306' : current.DB_PORT || '5432';
  }
  rl.question(`(${index + 1}/${questions.length}) ${q.question} (${q.default}): `, answer => {
    answers[q.key] = answer || q.default;
    log(`Set ${q.key}`);
    ask(index + 1);
  });
}

log('Starting setup wizard');
ask();
