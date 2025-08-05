const express = require('express');
const { engagementHandler, postAnalyticsHandler } = require('../controllers/liveFeedAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { logAnalyticsAccess } = require('../middleware/liveFeedAnalytics');
const { dateRangeSchema, postIdParamSchema } = require('../validation/liveFeedAnalytics');

const router = express.Router();

router.get(
  '/engagement',
  auth,
  authorize('admin', 'content-manager'),
  logAnalyticsAccess,
  validate(dateRangeSchema, 'query'),
  engagementHandler
);

router.get(
  '/post/:postId',
  auth,
  authorize('admin', 'content-manager'),
  logAnalyticsAccess,
  validate(postIdParamSchema, 'params'),
  validate(dateRangeSchema, 'query'),
  postAnalyticsHandler
);

module.exports = router;
