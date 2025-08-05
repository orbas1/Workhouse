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
  // Stage 82 handlers
  createProfileHandler,
  updateProfileByIdHandler,
  getProfileByIdHandler,
  uploadPortfolioItemByIdHandler,
  getProfileAnalyticsHandler,
  submitProfileForVerificationHandler,
  getVerificationStatusHandler,
  enableContinuousVerificationHandler,
  setGeographicPreferencesHandler,
} = require('../controllers/profile');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const profileOwnership = require('../middleware/profileOwnership');
const profileIdOwnership = require('../middleware/profileIdOwnership');
const {
  userIdParamSchema,
  mentorProfileSchema,
  menteeProfileSchema,
  updateProfileSchema,
  portfolioItemSchema,
  skillsSchema,
  profileIdParamSchema,
  createProfileSchema,
  updateInvestorProfileSchema,
  continuousVerificationSchema,
  geographicPreferenceSchema,
} = require('../validation/profile');

const router = express.Router();

// Stage 82 routes
router.post('/create', auth, validate(createProfileSchema), createProfileHandler);
router.put('/update/:profileId', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, validate(updateInvestorProfileSchema), updateProfileByIdHandler);
router.get('/verification/status/:profileId', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, getVerificationStatusHandler);
router.get('/:profileId/analytics', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, getProfileAnalyticsHandler);
router.post('/verify/:profileId', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, submitProfileForVerificationHandler);
router.put('/verify/continuous/:profileId', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, validate(continuousVerificationSchema), enableContinuousVerificationHandler);
router.post('/:profileId/preferences/geographic', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, validate(geographicPreferenceSchema), setGeographicPreferencesHandler);
router.post('/:profileId/portfolio/upload', auth, validate(profileIdParamSchema, 'params'), profileIdOwnership, validate(portfolioItemSchema), uploadPortfolioItemByIdHandler);
router.get('/:profileId', auth, validate(profileIdParamSchema, 'params'), getProfileByIdHandler);

// Existing mentorship routes (prefixed with /user to avoid conflicts)
router.post('/mentor/create', auth, validate(mentorProfileSchema), createMentorProfileHandler);
router.post('/mentee/create', auth, validate(menteeProfileSchema), createMenteeProfileHandler);
router.put('/user/update/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, validate(updateProfileSchema), updateProfileHandler);
router.get('/user/:userId', auth, validate(userIdParamSchema, 'params'), getProfileHandler);
router.post('/user/portfolio/upload/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, validate(portfolioItemSchema), uploadPortfolioItemHandler);
router.get('/user/preferences/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, getPreferencesHandler);
router.post('/user/skills/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, validate(skillsSchema), addOrUpdateSkillsHandler);
router.get('/user/match-potential/:userId', auth, validate(userIdParamSchema, 'params'), profileOwnership, getMatchPotentialHandler);

module.exports = router;
