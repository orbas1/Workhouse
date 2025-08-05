const express = require('express');
const {
  recommendationsHandler,
  insightsHandler,
  customQueryHandler,
  contentPerformanceHandler,
  userBehaviorHandler,
  financialForecastingHandler,
  sentimentAnalysisHandler,
} = require('../controllers/mlAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  recommendationsParamsSchema,
  insightsParamsSchema,
  customQueryBodySchema,
  userBehaviorParamsSchema,
  sentimentParamsSchema,
} = require('../validation/mlAnalytics');

const router = express.Router();

router.get('/recommendations/user/:userId', auth, authorize('admin', 'analyst', 'manager', 'user'), validate(recommendationsParamsSchema, 'params'), recommendationsHandler);
router.get('/insights/domain/:domain', auth, authorize('admin', 'analyst'), validate(insightsParamsSchema, 'params'), insightsHandler);
router.post('/analytics/custom-query', auth, authorize('admin', 'analyst'), validate(customQueryBodySchema, 'body'), customQueryHandler);
router.get('/content-performance/analysis', auth, authorize('admin', 'analyst'), contentPerformanceHandler);
router.get('/user-behavior/patterns/:userId', auth, authorize('admin', 'analyst', 'manager'), validate(userBehaviorParamsSchema, 'params'), userBehaviorHandler);
router.get('/financial/forecasting', auth, authorize('admin', 'analyst'), financialForecastingHandler);
router.get('/sentiment-analysis/:domain', auth, authorize('admin', 'analyst'), validate(sentimentParamsSchema, 'params'), sentimentAnalysisHandler);

module.exports = router;

