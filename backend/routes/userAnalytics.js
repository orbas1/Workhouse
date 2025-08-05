const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const parseDateRange = require('../middleware/userAnalytics');
const {
  userIdParamSchema,
  dateRangeQuerySchema,
  behaviorPatternAnalysisSchema,
  behaviorPredictionSchema,
  behaviorSegmentationSchema,
} = require('../validation/userAnalytics');
const controller = require('../controllers/userAnalytics');

const router = express.Router();

router.get('/engagement-overview',
  auth,
  authorize('admin', 'user-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getEngagementOverview
);

router.get('/activity/:userId',
  auth,
  authorize('admin', 'user-manager'),
  validate(userIdParamSchema, 'params'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getUserActivity
);

router.get('/conversion-rates',
  auth,
  authorize('admin', 'marketing-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getConversionRates
);

router.get('/demographics',
  auth,
  authorize('admin', 'marketing-manager'),
  controller.getDemographics
);

router.get('/behavior-overview',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getBehaviorOverview
);

router.get('/behavior/:userId',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(userIdParamSchema, 'params'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getUserBehavior
);

router.get('/popular-pages',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getPopularPages
);

router.get('/session-duration',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getSessionDurationAnalytics
);

router.get('/user-flow',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getUserFlowAnalytics
);

router.get('/user-segments',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getUserSegments
);

router.get('/behavior-trends',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  controller.getBehaviorTrends
);

router.post('/behavior-pattern-analysis',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(behaviorPatternAnalysisSchema),
  controller.analyzeBehaviorPatterns
);

router.post('/behavior-prediction',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(behaviorPredictionSchema),
  controller.predictUserBehavior
);

router.post('/behavior-segmentation',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(behaviorSegmentationSchema),
  controller.segmentUserBehavior
);

module.exports = router;

