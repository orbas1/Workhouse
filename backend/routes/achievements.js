const express = require('express');
const {
  logAchievementHandler,
  listAchievementsHandler,
} = require('../controllers/progressTracking');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const ensureProgressAccess = require('../middleware/progress');
const { achievementSchema, userIdParamSchema } = require('../validation/progressTracking');

const router = express.Router();

router.post('/log', auth, validate(achievementSchema), ensureProgressAccess, logAchievementHandler);
router.get('/:userId', auth, validate(userIdParamSchema, 'params'), ensureProgressAccess, listAchievementsHandler);

module.exports = router;
