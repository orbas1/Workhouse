const express = require('express');
const {
  getAgencyEarningsHandler,
  getAgencyPerformanceHandler,
} = require('../controllers/analytics');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  agencyIdParamSchema,
  analyticsQuerySchema,
} = require('../validation/analytics');

const router = express.Router();

router.get(
  '/:agencyId/analytics/earnings',
  auth,
  validate(agencyIdParamSchema, 'params'),
  validate(analyticsQuerySchema, 'query'),
  getAgencyEarningsHandler
);

router.get(
  '/:agencyId/analytics/performance',
  auth,
  validate(agencyIdParamSchema, 'params'),
  validate(analyticsQuerySchema, 'query'),
  getAgencyPerformanceHandler
);

module.exports = router;
