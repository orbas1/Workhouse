const express = require('express');
const {
  getRealTimeHandler,
  getTrendsHandler,
  getUserBehaviorHandler,
  getFinancialForecastHandler,
  getSentimentHandler,
  createCustomReportHandler,
  listCustomReportsHandler,
  getCustomReportHandler,
  updateCustomReportHandler,
  deleteCustomReportHandler,
  getEngagementHeatmapHandler,
  getContentPerformanceHandler,
  getApiUsageHandler,
  getEducationOutcomesHandler,
} = require('../controllers/realTimeAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const domainCheck = require('../middleware/analyticsDomain');
const {
  domainParamSchema,
  userIdParamSchema,
  contentTypeParamSchema,
  courseIdParamSchema,
  reportIdParamSchema,
  customReportSchema,
} = require('../validation/realTimeAnalytics');

const router = express.Router();

router.get(
  '/real-time/:domain',
  auth,
  authorize('admin', 'analyst'),
  validate(domainParamSchema, 'params'),
  domainCheck,
  getRealTimeHandler
);

router.get(
  '/trends/:domain',
  auth,
  authorize('admin', 'analyst'),
  validate(domainParamSchema, 'params'),
  domainCheck,
  getTrendsHandler
);

router.get(
  '/user-behavior/:userId',
  auth,
  authorize('admin', 'analyst'),
  validate(userIdParamSchema, 'params'),
  getUserBehaviorHandler
);

router.get(
  '/financial/forecast',
  auth,
  authorize('admin', 'analyst'),
  getFinancialForecastHandler
);

router.get(
  '/sentiment/:domain',
  auth,
  authorize('admin', 'analyst'),
  validate(domainParamSchema, 'params'),
  domainCheck,
  getSentimentHandler
);

router.get(
  '/engagement/heatmap/:domain',
  auth,
  authorize('admin', 'analyst'),
  validate(domainParamSchema, 'params'),
  domainCheck,
  getEngagementHeatmapHandler
);

router.get(
  '/content-performance/:contentType',
  auth,
  authorize('admin', 'analyst'),
  validate(contentTypeParamSchema, 'params'),
  getContentPerformanceHandler
);

router.get(
  '/api-usage',
  auth,
  authorize('admin', 'analyst'),
  getApiUsageHandler
);

router.get(
  '/education/outcomes/:courseId',
  auth,
  authorize('admin', 'analyst'),
  validate(courseIdParamSchema, 'params'),
  getEducationOutcomesHandler
);

router.post(
  '/custom-report',
  auth,
  authorize('admin', 'analyst'),
  validate(customReportSchema),
  createCustomReportHandler
);

router.get(
  '/custom-reports',
  auth,
  authorize('admin', 'analyst'),
  listCustomReportsHandler
);

router.get(
  '/custom-reports/:reportId',
  auth,
  authorize('admin', 'analyst'),
  validate(reportIdParamSchema, 'params'),
  getCustomReportHandler
);

router.post(
  '/custom-reports',
  auth,
  authorize('admin', 'analyst'),
  validate(customReportSchema),
  createCustomReportHandler
);

router.put(
  '/custom-reports/:reportId',
  auth,
  authorize('admin', 'analyst'),
  validate(reportIdParamSchema, 'params'),
  validate(customReportSchema),
  updateCustomReportHandler
);

router.delete(
  '/custom-reports/:reportId',
  auth,
  authorize('admin', 'analyst'),
  validate(reportIdParamSchema, 'params'),
  deleteCustomReportHandler
);

module.exports = router;
