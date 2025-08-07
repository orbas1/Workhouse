const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

// This script mirrors the steps performed by the browser-based installer.
// It is intended for automated environments or developers who prefer a
// non-interactive setup. For most cases, `npm start` followed by visiting
// `/install` in the browser provides a guided installation.

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

// Basic check to ensure database credentials are present
const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing ${key} in .env. Please configure database credentials before running setup.`);
    process.exit(1);
  }
}

console.log('Installing dependencies...');
run('npm install');

console.log('Running database migrations...');
run('./db_setup');

console.log('Seeding sample data...');
run('npm run db:seed --workspace backend');

console.log('Setup complete!');
