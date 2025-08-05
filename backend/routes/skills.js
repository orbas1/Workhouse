const express = require('express');
const {
  listSkillsHandler,
  addSkillHandler,
  updateSkillHandler,
} = require('../controllers/progressTracking');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const ensureProgressAccess = require('../middleware/progress');
const {
  userIdParamSchema,
  skillIdParamSchema,
  skillSchema,
  skillUpdateSchema,
} = require('../validation/progressTracking');

const router = express.Router();

router.get('/inventory/:userId', auth, validate(userIdParamSchema, 'params'), ensureProgressAccess, listSkillsHandler);
router.post('/add/:userId', auth, validate(userIdParamSchema, 'params'), ensureProgressAccess, validate(skillSchema), addSkillHandler);
router.put('/update/:skillId', auth, validate(skillIdParamSchema, 'params'), validate(skillUpdateSchema), updateSkillHandler);

module.exports = router;
