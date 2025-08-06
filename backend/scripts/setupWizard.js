const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

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
  { key: 'DB_TYPE', question: 'Database type (postgres/mysql)', default: 'postgres' },
  { key: 'DB_HOST', question: 'Database host', default: 'localhost' },
  { key: 'DB_PORT', question: 'Database port', default: '5432' },
  { key: 'DB_USER', question: 'Database user', default: 'workhouse' },
  { key: 'DB_PASSWORD', question: 'Database password', default: 'workhouse' },
  { key: 'DB_NAME', question: 'Database name', default: 'workhouse' },
];

const answers = {};

function ask(index = 0) {
  if (index === questions.length) {
    const envPath = path.join(__dirname, '..', '.env');
    const content =
      questions.map(q => `${q.key}=${JSON.stringify(answers[q.key])}`).join('\n') + '\n';
    fs.writeFileSync(envPath, content);
    console.log(`Created ${envPath}`);
    try {
      execSync('node scripts/dbSetup.js', { stdio: 'inherit' });
      execSync('node scripts/seedData.js', { stdio: 'inherit' });
      // open frontend for convenience
      openBrowser('http://localhost:5173');
    } catch (err) {
      console.error('Setup scripts failed:', err.message);
    }
    rl.close();
    return;
  }
  const q = questions[index];
  if (q.key === 'DB_PORT') {
    q.default = answers.DB_TYPE === 'mysql' ? '3306' : '5432';
  }
  rl.question(`${q.question} (${q.default}): `, answer => {
    answers[q.key] = answer || q.default;
    ask(index + 1);
  });
}

ask();
