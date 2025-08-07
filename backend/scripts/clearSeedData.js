const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function escape(str) {
  return str.replace(/'/g, "''");
}

async function clearUsers() {
  const dataPath = path.join(__dirname, '..', 'data', 'users.json');
  if (!fs.existsSync(dataPath)) return;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const u of users) {
    const query = `DELETE FROM users WHERE id='${escape(u.id)}';`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Cleared users');
}

async function clearProducts() {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataPath)) return;
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const p of products) {
    const query = `DELETE FROM products WHERE id='${escape(p.id)}';`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Cleared products');
}

async function clearProfiles() {
  const dataPath = path.join(__dirname, '..', 'data', 'profiles.json');
  if (!fs.existsSync(dataPath)) return;
  const profiles = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const p of profiles) {
    const query = `DELETE FROM profiles WHERE id='${escape(p.id)}';`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Cleared profiles');
}

async function run() {
  await clearUsers();
  await clearProducts();
  await clearProfiles();
}

run().catch(err => {
  console.error('Clearing failed:', err);
  process.exit(1);
});
