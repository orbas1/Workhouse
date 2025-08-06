// In-memory user notification settings
const settingsStore = new Map();

function getSettings(userId) {
  if (!settingsStore.has(userId)) {
    settingsStore.set(userId, { email: true, sms: false, push: true });
  }
  return settingsStore.get(userId);
}

function updateSettings(userId, updates) {
  const current = getSettings(userId);
  const newSettings = { ...current, ...updates };
  settingsStore.set(userId, newSettings);
  return newSettings;
}

module.exports = {
  getSettings,
  updateSettings,
};
