require('../config/env');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function getClient() {
  const database = process.env.DB_NAME || 'workhouse';
  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
  return new Client({ host, user, password, port, database });
}

async function clearUsers(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'users.json');
  if (!fs.existsSync(dataPath)) return;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const u of users) {
    await client.query('DELETE FROM users WHERE id=$1', [u.id]);
  }
  console.log('Cleared users');
}

async function clearProducts(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataPath)) return;
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const p of products) {
    await client.query('DELETE FROM products WHERE id=$1', [p.id]);
  }
  console.log('Cleared products');
}

async function clearProfiles(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'profiles.json');
  if (!fs.existsSync(dataPath)) return;
  const profiles = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const p of profiles) {
    await client.query('DELETE FROM profiles WHERE id=$1', [p.id]);
  }
  console.log('Cleared profiles');
}

async function run() {
  const client = getClient();
  await client.connect();
  try {
    await clearUsers(client);
    await clearProducts(client);
    await clearProfiles(client);
  } finally {
    await client.end();
  }
}

run().catch(err => {
  console.error('Clearing failed:', err);
  process.exit(1);
});
