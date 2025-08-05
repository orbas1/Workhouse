const { randomUUID } = require('crypto');

const userProgress = new Map();
const assessmentResults = [];

function getProgress(userId) {
  if (!userProgress.has(userId)) {
    userProgress.set(userId, {
      userId,
      level: 'beginner',
      topics: [],
      lastAssessmentScore: 0,
      updatedAt: new Date(),
    });
  }
  return userProgress.get(userId);
}

function saveProgress(userId, progress) {
  const existing = getProgress(userId);
  const updated = { ...existing, ...progress, updatedAt: new Date() };
  userProgress.set(userId, updated);
  return updated;
}

function saveAssessmentResult({ userId, assessmentId, score, feedback, evaluatedAt }) {
  const record = {
    id: randomUUID(),
    userId,
    assessmentId,
    score,
    feedback,
    evaluatedAt,
  };
  assessmentResults.push(record);
  return record;
}

module.exports = {
  getProgress,
  saveProgress,
  saveAssessmentResult,
};
