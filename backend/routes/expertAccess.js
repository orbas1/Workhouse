const express = require('express');
const {
  bookSessionHandler,
  listWebinarsHandler,
  requestAdviceHandler,
  requestProjectFeedbackHandler,
} = require('../controllers/expertAccess');
const auth = require('../middleware/auth');
const expertAccess = require('../middleware/expertAccess');
const validate = require('../middleware/validate');
const {
  bookSessionSchema,
  adviceRequestSchema,
  projectFeedbackSchema,
} = require('../validation/expertAccess');

const router = express.Router();

router.post('/session/book/:expertId', auth, expertAccess, validate(bookSessionSchema), bookSessionHandler);
router.get('/webinars', auth, expertAccess, listWebinarsHandler);
router.post('/advice/request/:expertId', auth, expertAccess, validate(adviceRequestSchema), requestAdviceHandler);
router.post('/project/feedback/:projectId', auth, expertAccess, validate(projectFeedbackSchema), requestProjectFeedbackHandler);

module.exports = router;
