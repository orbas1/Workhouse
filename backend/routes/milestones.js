const express = require('express');
const {
  createMilestoneHandler,
  listMilestonesHandler,
  updateMilestoneHandler,
  deleteMilestoneHandler,
} = require('../controllers/goal');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const goalMiddleware = require('../middleware/goal');
const milestoneMiddleware = require('../middleware/milestone');
const {
  goalIdParamSchema,
  milestoneIdParamSchema,
  createMilestoneSchema,
  updateMilestoneSchema,
} = require('../validation/goal');

const router = express.Router();

router.post(
  '/create/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  validate(createMilestoneSchema),
  createMilestoneHandler
);
router.get(
  '/:goalId',
  auth,
  validate(goalIdParamSchema, 'params'),
  goalMiddleware,
  listMilestonesHandler
);
router.put(
  '/update/:milestoneId',
  auth,
  validate(milestoneIdParamSchema, 'params'),
  milestoneMiddleware,
  validate(updateMilestoneSchema),
  updateMilestoneHandler
);
router.delete(
  '/delete/:milestoneId',
  auth,
  validate(milestoneIdParamSchema, 'params'),
  milestoneMiddleware,
  deleteMilestoneHandler
);

module.exports = router;
