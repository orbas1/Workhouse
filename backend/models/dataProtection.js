const { randomUUID } = require('crypto');

let currentPolicy = null;
const privacySettings = new Map();

function updatePolicy({ version, policy }) {
  const record = {
    id: randomUUID(),
    version,
    policy,
    updatedAt: new Date(),
  };
  currentPolicy = record;
  return record;
}

function getPolicy() {
  return currentPolicy;
}

function getUserSettings(userId) {
  return (
    privacySettings.get(userId) || {
      marketingEmails: true,
      dataSharing: false,
      personalizedAds: false,
    }
  );
}

function updateUserSettings(userId, updates) {
  const existing = getUserSettings(userId);
  const newSettings = { ...existing, ...updates, updatedAt: new Date() };
  privacySettings.set(userId, newSettings);
  return newSettings;
}

module.exports = {
  updatePolicy,
  getPolicy,
  getUserSettings,
  updateUserSettings,
};
