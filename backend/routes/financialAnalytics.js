const express = require('express');
const {
  overviewHandler,
  revenueHandler,
  expensesHandler,
  cryptoTransactionsHandler,
} = require('../controllers/financialAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { dateRangeSchema } = require('../validation/financialAnalytics');

const router = express.Router();

router.get('/overview', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), overviewHandler);
router.get('/revenue', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), revenueHandler);
router.get('/expenses', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), expensesHandler);
router.get('/crypto-transactions', auth, authorize('admin', 'finance-manager'), validate(dateRangeSchema, 'query'), cryptoTransactionsHandler);

module.exports = router;
