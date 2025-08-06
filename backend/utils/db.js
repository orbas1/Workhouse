const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

let pool;

async function runMigrations(connection) {
  const dir = path.join(__dirname, '..', 'database');
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    try {
      await connection.query(sql);
      logger.info(`Executed ${file}`);
    } catch (err) {
      logger.error(`Error executing ${file}`, { error: err.message });
    }
  }
}

async function initDb(retries = 5, delay = 2000) {
  if (pool) return pool;
  while (retries) {
    try {
      pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'workhouse',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true
      });
      await pool.query('SELECT 1');
      await runMigrations(pool);
      logger.info('Database connection established');
      return pool;
    } catch (err) {
      logger.error('Database connection failed', { error: err.message });
      retries -= 1;
      if (!retries) {
        throw err;
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

function getPool() {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
}

async function query(sql, params) {
  const [rows] = await getPool().query(sql, params);
  return rows;
}

module.exports = { initDb, getPool, query };
