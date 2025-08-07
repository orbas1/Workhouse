const { getStatus, saveInstallation } = require('../models/installation');
const { addUser, findUser } = require('../models/user');
const logger = require('../utils/logger');
const mysql = require('mysql2/promise');
const { Client } = require('pg');
const fs = require('fs/promises');
const path = require('path');
const { initDb } = require('../utils/db');

async function checkInstallation() {
  return getStatus();
}

async function testDbConnection(dbConfig = {}) {
  const type = (dbConfig.type || 'mysql').toLowerCase();
  if (type === 'postgres') {
    const client = new Client({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.name,
      port: dbConfig.port,
    });
    await client.connect();
    await client.end();
    return;
  }
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    port: dbConfig.port,
  });
  await connection.ping();
  await connection.end();
}

async function checkDatabase(dbConfig = {}) {
  try {
    await testDbConnection(dbConfig);
    return { ok: true };
  } catch (err) {
    logger.error('Database connection failed', { error: err.message });
    throw new Error('Failed to connect to database: ' + err.message);
  }
}


async function writeEnvFile({ dbConfig = {}, site = {} }) {
  const envPath = path.join(__dirname, '../.env');
  const content = [
    `SITE_NAME=${site.name || ''}`,
    `SITE_URL=${site.url || ''}`,
    `DB_TYPE=${dbConfig.type || 'mysql'}`,
    `DB_HOST=${dbConfig.host || ''}`,
    `DB_PORT=${dbConfig.port || ''}`,
    `DB_USER=${dbConfig.user || ''}`,
    `DB_PASSWORD=${dbConfig.password || ''}`,
    `DB_NAME=${dbConfig.name || ''}`,
  ].join('\n');
  await fs.writeFile(envPath, content);
}

async function runInstallation({ dbConfig = {}, admin = {}, app = {}, site = {} }) {
  const status = getStatus();
  if (status.installed) {
    throw new Error('Application is already installed');
  }
  if (!admin.username || !admin.password) {
    throw new Error('Admin username and password are required');
  }
  if (findUser(admin.username)) {
    throw new Error('Admin user already exists');
  }
  await testDbConnection(dbConfig);

  Object.assign(process.env, {
    DB_TYPE: (dbConfig.type || 'mysql').toLowerCase(),
    DB_HOST: dbConfig.host,
    DB_PORT: dbConfig.port,
    DB_USER: dbConfig.user,
    DB_PASSWORD: dbConfig.password || '',
    DB_NAME: dbConfig.name,
  });

  await writeEnvFile({ dbConfig, site });
  await initDb();

  const adminUser = await addUser({
    username: admin.username,
    password: admin.password,
    role: 'admin',
    email: admin.email || admin.username,
    fullName: admin.fullName || '',
  });
  const record = saveInstallation({
    appId: app.appId || 'workhouse',
    appUrl: app.appUrl || '',
    dbConfig,
    site,
  });
  logger.info('Installation completed', { adminId: adminUser.id });
  return { installation: record, admin: adminUser };
}
async function checkPermissions() {
  const paths = [
    path.join(__dirname, '../data'),
    path.join(__dirname, '../logs'),
  ];
  const details = await Promise.all(
    paths.map(async p => {
      try {
        await fs.access(p, fs.constants.W_OK);
        return { path: p, writable: true };
      } catch {
        return { path: p, writable: false };
      }
    })
  );
  const ok = details.every(d => d.writable);
  return { ok, details };
}

module.exports = { checkInstallation, runInstallation, checkDatabase, checkPermissions };
