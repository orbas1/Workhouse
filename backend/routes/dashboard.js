const express = require('express');
const { dashboardHandler, reportGenerationHandler } = require('../controllers/dashboard');
const auth = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { param, body } = require('express-validator');

const router = express.Router();

router.get('/dashboard/:affiliateId', auth, [param('affiliateId').isInt()], handleValidationErrors, dashboardHandler);

router.post('/reports/generate', auth, [
  body('affiliateId').isInt(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
], handleValidationErrors, reportGenerationHandler);

module.exports = router;
