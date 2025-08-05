const logger = require('../utils/logger');
const {
  submitSessionFeedback,
  provideSessionDetail,
  getProgressReview,
  getFeedbackAnalytics,
  implementRewards,
  getMentorFeedbackSummary,
  reportMenteeGoalProgress,
} = require('../services/feedbackSystem');

async function submitSessionFeedbackHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const feedback = submitSessionFeedback(sessionId, req.body);
    logger.info(`Feedback submitted for session ${sessionId}`);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit session feedback', err);
    res.status(400).json({ error: err.message });
  }
}

async function progressReviewHandler(req, res) {
  const { menteeId } = req.params;
  try {
    const review = getProgressReview(menteeId);
    res.json(review);
  } catch (err) {
    logger.error('Failed to retrieve progress review', err);
    res.status(400).json({ error: err.message });
  }
}

async function feedbackAnalyticsHandler(req, res) {
  const { userId } = req.params;
  try {
    const analytics = getFeedbackAnalytics(userId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to analyze feedback', err);
    res.status(400).json({ error: err.message });
  }
}

async function rewardsHandler(req, res) {
  const { mentorId } = req.params;
  try {
    const reward = implementRewards(mentorId, req.body);
    logger.info(`Reward recorded for mentor ${mentorId}`);
    res.status(201).json(reward);
  } catch (err) {
    logger.error('Failed to record mentor reward', err);
    res.status(400).json({ error: err.message });
  }
}

async function sessionDetailHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const detail = provideSessionDetail(sessionId, req.body);
    logger.info(`Detailed feedback added for session ${sessionId}`);
    res.status(201).json(detail);
  } catch (err) {
    logger.error('Failed to add session detail', err);
    res.status(400).json({ error: err.message });
  }
}

async function mentorSummaryHandler(req, res) {
  const { mentorId } = req.params;
  try {
    const summary = getMentorFeedbackSummary(mentorId);
    res.json(summary);
  } catch (err) {
    logger.error('Failed to get mentor feedback summary', err);
    res.status(400).json({ error: err.message });
  }
}

async function goalProgressHandler(req, res) {
  const { menteeId } = req.params;
  try {
    const report = reportMenteeGoalProgress(menteeId, req.body);
    logger.info(`Goal progress reported for mentee ${menteeId}`);
    res.status(201).json(report);
  } catch (err) {
    logger.error('Failed to report goal progress', err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitSessionFeedbackHandler,
  progressReviewHandler,
  feedbackAnalyticsHandler,
  rewardsHandler,
  sessionDetailHandler,
  mentorSummaryHandler,
  goalProgressHandler,
};
