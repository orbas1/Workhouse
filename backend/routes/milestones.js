const express = require('express');
const {
  createMilestoneHandler,
  getMilestoneHandler,
  completeMilestoneHandler,
  setMilestoneRewardHandler,
  getNotificationsHandler,
} = require('../controllers/milestone');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const milestoneMiddleware = require('../middleware/milestone');
const {
  pathIdParamSchema,
  milestoneIdParamSchema,
  userIdParamSchema,
  createMilestoneSchema,
  rewardSchema,
} = require('../validation/milestone');

const router = express.Router();

router.post(
  '/create/:pathId',
  auth,
  validate(pathIdParamSchema, 'params'),
  validate(createMilestoneSchema),
  createMilestoneHandler
);

router.get(
  '/:milestoneId',
  auth,
  validate(milestoneIdParamSchema, 'params'),
  milestoneMiddleware,
  getMilestoneHandler
);

router.post(
  '/complete/:milestoneId',
  auth,
  validate(milestoneIdParamSchema, 'params'),
  milestoneMiddleware,
  completeMilestoneHandler
);

router.post(
  '/reward/:milestoneId',
  auth,
  validate(milestoneIdParamSchema, 'params'),
  milestoneMiddleware,
  validate(rewardSchema),
  setMilestoneRewardHandler
);

router.get(
  '/notifications/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  getNotificationsHandler
);

module.exports = router;
