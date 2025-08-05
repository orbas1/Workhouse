const express = require('express');
const {
  findMatchesHandler,
  setPreferencesHandler,
  submitFeedbackHandler,
  subscribeNotificationsHandler,
  getNotificationsHandler,
  getHistoryHandler,
  getMatchesByStageHandler,
} = require('../controllers/matching');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const matchExists = require('../middleware/matchExists');
const {
  findMatchesSchema,
  preferencesSchema,
  feedbackSchema,
  profileIdParamSchema,
  matchIdParamSchema,
  stageParamSchema,
} = require('../validation/matching');

const router = express.Router();

router.post('/find', auth, validate(findMatchesSchema), findMatchesHandler);
router.post(
  '/preferences/:profileId',
  auth,
  validate(profileIdParamSchema, 'params'),
  validate(preferencesSchema),
  setPreferencesHandler
);
router.post(
  '/feedback/:matchId',
  auth,
  validate(matchIdParamSchema, 'params'),
  matchExists,
  validate(feedbackSchema),
  submitFeedbackHandler
);
router.post('/notifications/subscribe', auth, subscribeNotificationsHandler);
router.get(
  '/notifications/:profileId',
  auth,
  validate(profileIdParamSchema, 'params'),
  getNotificationsHandler
);
router.get(
  '/history/:profileId',
  auth,
  validate(profileIdParamSchema, 'params'),
  getHistoryHandler
);
router.get(
  '/byStage/:stage',
  auth,
  validate(stageParamSchema, 'params'),
  getMatchesByStageHandler
);

module.exports = router;
