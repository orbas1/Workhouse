const { getStatus, saveInstallation } = require('../models/installation');
const { addUser, findUser } = require('../models/user');
const logger = require('../utils/logger');
const mysql = require('mysql2/promise');

async function checkInstallation() {
  return getStatus();
}

async function testDbConnection(dbConfig = {}) {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
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

async function runInstallation({ dbConfig = {}, admin = {}, app = {} }) {
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
  const adminUser = addUser({
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
  });
  logger.info('Installation completed', { adminId: adminUser.id });
  return { installation: record, admin: adminUser };
}

module.exports = { checkInstallation, runInstallation, checkDatabase };
