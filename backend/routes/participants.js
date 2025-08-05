const express = require('express');
const {
  registerParticipantHandler,
  setPreferencesHandler,
  getPreEventMatchesHandler,
  joinWaitlistHandler,
  processPaymentHandler,
  viewProfileHandler,
  updateProfileHandler,
  cancelRegistrationHandler,
} = require('../controllers/participant');
const auth = require('../middleware/auth');
const { ensureSelf } = require('../middleware/participant');
const validate = require('../middleware/validate');
const {
  registerSchema,
  preferencesSchema,
  paymentSchema,
  profileUpdateSchema,
} = require('../validation/participant');

const router = express.Router();

router.post('/register/:eventId', auth, validate(registerSchema), registerParticipantHandler);
router.put('/preferences/:userId', auth, ensureSelf, validate(preferencesSchema), setPreferencesHandler);
router.get('/matches/pre-event/:eventId', auth, getPreEventMatchesHandler);
router.post('/waitlist/:eventId', auth, joinWaitlistHandler);
router.post('/payment/process/:eventId', auth, validate(paymentSchema), processPaymentHandler);
router.get('/profile/view/:userId', auth, ensureSelf, viewProfileHandler);
router.put('/profile/update/:userId', auth, ensureSelf, validate(profileUpdateSchema), updateProfileHandler);
router.post('/cancel/:eventId', auth, cancelRegistrationHandler);

module.exports = router;

