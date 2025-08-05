const express = require('express');
const {
  createGoalHandler,
  updateGoalHandler,
  getGoalRecommendationsHandler,
  shareGoalHandler,
  listGoalsHandler,
  deleteGoalHandler,
} = require('../controllers/goal');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const goalMiddleware = require('../middleware/goal');
const {
  createGoalSchema,
  updateGoalSchema,
  shareGoalSchema,
  userIdParamSchema,
  goalIdParamSchema,
} = require('../validation/goal');

const router = express.Router();

router.post('/create', auth, validate(createGoalSchema), createGoalHandler);
router.put(
  '/update/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  validate(updateGoalSchema),
  updateGoalHandler
);
router.get(
  '/recommendations/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  getGoalRecommendationsHandler
);
router.post(
  '/share/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  validate(shareGoalSchema),
  shareGoalHandler
);
router.get('/:userId', auth, validate(userIdParamSchema, 'params'), listGoalsHandler);
router.delete(
  '/delete/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  deleteGoalHandler
);

module.exports = router;
