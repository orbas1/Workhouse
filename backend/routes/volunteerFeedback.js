const express = require('express');
const {
  submitVolunteerFeedbackHandler,
  submitOrganizationFeedbackHandler,
  getOpportunityFeedbackHandler,
} = require('../controllers/volunteerFeedback');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  volunteerFeedbackSchema,
  organizationFeedbackSchema,
  opportunityIdParamSchema,
} = require('../validation/volunteerFeedback');
const { requireOpportunityFeedback } = require('../middleware/volunteerFeedback');

const router = express.Router();

router.post('/volunteer', auth, validate(volunteerFeedbackSchema), submitVolunteerFeedbackHandler);
router.post('/organization', auth, validate(organizationFeedbackSchema), submitOrganizationFeedbackHandler);
router.get(
  '/:opportunityId',
  auth,
  validate(opportunityIdParamSchema, 'params'),
  requireOpportunityFeedback,
  getOpportunityFeedbackHandler
);

module.exports = router;
