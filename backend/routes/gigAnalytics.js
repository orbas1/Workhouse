const express = require('express');
const {
  marketTrendsHandler,
  jobAnalyticsHandler,
  completionRatesHandler,
  satisfactionHandler,
} = require('../controllers/gigAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { jobParamSchema } = require('../validation/gigAnalytics');

const router = express.Router({ mergeParams: true });

router.get('/market-trends', auth, authorize('admin', 'gig-manager'), marketTrendsHandler);
router.get('/job/:jobId', auth, authorize('admin', 'gig-manager'), validate(jobParamSchema, 'params'), jobAnalyticsHandler);
router.get('/completion-rates', auth, authorize('admin', 'gig-manager'), completionRatesHandler);
router.get('/satisfaction', auth, authorize('admin', 'gig-manager'), satisfactionHandler);

module.exports = router;
