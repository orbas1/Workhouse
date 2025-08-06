const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function seedProducts(connection) {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataPath)) return;
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  for (const p of products) {
    await connection.query(
      'INSERT INTO products (id, name, description, price, image) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), price=VALUES(price), image=VALUES(image)',
      [p.id, p.name, p.description, p.price, p.image]
    );
  }
  console.log('Seeded products');
}

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'workhouse',
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
  });

  await seedProducts(connection);
  await connection.end();
}

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
