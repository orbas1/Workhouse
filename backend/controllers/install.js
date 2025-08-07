const { checkInstallation, runInstallation, checkDatabase, checkPermissions } = require('../services/install');
const logger = require('../utils/logger');

async function getStatus(req, res) {
  try {
    const status = await checkInstallation();
    res.json(status);
  } catch (err) {
    logger.error('Failed to check installation status', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function install(req, res) {
  try {
    const result = await runInstallation(req.body);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Installation failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function checkDb(req, res) {
  try {
    const result = await checkDatabase(req.body.dbConfig || {});
    res.json(result);
  } catch (err) {
    logger.error('Database check failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function permissions(req, res) {
  try {
    const result = await checkPermissions();
    res.json(result);
  } catch (err) {
    logger.error('Permission check failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getStatus, install, checkDb, permissions };
