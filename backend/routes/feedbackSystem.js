const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const {
  validateSessionFeedback,
  validateProgressReview,
  validateAnalytics,
  validateRewards,
  validateSessionDetail,
  validateMentorSummary,
  validateGoalProgress,
} = require('../middleware/feedbackSystem');
const {
  submitSessionFeedbackHandler,
  progressReviewHandler,
  feedbackAnalyticsHandler,
  rewardsHandler,
  sessionDetailHandler,
  mentorSummaryHandler,
  goalProgressHandler,
} = require('../controllers/feedbackSystem');

const router = express.Router();

router.post(
  '/session/:sessionId',
  auth,
  authorize('mentor', 'mentee', 'admin'),
  validateSessionFeedback,
  submitSessionFeedbackHandler
);

router.get(
  '/progress-review/:menteeId',
  auth,
  authorize('mentor', 'mentee', 'admin'),
  validateProgressReview,
  progressReviewHandler
);

router.get(
  '/analytics/:userId',
  auth,
  authorize('mentor', 'mentee', 'admin'),
  validateAnalytics,
  feedbackAnalyticsHandler
);

router.post(
  '/rewards/:mentorId',
  auth,
  authorize('admin'),
  validateRewards,
  rewardsHandler
);

router.post(
  '/session/detail/:sessionId',
  auth,
  authorize('mentor', 'mentee', 'admin'),
  validateSessionDetail,
  sessionDetailHandler
);

router.get(
  '/mentor/summary/:mentorId',
  auth,
  authorize('admin', 'mentor'),
  validateMentorSummary,
  mentorSummaryHandler
);

router.post(
  '/mentee/goal-progress/:menteeId',
  auth,
  authorize('mentee', 'admin'),
  validateGoalProgress,
  goalProgressHandler
);

module.exports = router;
