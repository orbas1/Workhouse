const { getConfig, updateConfig } = require('../models/config');
const logger = console;

function getConfigHandler(req, res) {
  try {
    res.json(getConfig());
  } catch (err) {
    logger.error('Failed to load config', { error: err.message });
    res.status(500).json({ error: 'Failed to load config' });
  }
}

function updateConfigHandler(req, res) {
  try {
    const user = req.user || {};
    const isAdmin = user.role === 'admin' || (Array.isArray(user.roles) && user.roles.includes('admin'));
    if (!isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = updateConfig(req.body);
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update config', { error: err.message });
    res.status(500).json({ error: 'Failed to update config' });
  }
}

module.exports = { getConfigHandler, updateConfigHandler };
