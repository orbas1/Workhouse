const express = require('express');
const {
  runMatchingHandler,
  oneMinuteMatchesHandler,
  threeMinuteMatchesHandler,
  postEventSuggestionsHandler,
  setPreferencesHandler,
  getHistoryHandler,
  submitFeedbackHandler,
} = require('../controllers/matchingSystem');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  runMatchingSchema,
  setPreferencesSchema,
  feedbackSchema,
} = require('../validation/matchingSystem');

const router = express.Router();

router.post('/run/:eventId', auth, validate(runMatchingSchema), runMatchingHandler);
router.get('/one-minute/:eventId', auth, oneMinuteMatchesHandler);
router.get('/three-minute/:eventId', auth, threeMinuteMatchesHandler);
router.get('/suggestions/post-event/:eventId', auth, postEventSuggestionsHandler);
router.post('/preferences/set/:userId', auth, validate(setPreferencesSchema), setPreferencesHandler);
router.get('/history/:userId', auth, getHistoryHandler);
router.post('/feedback/:matchId', auth, validate(feedbackSchema), submitFeedbackHandler);

module.exports = router;

