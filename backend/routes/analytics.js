const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const analyticsMiddleware = require('../middleware/analytics');
const {
  agencyIdParamSchema,
  analyticsQuerySchema,
  anomalySchema,
  feedbackSchema,
  pathIdParamSchema,
  userIdParamSchema,
} = require('../validation/analytics');
const {
  getAgencyEarningsHandler,
  getAgencyPerformanceHandler,
  getContentPerformanceHandler,
  getContentPerformanceByIdHandler,
  detectAnomaliesHandler,
  getContentTrendsHandler,
  getPopularContentHandler,
  getContentRecommendationsHandler,
  submitContentFeedbackHandler,
  getPathAnalyticsHandler,
  getUserAnalyticsHandler,
  getSkillsAnalyticsHandler,
  getPredictionsHandler,
} = require('../controllers/analytics');

const router = express.Router();

// Agency analytics routes
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
);

// Content analytics routes
router.get(
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

// Learning analytics routes
router.get(
  '/paths/:pathId',
  auth,
  validate(pathIdParamSchema, 'params'),
  analyticsMiddleware.ensurePathAnalytics,
  getPathAnalyticsHandler
);

router.get(
  '/user/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  analyticsMiddleware.ensureUserAnalytics,
  getUserAnalyticsHandler
);

router.get(
  '/skills/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  analyticsMiddleware.ensureUserAnalytics,
  getSkillsAnalyticsHandler
);

router.get(
  '/predictions/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  analyticsMiddleware.ensureUserAnalytics,
  getPredictionsHandler
);

module.exports = router;

