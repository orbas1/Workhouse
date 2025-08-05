const express = require('express');
const {
  submitClientFeedbackHandler,
  submitEmployeeFeedbackHandler,
  getQualityScoresHandler,
} = require('../controllers/feedback');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  clientFeedbackSchema,
  employeeFeedbackSchema,
} = require('../validation/feedback');

const router = express.Router();

router.post('/feedback/client', auth, validate(clientFeedbackSchema), submitClientFeedbackHandler);
router.post('/feedback/employee', auth, validate(employeeFeedbackSchema), submitEmployeeFeedbackHandler);
router.get('/:agencyId/quality/scores', auth, getQualityScoresHandler);

module.exports = router;
