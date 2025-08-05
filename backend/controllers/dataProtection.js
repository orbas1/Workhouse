const {
  updateProtectionPolicy,
  getPrivacySettings,
  updatePrivacySettings,
} = require('../services/dataProtection');
const logger = require('../utils/logger');

async function protectionPolicyUpdateHandler(req, res) {
  try {
    const policy = await updateProtectionPolicy(req.body);
    res.status(200).json(policy);
  } catch (err) {
    logger.error('Failed to update protection policy', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getPrivacySettingsHandler(req, res) {
  try {
    const settings = await getPrivacySettings(req.user.username);
    res.json(settings);
  } catch (err) {
    logger.error('Failed to fetch privacy settings', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function updatePrivacySettingsHandler(req, res) {
  try {
    const settings = await updatePrivacySettings(req.user.username, req.body);
    res.json(settings);
  } catch (err) {
    logger.error('Failed to update privacy settings', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  protectionPolicyUpdateHandler,
  getPrivacySettingsHandler,
  updatePrivacySettingsHandler,
};
