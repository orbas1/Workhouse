const express = require('express');
const {
  createMentorProfileHandler,
  createMenteeProfileHandler,
  updateProfileHandler,
  getProfileHandler,
  uploadPortfolioItemHandler,
  getPreferencesHandler,
  addOrUpdateSkillsHandler,
  getMatchPotentialHandler,
} = require('../controllers/profile');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const profileOwnership = require('../middleware/profileOwnership');
const {
  userIdParamSchema,
  mentorProfileSchema,
  menteeProfileSchema,
  updateProfileSchema,
  portfolioItemSchema,
  skillsSchema,
} = require('../validation/profile');

const router = express.Router();

router.post('/mentor/create', auth, validate(mentorProfileSchema), createMentorProfileHandler);
router.post('/mentee/create', auth, validate(menteeProfileSchema), createMenteeProfileHandler);
router.put('/update/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, validate(updateProfileSchema), updateProfileHandler);
router.get('/:userId', auth, validate(userIdParamSchema, 'params'), getProfileHandler);
router.post('/portfolio/upload/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, validate(portfolioItemSchema), uploadPortfolioItemHandler);
router.get('/preferences/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, getPreferencesHandler);
router.post('/skills/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, validate(skillsSchema), addOrUpdateSkillsHandler);
router.get('/match-potential/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, getMatchPotentialHandler);

module.exports = router;
