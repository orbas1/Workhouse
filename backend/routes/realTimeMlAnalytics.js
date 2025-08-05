const express = require('express');
const { realTimeEngagementHandler } = require('../controllers/realTimeMlAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { ensureEventExists } = require('../middleware/realTimeMlAnalytics');
const { eventIdParamSchema } = require('../validation/realTimeMlAnalytics');

const router = express.Router();

router.get(
  '/engagement/:eventId',
  auth,
  authorize('admin', 'analyst'),
  validate(eventIdParamSchema, 'params'),
  ensureEventExists,
  realTimeEngagementHandler
);

module.exports = router;
