const {
  addSessionFeedback,
  addSessionDetail,
  getFeedbackByMentee,
  getFeedbackByMentor,
  getFeedbackByUser,
  addMentorReward,
  getRewardsByMentor,
  addGoalProgress,
  getGoalProgressByMentee,
} = require('../models/feedbackSystem');

function submitSessionFeedback(sessionId, data) {
  return addSessionFeedback(sessionId, data);
}

function provideSessionDetail(sessionId, data) {
  const detail = addSessionDetail(sessionId, data);
  if (!detail) {
    throw new Error('Session feedback not found');
  }
  return detail;
}

function getProgressReview(menteeId) {
  const feedback = getFeedbackByMentee(menteeId);
  const goals = getGoalProgressByMentee(menteeId);
  const averageRating = feedback.length
    ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
    : null;
  return { feedback, goals, averageRating };
}

function getFeedbackAnalytics(userId) {
  const feedback = getFeedbackByUser(userId);
  const totalSessions = feedback.length;
  const averageRating = totalSessions
    ? feedback.reduce((sum, f) => sum + f.rating, 0) / totalSessions
    : null;
  return { totalSessions, averageRating };
}

function implementRewards(mentorId, rewardData) {
  return addMentorReward(mentorId, rewardData);
}

function getMentorFeedbackSummary(mentorId) {
  const feedback = getFeedbackByMentor(mentorId);
  const rewards = getRewardsByMentor(mentorId);
  const averageRating = feedback.length
    ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
    : null;
  return { feedbackCount: feedback.length, averageRating, rewards };
}

function reportMenteeGoalProgress(menteeId, progressData) {
  return addGoalProgress(menteeId, progressData);
}

module.exports = {
  submitSessionFeedback,
  provideSessionDetail,
  getProgressReview,
  getFeedbackAnalytics,
  implementRewards,
  getMentorFeedbackSummary,
  reportMenteeGoalProgress,
};
