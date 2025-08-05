const {
  getVrCapabilities,
  verifyIdentity,
  getVisionOsSample,
  getCloudflareTrace,
  fetchFromCdn,
  fetchCached,
  getPodcastSample,
  getVoiceChatSample,
} = require('../services/thirdPartyApis');
const logger = require('../utils/logger');

async function vrHandler(req, res) {
  try {
    const data = await getVrCapabilities();
    res.json(data);
  } catch (err) {
    logger.error('VR compatibility API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch VR compatibility information' });
  }
}

async function identityHandler(req, res) {
  try {
    const data = await verifyIdentity();
    res.json(data);
  } catch (err) {
    logger.error('Identity verification API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to verify identity' });
  }
}

async function visionOsHandler(req, res) {
  try {
    const data = await getVisionOsSample();
    res.json(data);
  } catch (err) {
    logger.error('Vision OS API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch Vision OS data' });
  }
}

async function cloudflareHandler(req, res) {
  try {
    const data = await getCloudflareTrace();
    res.send(data);
  } catch (err) {
    logger.error('Cloudflare API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to reach Cloudflare' });
  }
}

async function cdnHandler(req, res) {
  try {
    const pkg = req.query.package;
    const data = await fetchFromCdn(pkg);
    res.send(data);
  } catch (err) {
    logger.error('CDN API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch CDN resource' });
  }
}

async function cacheHandler(req, res) {
  try {
    const target = req.query.url;
    const data = await fetchCached(target);
    res.send(data);
  } catch (err) {
    logger.error('Cache API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch cached content' });
  }
}

async function podcastHandler(req, res) {
  try {
    const data = await getPodcastSample();
    res.json(data);
  } catch (err) {
    logger.error('Podcast API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch podcast data' });
  }
}

async function voiceHandler(req, res) {
  try {
    const data = await getVoiceChatSample();
    res.json(data);
  } catch (err) {
    logger.error('Voice chat API failed', { error: err.message });
    res.status(500).json({ error: 'Failed to access voice chat service' });
  }
}

module.exports = {
  vrHandler,
  identityHandler,
  visionOsHandler,
  cloudflareHandler,
  cdnHandler,
  cacheHandler,
  podcastHandler,
  voiceHandler,
};

