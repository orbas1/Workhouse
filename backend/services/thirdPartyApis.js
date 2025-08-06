// Internal stubs replacing previous external demo integrations.

async function getVrCapabilities() {
  return { supported: false };
}

async function verifyIdentity() {
  return { verified: false };
}

async function getVisionOsSample() {
  return { sample: true };
}

async function getCloudflareTrace() {
  return { trace: 'local' };
}

async function fetchFromCdn(packageName = '') {
  return { package: packageName };
}

async function fetchCached(url = '') {
  return { url };
}

async function getPodcastSample() {
  return [];
}

async function getVoiceChatSample() {
  return { connected: false };
}

module.exports = {
  getVrCapabilities,
  verifyIdentity,
  getVisionOsSample,
  getCloudflareTrace,
  fetchFromCdn,
  fetchCached,
  getPodcastSample,
  getVoiceChatSample,
};

