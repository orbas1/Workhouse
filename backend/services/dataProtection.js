const logger = require('../utils/logger');
const model = require('../models/dataProtection');

async function updateProtectionPolicy(data) {
  const policy = model.updatePolicy(data);
  logger.info('Data protection policy updated', { version: policy.version });
  return policy;
}

async function getPrivacySettings(userId) {
  return model.getUserSettings(userId);
}

async function updatePrivacySettings(userId, settings) {
  const updated = model.updateUserSettings(userId, settings);
  logger.info('Privacy settings updated', { userId });
  return updated;
}

module.exports = {
  updateProtectionPolicy,
  getPrivacySettings,
  updatePrivacySettings,
};
