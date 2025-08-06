const path = require('path');
const { exec } = require('child_process');

function setupEnvironment(type) {
  return new Promise((resolve, reject) => {
    const script = path.join(__dirname, '..', 'scripts', 'containerSetup.js');
    exec(`node ${script} ${type}`, (err, stdout, stderr) => {
      if (err) {
        return reject(new Error(stderr || err.message));
      }
      resolve(stdout.trim());
    });
  });
}

module.exports = { setupEnvironment };
