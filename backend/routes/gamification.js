const express = require('express');
const {
  getLeaderboardHandler,
  claimRewardHandler,
  earnBadgeHandler,
  listBadgesHandler,
} = require('../controllers/gamification');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const validate = require('../middleware/validate');
const {
  courseIdParamSchema,
  claimRewardSchema,
  userIdParamSchema,
  earnBadgeSchema,
} = require('../validation/gamification');
const {
  ensureRewardExists,
  ensureBadgeExists,
} = require('../middleware/gamification');

const router = express.Router();

router.get(
  '/leaderboards/:courseId',
  auth,
  validate(courseIdParamSchema, 'params'),
  getLeaderboardHandler
);

router.post(
  '/rewards/claim',
  auth,
  validate(claimRewardSchema),
  ensureRewardExists,
  claimRewardHandler
);

router.post(
  '/badges/earn/:userId',
  auth,
  requireAdmin,
  validate(userIdParamSchema, 'params'),
  validate(earnBadgeSchema),
  ensureBadgeExists,
  earnBadgeHandler
);

router.get(
  '/badges/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  listBadgesHandler
);

module.exports = router;
