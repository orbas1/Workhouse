const express = require('express');
const {
  reflectLmsActivityHandler,
  integrateMentorshipFeedbackHandler,
  updateJobApplicationProgressHandler,
  acknowledgeProjectCompletionHandler,
  logCertificationHandler,
  getCareerInsightsHandler,
} = require('../controllers/integration');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  lmsSchema,
  mentorshipSchema,
  jobApplicationSchema,
  projectSchema,
  certificationSchema,
} = require('../validation/integration');

const router = express.Router();

router.post('/lms/:userId', auth, validate(lmsSchema), reflectLmsActivityHandler);
router.post('/mentorship/:userId', auth, validate(mentorshipSchema), integrateMentorshipFeedbackHandler);
router.post(
  '/job-applications/:userId',
  auth,
  validate(jobApplicationSchema),
  updateJobApplicationProgressHandler
);
router.post('/projects/:userId', auth, validate(projectSchema), acknowledgeProjectCompletionHandler);
router.post('/certifications/:userId', auth, validate(certificationSchema), logCertificationHandler);
router.get('/insights/:userId', auth, getCareerInsightsHandler);

module.exports = router;
