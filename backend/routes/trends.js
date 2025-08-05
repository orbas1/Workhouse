const express = require('express');
const {
  getTrendAnalyticsHandler,
  getMetricTrendsHandler,
  getDomainMetricTrendsHandler,
  getDomainMetricHistoryTrendsHandler,
  getDomainMetricForecastTrendsHandler,
  compareDomainMetricTrendsHandler,
  customTrendAnalyticsQueryHandler,
} = require('../controllers/machineLearning');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  metricParamSchema,
  metricDomainParamSchema,
  compareDomainBodySchema,
  customTrendSchema,
} = require('../validation/machineLearning');

const router = express.Router();

router.get('/', auth, authorize('admin', 'analytics-manager'), getTrendAnalyticsHandler);

router.get(
  '/:metric',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(metricParamSchema, 'params'),
  getMetricTrendsHandler,
);

router.get(
  '/:metric/:domain',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(metricDomainParamSchema, 'params'),
  getDomainMetricTrendsHandler,
);

router.get(
  '/:metric/:domain/history',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(metricDomainParamSchema, 'params'),
  getDomainMetricHistoryTrendsHandler,
);

router.get(
  '/:metric/:domain/forecast',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(metricDomainParamSchema, 'params'),
  getDomainMetricForecastTrendsHandler,
);

router.post(
  '/:metric/:domain/compare',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(metricDomainParamSchema, 'params'),
  validate(compareDomainBodySchema),
  compareDomainMetricTrendsHandler,
);

router.post(
  '/custom',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(customTrendSchema),
  customTrendAnalyticsQueryHandler,
);

module.exports = router;
