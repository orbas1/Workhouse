const express = require('express');
const {
  submitGoalFeedbackHandler,
  reviewGoalFeedbackHandler,
  makeGoalAdjustmentHandler,
  submitModuleFeedbackHandler,
  listModuleFeedbackActionsHandler,
} = require('../controllers/userFeedbackAdjustment');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const goalMiddleware = require('../middleware/goal');
const {
  goalIdParamSchema,
  goalFeedbackSchema,
  goalAdjustmentSchema,
  moduleFeedbackSchema,
} = require('../validation/userFeedbackAdjustment');

const router = express.Router();

router.post(
  '/feedback/goals/submit/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  validate(goalFeedbackSchema),
  submitGoalFeedbackHandler
);

router.get(
  '/feedback/goals/review/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  reviewGoalFeedbackHandler
);

router.post(
  '/goals/adjustments/make/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  validate(goalAdjustmentSchema),
  makeGoalAdjustmentHandler
);

router.post(
  '/module/feedback/submit',
  auth,
  validate(moduleFeedbackSchema),
  submitModuleFeedbackHandler
);

router.get(
  '/module/feedback/actions-taken',
  auth,
  listModuleFeedbackActionsHandler
);

module.exports = router;
