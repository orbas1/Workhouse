const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'workhouse',
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
  });

  const dir = path.join(__dirname, '..', 'database');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    try {
      await connection.query(sql);
      console.log(`Executed ${file}`);
    } catch (err) {
      console.error(`Error executing ${file}: ${err.message}`);
    }
  }

  await connection.end();
}

runMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
