const fs = require('fs');
const readline = require('readline');
const { setupN8n } = require('../services/n8nSetup');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const questions = [
  { key: 'host', q: 'Server host:' },
  { key: 'username', q: 'SSH username:' },
  { key: 'keyPath', q: 'Path to private SSH key:' },
];

const answers = {};

function ask(i = 0) {
  if (i === questions.length) {
    try {
      const key = fs.readFileSync(answers.keyPath, 'utf8');
      setupN8n({ host: answers.host, username: answers.username, key })
        .then(() => {
          console.log('n8n setup complete');
          rl.close();
        })
        .catch(err => {
          console.error('Setup failed:', err.message);
          rl.close();
        });
    } catch (err) {
      console.error('Failed to read key file', err.message);
      rl.close();
    }
    return;
  }
  rl.question(`${questions[i].q} `, answer => {
    answers[questions[i].key] = answer.trim();
    ask(i + 1);
  });
}

ask();
