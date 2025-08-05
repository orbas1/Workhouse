const express = require('express');
const { getLearningOutcomesHandler, customizeLearningPathHandler } = require('../controllers/aiEnhancedLearningDevelopment');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  learningOutcomeParamsSchema,
  learningPathParamsSchema,
} = require('../validation/aiEnhancedLearningDevelopment');

const router = express.Router();

router.get(
  '/outcomes/:courseId',
  auth,
  authorize('admin', 'instructor'),
  validate(learningOutcomeParamsSchema, 'params'),
  getLearningOutcomesHandler
);

router.get(
  '/paths/customize/:userId',
  auth,
  authorize('admin', 'instructor', 'user'),
  validate(learningPathParamsSchema, 'params'),
  customizeLearningPathHandler
);

module.exports = router;
