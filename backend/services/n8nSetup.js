const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

function runRemoteInstall({ host, username, key, port = 22, n8nPort = 5678 }) {
  return new Promise((resolve, reject) => {
    const keyPath = path.join(os.tmpdir(), `n8n_key_${Date.now()}`);
    fs.writeFileSync(keyPath, key, { mode: 0o600 });
    const installCmd = `docker run -d --restart always --name n8n -p ${n8nPort}:5678 n8nio/n8n`;
    const sshCmd = `ssh -i ${keyPath} -p ${port} -o StrictHostKeyChecking=no ${username}@${host} '${installCmd}'`;
    exec(sshCmd, (error, stdout, stderr) => {
      fs.unlinkSync(keyPath);
      if (error) {
        return reject(new Error(stderr.trim() || error.message));
      }
      resolve(stdout.trim());
    });
  });
}

async function setupN8n({ host, username, key, port, n8nPort }) {
  if (!host || !username || !key) {
    throw new Error('Missing required parameters');
  }
  await runRemoteInstall({ host, username, key, port, n8nPort });
}

module.exports = { setupN8n };
