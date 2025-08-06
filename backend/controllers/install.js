const { checkInstallation, runInstallation } = require('../services/install');
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

module.exports = { getStatus, install };
