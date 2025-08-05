const express = require('express');
const {
  getWebinarOverviewHandler,
  getWebinarDetailsHandler,
  getWebinarEngagementHandler,
  getBehaviorOverviewHandler,
  getUserBehaviorHandler,
  getPopularPagesHandler,
  getSessionDurationHandler,
  getUserFlowHandler,
  getUserSegmentsHandler,
  getBehaviorTrendsHandler,
  analyzeBehaviorPatternsHandler,
  predictUserBehaviorHandler,
  segmentUserBehaviorHandler,
} = require('../controllers/webinarAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  webinarIdParamSchema,
  userIdParamSchema,
  behaviorAnalysisSchema,
  behaviorPredictionSchema,
  behaviorSegmentationSchema,
} = require('../validation/webinarAnalytics');
const { checkWebinarExists } = require('../middleware/webinarAnalytics');

const router = express.Router();

// Webinar analytics routes
router.get('/overview', auth, authorize(['admin', 'content-manager']), getWebinarOverviewHandler);
router.get(
  '/details/:webinarId',
  auth,
  authorize(['admin', 'content-manager']),
  validate(webinarIdParamSchema, 'params'),
  checkWebinarExists,
  getWebinarDetailsHandler
);
router.get(
  '/engagement/:webinarId',
  auth,
  authorize(['admin', 'content-manager']),
  validate(webinarIdParamSchema, 'params'),
  checkWebinarExists,
  getWebinarEngagementHandler
);

// User behavior analytics routes
router.get('/behavior-overview', auth, authorize(['admin', 'analytics-manager']), getBehaviorOverviewHandler);
router.get('/behavior/:userId', auth, authorize(['admin', 'analytics-manager']), validate(userIdParamSchema, 'params'), getUserBehaviorHandler);
router.get('/popular-pages', auth, authorize(['admin', 'analytics-manager']), getPopularPagesHandler);
router.get('/session-duration', auth, authorize(['admin', 'analytics-manager']), getSessionDurationHandler);
router.get('/user-flow', auth, authorize(['admin', 'analytics-manager']), getUserFlowHandler);
router.get('/user-segments', auth, authorize(['admin', 'analytics-manager']), getUserSegmentsHandler);
router.get('/behavior-trends', auth, authorize(['admin', 'analytics-manager']), getBehaviorTrendsHandler);
router.post('/behavior-pattern-analysis', auth, authorize(['admin', 'analytics-manager']), validate(behaviorAnalysisSchema), analyzeBehaviorPatternsHandler);
router.post('/behavior-prediction', auth, authorize(['admin', 'analytics-manager']), validate(behaviorPredictionSchema), predictUserBehaviorHandler);
router.post('/behavior-segmentation', auth, authorize(['admin', 'analytics-manager']), validate(behaviorSegmentationSchema), segmentUserBehaviorHandler);

module.exports = router;
