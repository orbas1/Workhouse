const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function runMigrations() {
  const dbName = process.env.DB_NAME || 'workhouse';
  const psql = (command) => {
    execSync(`sudo -u postgres psql -d ${dbName} -c "${command}"`, { stdio: 'inherit' });
  };

  // Ensure required extensions are present
  psql('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  const dir = path.join(__dirname, '..', 'database');
  const files = fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.sql') && f !== 'database.sql')
    .sort();

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      execSync(`sudo -u postgres psql -d ${dbName} -f "${filePath}"`, { stdio: 'inherit' });
      console.log(`Executed ${file}`);
    } catch (err) {
      console.error(`Error executing ${file}: ${err.stderr?.toString().trim() || err.message}`);
    }
  }
}

runMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
