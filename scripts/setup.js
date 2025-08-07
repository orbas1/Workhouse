const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

const root = path.resolve(__dirname, '..');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: root });
}

const envPath = path.join(root, '.env');
const envExample = path.join(root, '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, envPath);
  console.log('Created .env from .env.example');
}

// Load environment variables so child processes inherit them
dotenv.config({ path: envPath });

// Ensure backend has an .env file for its config loader
const backendEnv = path.join(root, 'backend', '.env');
if (!fs.existsSync(backendEnv)) {
  fs.copyFileSync(envPath, backendEnv);
  console.log('Created backend/.env from .env');
}

console.log('Installing dependencies...');
run('npm install');

console.log('Running database migrations...');
run('npm run db:migrate --workspace backend');

console.log('Seeding sample data...');
run('npm run db:seed --workspace backend');

console.log('Setup complete!');
