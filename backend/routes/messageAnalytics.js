const express = require('express');
const {
  activityOverviewHandler,
  userMessagesHandler,
  responseTimesHandler,
} = require('../controllers/messageAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const verifyMessageAccess = require('../middleware/messageAnalytics');
const {
  dateRangeSchema,
  userMessagesParamsSchema,
} = require('../validation/messageAnalytics');

const router = express.Router();

router.get(
  '/activity-overview',
  auth,
  authorize('admin', 'messaging-manager'),
  validate(dateRangeSchema, 'query'),
  activityOverviewHandler
);

router.get(
  '/user-messages/:userId',
  auth,
  authorize('admin', 'messaging-manager', 'user'),
  validate(userMessagesParamsSchema, 'params'),
  validate(dateRangeSchema, 'query'),
  verifyMessageAccess,
  userMessagesHandler
);

router.get(
  '/response-times',
  auth,
  authorize('admin', 'messaging-manager'),
  validate(dateRangeSchema, 'query'),
  responseTimesHandler
);

module.exports = router;
