const express = require('express');
const {
  getFinancialOverviewHandler,
  generateFinancialForecastHandler,
} = require('../controllers/financial');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { forecastSchema } = require('../validation/financial');

const router = express.Router();

router.get('/:agencyId/financial/overview', auth, getFinancialOverviewHandler);
router.post(
  '/:agencyId/financial/forecast',
  auth,
  validate(forecastSchema),
  generateFinancialForecastHandler
);

module.exports = router;
