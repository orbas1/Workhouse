const { getUserSettings, updateUserSettings } = require('../services/settings');
const logger = require('../utils/logger');

async function getSettingsHandler(req, res) {
  try {
    const settings = await getUserSettings(req.user.id);
    res.json(settings);
  } catch (err) {
    logger.error('Failed to load settings', { error: err.message, userId: req.user.id });
    res.status(500).json({ error: 'Failed to load settings' });
  }
}

async function updateSettingsHandler(req, res) {
  try {
    const settings = await updateUserSettings(req.user.id, req.body);
    res.json(settings);
  } catch (err) {
    logger.error('Failed to update settings', { error: err.message, userId: req.user.id });
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getSettingsHandler, updateSettingsHandler };
