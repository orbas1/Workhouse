const express = require('express');
const {
  listPathwaysHandler,
  createGroupSessionHandler,
  createLiveQAHandler,
  getCommunityForumHandler,
  recommendResourceHandler,
  getAnalyticsDashboardHandler,
  setupConfidentialityAgreementHandler,
  getPathwayDetailHandler,
  joinGroupSessionHandler,
  getUpcomingLiveQaHandler,
  getCommunityDiscussionsHandler,
  assignLearningResourceHandler,
  getMenteeProgressHandler,
  confirmConfidentialityHandler,
  getBadgesHandler,
} = require('../controllers/additionalFeatures');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const mentorshipAccess = require('../middleware/mentorship');
const validate = require('../middleware/validate');
const {
  groupSessionSchema,
  liveQaSchema,
  recommendResourceSchema,
  assignResourceSchema,
  confidentialitySetupSchema,
  confidentialityConfirmSchema,
} = require('../validation/additionalFeatures');

const router = express.Router();

// Require authentication and mentorship access for all routes
router.use(auth);
router.use(mentorshipAccess);

router.get('/pathways', listPathwaysHandler);
router.post('/group-session/create', authorize('mentor', 'admin'), validate(groupSessionSchema), createGroupSessionHandler);
router.post('/live-qa/create', authorize('mentor', 'admin'), validate(liveQaSchema), createLiveQAHandler);
router.get('/community/forum', getCommunityForumHandler);
router.post('/learning-resources/recommend/:menteeId', authorize('mentor', 'admin'), validate(recommendResourceSchema), recommendResourceHandler);
router.get('/analytics/dashboard/:userId', getAnalyticsDashboardHandler);
router.post('/confidentiality-agreement/setup/:sessionId', authorize('mentor', 'admin'), validate(confidentialitySetupSchema), setupConfidentialityAgreementHandler);
router.get('/pathways/detail/:pathwayId', getPathwayDetailHandler);
router.post('/group-session/join/:sessionId', joinGroupSessionHandler);
router.get('/live-qa/upcoming', getUpcomingLiveQaHandler);
router.get('/community/discussions', getCommunityDiscussionsHandler);
router.post('/learning-resources/assign/:menteeId', authorize('mentor', 'admin'), validate(assignResourceSchema), assignLearningResourceHandler);
router.get('/analytics/progress/:menteeId', getMenteeProgressHandler);
router.post('/confidentiality-agreement/confirm/:userId', validate(confidentialityConfirmSchema), confirmConfidentialityHandler);
router.get('/badges/:userId', getBadgesHandler);

module.exports = router;

