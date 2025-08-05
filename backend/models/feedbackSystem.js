const sessionFeedbacks = [];
const mentorRewards = [];
const menteeGoalProgress = [];

let feedbackId = 1;
let detailId = 1;
let rewardId = 1;
let goalProgressId = 1;

function addSessionFeedback(sessionId, { mentorId, menteeId, rating, comments }) {
  const feedback = {
    id: feedbackId++,
    sessionId: Number(sessionId),
    mentorId,
    menteeId,
    rating,
    comments: comments || '',
    details: [],
    createdAt: new Date(),
  };
  sessionFeedbacks.push(feedback);
  return feedback;
}

function addSessionDetail(sessionId, { detail, submittedBy }) {
  const feedback = sessionFeedbacks.find(f => f.sessionId === Number(sessionId));
  if (!feedback) return null;
  const detailEntry = {
    id: detailId++,
    detail,
    submittedBy,
    createdAt: new Date(),
  };
  feedback.details.push(detailEntry);
  return detailEntry;
}

function getFeedbackByMentee(menteeId) {
  return sessionFeedbacks.filter(f => f.menteeId === Number(menteeId));
}

function getFeedbackByMentor(mentorId) {
  return sessionFeedbacks.filter(f => f.mentorId === Number(mentorId));
}

function getFeedbackByUser(userId) {
  return sessionFeedbacks.filter(
    f => f.mentorId === Number(userId) || f.menteeId === Number(userId)
  );
}

function addMentorReward(mentorId, { points, note }) {
  const reward = {
    id: rewardId++,
    mentorId: Number(mentorId),
    points,
    note: note || '',
    createdAt: new Date(),
  };
  mentorRewards.push(reward);
  return reward;
}

function getRewardsByMentor(mentorId) {
  return mentorRewards.filter(r => r.mentorId === Number(mentorId));
}

function addGoalProgress(menteeId, { goal, progress }) {
  const entry = {
    id: goalProgressId++,
    menteeId: Number(menteeId),
    goal,
    progress,
    createdAt: new Date(),
  };
  menteeGoalProgress.push(entry);
  return entry;
}

function getGoalProgressByMentee(menteeId) {
  return menteeGoalProgress.filter(g => g.menteeId === Number(menteeId));
}

module.exports = {
  addSessionFeedback,
  addSessionDetail,
  getFeedbackByMentee,
  getFeedbackByMentor,
  getFeedbackByUser,
  addMentorReward,
  getRewardsByMentor,
  addGoalProgress,
  getGoalProgressByMentee,
};
