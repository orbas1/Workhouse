const express = require('express');
const { getTrendingTopicsHandler, curateFeedHandler } = require('../controllers/contentDiscovery');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  trendingTopicsQuerySchema,
  curateFeedSchema,
} = require('../validation/contentDiscovery');

const router = express.Router();

router.get(
  '/content-discovery/trending-topics',
  auth,
  authorize('admin', 'manager', 'user'),
  validate(trendingTopicsQuerySchema, 'query'),
  getTrendingTopicsHandler
);

router.post(
  '/content-curation/curate-feed',
  auth,
  authorize('admin', 'manager', 'user'),
  validate(curateFeedSchema),
  curateFeedHandler
);

module.exports = router;
