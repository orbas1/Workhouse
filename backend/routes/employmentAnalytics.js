const express = require('express');
const {
  overviewHandler,
  jobAnalyticsHandler,
  applicationAnalyticsHandler,
  jobsListHandler,
} = require('../controllers/employmentAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { jobParamSchema } = require('../validation/employmentAnalytics');

const router = express.Router({ mergeParams: true });

router.get('/overview', auth, authorize('admin', 'hr-manager'), overviewHandler);
router.get('/jobs', auth, authorize('admin', 'hr-manager'), jobsListHandler);
router.get('/jobs/:jobId', auth, authorize('admin', 'hr-manager'), validate(jobParamSchema, 'params'), jobAnalyticsHandler);
router.get('/applications', auth, authorize('admin', 'hr-manager'), applicationAnalyticsHandler);

module.exports = router;
