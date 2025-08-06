const settingsStore = new Map();

function getSettingsByUserId(userId) {
  return (
    settingsStore.get(userId) || {
      fullName: '',
      email: '',
      phone: '',
      profileVisibility: 'public',
      notifications: { jobUpdates: true, messages: true },
      language: 'en',
      region: 'UTC',
    }
  );
}

function updateSettingsByUserId(userId, data) {
  const current = getSettingsByUserId(userId);
  const updated = {
    ...current,
    ...data,
    notifications: { ...current.notifications, ...(data.notifications || {}) },
  };
  settingsStore.set(userId, updated);
  return updated;
}

module.exports = { getSettingsByUserId, updateSettingsByUserId };
