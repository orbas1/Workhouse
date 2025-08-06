const {
  getSettingsByUserId,
  updateSettingsByUserId,
} = require('../models/settings');

async function getUserSettings(userId) {
  return getSettingsByUserId(userId);
}

async function updateUserSettings(userId, data) {
  return updateSettingsByUserId(userId, data);
}

module.exports = { getUserSettings, updateUserSettings };
