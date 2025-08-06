const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function escape(str) {
  return str.replace(/'/g, "''");
}

async function seedProducts() {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataPath)) return;
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const p of products) {
    const query = `INSERT INTO products (id, name, description, price, image) VALUES ('${escape(p.id)}', '${escape(p.name)}', '${escape(p.description)}', ${p.price}, '${escape(p.image)}') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, image = EXCLUDED.image;`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Seeded products');
}

async function run() {
  await seedProducts();
}

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
