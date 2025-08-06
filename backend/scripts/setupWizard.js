const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const questions = [
  { key: 'DB_HOST', question: 'Database host', default: 'localhost' },
  { key: 'DB_PORT', question: 'Database port', default: '3306' },
  { key: 'DB_USER', question: 'Database user', default: 'workhouse' },
  { key: 'DB_PASSWORD', question: 'Database password', default: 'workhouse' },
  { key: 'DB_NAME', question: 'Database name', default: 'workhouse' },
];

const answers = {};

function ask(index = 0) {
  if (index === questions.length) {
    const envPath = path.join(__dirname, '..', '.env');
    const content = questions.map(q => `${q.key}=${answers[q.key]}`).join('\n') + '\n';
    fs.writeFileSync(envPath, content);
    console.log(`Created ${envPath}`);
    try {
      execSync('node scripts/dbSetup.js', { stdio: 'inherit' });
      execSync('node scripts/seedData.js', { stdio: 'inherit' });
    } catch (err) {
      console.error('Setup scripts failed:', err.message);
    }
    rl.close();
    return;
  }
  const q = questions[index];
  rl.question(`${q.question} (${q.default}): `, answer => {
    answers[q.key] = answer || q.default;
    ask(index + 1);
  });
}

ask();
