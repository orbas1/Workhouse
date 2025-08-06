const settings = {
  liveChatEnabled: true,
  disputeResolutionEnabled: true,
};

function getSettings() {
  return settings;
}

function updateSettings(updates = {}) {
  Object.assign(settings, updates);
  return settings;
}

module.exports = { getSettings, updateSettings };
