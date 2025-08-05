const express = require('express');
const {
  runMatchingHandler,
  searchProfilesHandler,
  sendInvitationHandler,
  setupTrialSessionHandler,
  manualMatchesHandler,
  respondInvitationHandler,
  matchHistoryHandler,
} = require('../controllers/matchingEngine');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const invitationExists = require('../middleware/invitation');
const {
  runMatchingSchema,
  searchSchema,
  inviteSchema,
  trialSessionSchema,
  respondSchema,
} = require('../validation/matchingEngine');

const router = express.Router();

router.post('/run', auth, validate(runMatchingSchema), runMatchingHandler);
router.get('/search', auth, validate(searchSchema, 'query'), searchProfilesHandler);
router.post('/invite/:userId', auth, validate(inviteSchema), sendInvitationHandler);
router.post('/trial-session/setup', auth, validate(trialSessionSchema), setupTrialSessionHandler);
router.get('/manual/:userId', auth, manualMatchesHandler);
router.post('/respond/:invitationId', auth, invitationExists, validate(respondSchema), respondInvitationHandler);
router.get('/history/:userId', auth, matchHistoryHandler);

module.exports = router;

