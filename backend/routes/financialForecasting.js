const express = require('express');
const {
  overviewHandler,
  salesForecastHandler,
  expenseForecastHandler,
  profitForecastHandler,
  trendForecastHandler,
  customForecastHandler,
} = require('../controllers/financialForecasting');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  dateRangeSchema,
  customForecastSchema,
} = require('../validation/financialForecasting');

const router = express.Router();

router.get('/overview', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), overviewHandler);
router.get('/sales', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), salesForecastHandler);
router.get('/expenses', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), expenseForecastHandler);
router.get('/profit', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), profitForecastHandler);
router.get('/trends', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), trendForecastHandler);
router.post('/custom', auth, authorize('admin', 'finance-manager'), validate(customForecastSchema), customForecastHandler);

module.exports = router;
