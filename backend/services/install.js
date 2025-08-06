const { getStatus, saveInstallation } = require('../models/installation');
const { addUser, findUser } = require('../models/user');
const logger = require('../utils/logger');

async function checkInstallation() {
  return getStatus();
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

module.exports = { checkInstallation, runInstallation };
