const fs = require('fs');
const path = require('path');
const net = require('net');
const { Client } = require('pg');
const mysql = require('mysql2/promise');

async function runMigrations() {
  const dbName = process.env.DB_NAME || 'workhouse';
  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const port = process.env.DB_PORT || 5432;
  const type = (process.env.DB_TYPE || 'postgres').toLowerCase();

  if (net.isIP(host) === 6) {
    throw new Error('IPv6 addresses are not supported for DB_HOST');
  }

  const dir = path.join(__dirname, '..', 'database');
  const files = fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  if (type === 'mysql') {
    const admin = await mysql.createConnection({ host, user, password, port, multipleStatements: true });
    await admin.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await admin.end();

    const client = await mysql.createConnection({ host, user, password, port, database: dbName, multipleStatements: true });
    for (const file of files) {
      const filePath = path.join(dir, file);
      let sql = fs.readFileSync(filePath, 'utf8');
      sql = sql
        .split('\n')
        .filter(line => !line.trim().startsWith('\\i'))
        .join('\n');

      if (!sql.trim()) {
        console.log(`Skipped ${file}`);
        continue;
      }

      try {
        await client.query(sql);
        console.log(`Executed ${file}`);
      } catch (err) {
        console.error(`Error executing ${file}: ${err.message}`);
      }
    }
    await client.end();
    return;
  }

  // default to postgres
  const adminClient = new Client({ host, user, password, port, database: 'postgres' });
  await adminClient.connect();
  const exists = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
  if (exists.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE "${dbName}"`);
  }
  await adminClient.end();

  const client = new Client({ host, user, password, port, database: dbName });
  await client.connect();

  // ensure required extensions
  await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  for (const file of files) {
    const filePath = path.join(dir, file);
    let sql = fs.readFileSync(filePath, 'utf8');
    sql = sql
      .split('\n')
      .filter(line => !line.trim().startsWith('\\i'))
      .join('\n');

    if (!sql.trim()) {
      console.log(`Skipped ${file}`);
      continue;
    }

    try {
      await client.query(sql);
      console.log(`Executed ${file}`);
    } catch (err) {
      console.error(`Error executing ${file}: ${err.message}`);
    }
  }

  await client.end();
}

runMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
