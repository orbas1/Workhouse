const express = require('express');
const {
  vrHandler,
  identityHandler,
  visionOsHandler,
  cloudflareHandler,
  cdnHandler,
  cacheHandler,
  podcastHandler,
  voiceHandler,
} = require('../controllers/thirdPartyApis');

const router = express.Router();

router.get('/vr', vrHandler);
router.get('/identity', identityHandler);
router.get('/visionos', visionOsHandler);
router.get('/cloudflare', cloudflareHandler);
router.get('/cdn', cdnHandler);
router.get('/cache', cacheHandler);
router.get('/podcast', podcastHandler);
router.get('/voice', voiceHandler);

module.exports = router;

