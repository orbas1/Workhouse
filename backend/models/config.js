let config = {
  recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
  features: {
    liveChat: true,
    disputeResolution: true,
    notifications: true
  }
};

function getConfig() {
  return config;
}

function updateConfig(updates = {}) {
  if (updates.features) {
    config.features = { ...config.features, ...updates.features };
  }
  config = { ...config, ...updates, features: config.features };
  return config;
}

module.exports = { getConfig, updateConfig };
