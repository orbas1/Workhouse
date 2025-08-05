const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const investorEventExists = require('../middleware/investorEventExists');
const { investorFeedbackSchema } = require('../validation/investorFeedback');
const {
  submitInvestorFeedbackHandler,
  getInvestorFeedbackHandler,
} = require('../controllers/investorFeedback');

const router = express.Router();

router.post(
  '/investor/:eventId',
  auth,
  authorize('investor'),
  investorEventExists,
  validate(investorFeedbackSchema),
  submitInvestorFeedbackHandler
);

router.get(
  '/investor/:eventId',
  auth,
  authorize('admin'),
  investorEventExists,
  getInvestorFeedbackHandler
);

module.exports = router;
