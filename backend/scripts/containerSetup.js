const { execSync } = require('child_process');

const type = process.argv[2];
if (!type) {
  console.error('Usage: node containerSetup.js <n8n|ide>');
  process.exit(1);
}

const host = process.env.EC2_HOST;
const user = process.env.EC2_USER;
const key = process.env.SSH_KEY_PATH;

if (!host || !user || !key) {
  console.error('Missing EC2_HOST, EC2_USER, or SSH_KEY_PATH environment variables');
  process.exit(1);
}

const commands = {
  n8n: 'docker run -d --name n8n -p 5678:5678 n8nio/n8n',
  ide: 'docker run -d --name code-server -p 8080:8080 codercom/code-server:latest'
};

const remoteCmd = commands[type];
if (!remoteCmd) {
  console.error(`Unknown environment type: ${type}`);
  process.exit(1);
}

const sshCommand = `ssh -i ${key} ${user}@${host} "${remoteCmd}"`;

try {
  const output = execSync(sshCommand, { stdio: 'pipe' }).toString();
  console.log(output);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
