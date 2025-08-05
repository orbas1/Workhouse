const express = require('express');
const {
  submitAssessmentHandler,
  autoGradeHandler,
  getFeedbackHandler,
} = require('../controllers/assessment');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const ensureAssessmentAccess = require('../middleware/assessment');
const {
  courseIdParamSchema,
  submitAssessmentSchema,
  autoGradeSchema,
  feedbackParamSchema,
} = require('../validation/assessment');

const router = express.Router();

router.post('/submit/:courseId',
  auth,
  validate(courseIdParamSchema, 'params'),
  validate(submitAssessmentSchema),
  ensureAssessmentAccess,
  submitAssessmentHandler
);

router.post('/auto-grade/:courseId',
  auth,
  validate(courseIdParamSchema, 'params'),
  validate(autoGradeSchema),
  ensureAssessmentAccess,
  autoGradeHandler
);

router.get('/feedback/:userId/course/:courseId',
  auth,
  validate(feedbackParamSchema, 'params'),
  ensureAssessmentAccess,
  getFeedbackHandler
);

module.exports = router;

