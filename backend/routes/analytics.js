const express = require('express');
const {
  getAgencyEarningsHandler,
  getAgencyPerformanceHandler,
} = require('../controllers/analytics');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  agencyIdParamSchema,
  analyticsQuerySchema,
} = require('../validation/analytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  anomalySchema,
  feedbackSchema,
} = require('../validation/analytics');
const {
  getContentPerformanceHandler,
  getContentPerformanceByIdHandler,
  detectAnomaliesHandler,
  getContentTrendsHandler,
  getPopularContentHandler,
  getContentRecommendationsHandler,
  submitContentFeedbackHandler,
} = require('../controllers/analytics');

const router = express.Router();

router.get(
  '/:agencyId/analytics/earnings',
  auth,
  validate(agencyIdParamSchema, 'params'),
  validate(analyticsQuerySchema, 'query'),
  getAgencyEarningsHandler
);

router.get(
  '/:agencyId/analytics/performance',
  auth,
  validate(agencyIdParamSchema, 'params'),
  validate(analyticsQuerySchema, 'query'),
  getAgencyPerformanceHandler
  '/content/performance',
  auth,
  authorize('admin', 'content-manager'),
  getContentPerformanceHandler
);

router.get(
  '/content/performance/:contentId',
  auth,
  authorize('admin', 'content-manager'),
  getContentPerformanceByIdHandler
);

router.post(
  '/content/performance/anomalies',
  auth,
  authorize('admin', 'content-manager'),
  validate(anomalySchema),
  detectAnomaliesHandler
);

router.get(
  '/content/trends',
  auth,
  authorize('admin', 'content-manager'),
  getContentTrendsHandler
);

router.get(
  '/content/popular',
  auth,
  authorize('admin', 'content-manager'),
  getPopularContentHandler
);

router.get(
  '/content/recommendations',
  auth,
  authorize('admin', 'content-manager', 'user'),
  getContentRecommendationsHandler
);

router.post(
  '/content/feedback',
  auth,
  authorize('admin', 'content-manager', 'user'),
  validate(feedbackSchema),
  submitContentFeedbackHandler
);

module.exports = router;
