const { randomUUID } = require('crypto');

// In-memory stores
const contentAnalytics = new Map(); // contentId -> metrics
const contentFeedback = []; // list of feedback entries

function getAllContentAnalytics() {
  return Array.from(contentAnalytics.values());
}

function getContentAnalytics(contentId) {
  return contentAnalytics.get(contentId) || null;
}

function upsertContentAnalytics(contentId, metrics = {}) {
  const existing = contentAnalytics.get(contentId);
  const record = Object.assign(
    existing || {
      contentId,
      views: 0,
      engagementRate: 0,
      feedbackScore: 0,
      updatedAt: new Date(),
    },
    metrics,
    { updatedAt: new Date() }
  );
  contentAnalytics.set(contentId, record);
  return record;
}

function addFeedback({ contentId, userId, rating, comment }) {
  const entry = {
    id: randomUUID(),
    contentId,
    userId,
    rating,
    comment: comment || '',
    createdAt: new Date(),
  };
  contentFeedback.push(entry);
  return entry;
}

function getFeedbackByContent(contentId) {
  return contentFeedback.filter(f => f.contentId === contentId);
}

function updateFeedbackScore(contentId) {
  const feedbacks = getFeedbackByContent(contentId);
  const score =
    feedbacks.reduce((sum, f) => sum + f.rating, 0) /
    (feedbacks.length || 1);
  upsertContentAnalytics(contentId, { feedbackScore: score });
  return score;
}

module.exports = {
  getAllContentAnalytics,
  getContentAnalytics,
  upsertContentAnalytics,
  addFeedback,
  getFeedbackByContent,
  updateFeedbackScore,
};
