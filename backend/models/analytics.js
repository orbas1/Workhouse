const { randomUUID } = require('crypto');

const earnings = new Map(); // agencyId => [{ id, date, amount }]
const performance = new Map(); // agencyId => [{ id, employeeId, tasksCompleted, rating, periodStart, periodEnd }]

function addEarning(agencyId, amount, date = new Date()) {
  const record = {
    id: randomUUID(),
    date: new Date(date),
    amount: Number(amount),
  };
  const list = earnings.get(agencyId) || [];
  list.push(record);
  earnings.set(agencyId, list);
  return record;
}

function getEarningsByAgency(agencyId) {
  return earnings.get(agencyId) || [];
}

function addPerformance(
  agencyId,
  employeeId,
  tasksCompleted,
  rating,
  periodStart = new Date(),
  periodEnd = new Date()
) {
  const record = {
    id: randomUUID(),
    employeeId,
    tasksCompleted: Number(tasksCompleted),
    rating: Number(rating),
    periodStart: new Date(periodStart),
    periodEnd: new Date(periodEnd),
  };
  const list = performance.get(agencyId) || [];
  list.push(record);
  performance.set(agencyId, list);
  return record;
}

function getPerformanceByAgency(agencyId) {
  return performance.get(agencyId) || [];
}

module.exports = {
  addEarning,
  getEarningsByAgency,
  addPerformance,
  getPerformanceByAgency,
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
