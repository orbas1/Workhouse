const express = require('express');
const {
  marketTrendsHandler,
  jobAnalyticsHandler,
  freelancerPerformanceHandler,
  clientSatisfactionHandler,
} = require('../controllers/freelanceAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  dateRangeSchema,
  jobParamSchema,
  freelancerParamSchema,
} = require('../validation/freelanceAnalytics');

const router = express.Router();

router.get('/market-trends', auth, authorize('admin', 'freelance-manager'), validate(dateRangeSchema, 'query'), marketTrendsHandler);
router.get('/job/:jobId', auth, authorize('admin', 'freelance-manager'), validate(jobParamSchema, 'params'), jobAnalyticsHandler);
router.get('/freelancer/:freelancerId', auth, authorize('admin', 'freelance-manager'), validate(freelancerParamSchema, 'params'), freelancerPerformanceHandler);
router.get('/client-satisfaction', auth, authorize('admin', 'freelance-manager'), validate(dateRangeSchema, 'query'), clientSatisfactionHandler);

module.exports = router;
