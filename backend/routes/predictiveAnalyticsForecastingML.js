const express = require('express');
const {
  predictUserRetentionHandler,
  forecastMarketTrendsHandler,
} = require('../controllers/predictiveAnalyticsForecastingML');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const mlRequestLogger = require('../middleware/mlRequestLogger');
const {
  retentionQuerySchema,
  marketTrendsQuerySchema,
} = require('../validation/predictiveAnalyticsForecastingML');

const router = express.Router();

router.get(
  '/predictive-analytics/user-retention',
  auth,
  authorize('admin', 'analyst'),
  mlRequestLogger,
  validate(retentionQuerySchema, 'query'),
  predictUserRetentionHandler,
);

router.get(
  '/forecasting/market-trends',
  auth,
  authorize('admin', 'analyst'),
  mlRequestLogger,
  validate(marketTrendsQuerySchema, 'query'),
  forecastMarketTrendsHandler,
);

module.exports = router;
