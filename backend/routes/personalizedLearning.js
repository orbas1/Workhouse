const express = require('express');
const {
  adaptiveContentHandler,
  assessmentEvaluationHandler,
} = require('../controllers/personalizedLearning');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const verifyUserAccess = require('../middleware/personalizedLearning');
const validate = require('../middleware/validate');
const {
  adaptiveContentParamsSchema,
  assessmentEvaluationSchema,
} = require('../validation/personalizedLearning');

const router = express.Router();

router.get(
  '/personalized-learning/adaptive-content/:userId',
  auth,
  authorize('user', 'instructor', 'admin'),
  verifyUserAccess,
  validate(adaptiveContentParamsSchema, 'params'),
  adaptiveContentHandler
);

router.post(
  '/learning/assessment/evaluate',
  auth,
  authorize('user', 'instructor', 'admin'),
  verifyUserAccess,
  validate(assessmentEvaluationSchema),
  assessmentEvaluationHandler
);

module.exports = router;
