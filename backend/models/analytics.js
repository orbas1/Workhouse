const { randomUUID } = require('crypto');

// -----------------------------
// Agency-level analytics stores
// -----------------------------
const earnings = new Map(); // agencyId => [ { id, date, amount } ]
const performance = new Map(); // agencyId => [ { id, employeeId, tasksCompleted, rating, periodStart, periodEnd } ]

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

// -----------------------------
// Content analytics stores
// -----------------------------
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

// -----------------------------
// Learning analytics stores
// -----------------------------
const pathAnalytics = new Map(); // pathId -> analytics
const userAnalytics = new Map(); // userId -> analytics
const skillAnalytics = new Map(); // userId -> [ { skill, level, progress, updatedAt } ]
const learningPredictions = new Map(); // userId -> { prediction, confidence, createdAt }

// -----------------------------
// Volunteer and organization analytics stores
// -----------------------------
const volunteerEngagement = [];
const organizationProjectStats = [];

function setPathAnalytics(pathId, data) {
  const record = Object.assign({
    id: randomUUID(),
    pathId,
    views: 0,
    enrollments: 0,
    completions: 0,
    averageScore: 0,
    updatedAt: new Date(),
  }, data, { updatedAt: new Date() });
  pathAnalytics.set(pathId, record);
  return record;
}

function getPathAnalytics(pathId) {
  return pathAnalytics.get(pathId) || null;
}

function setUserAnalytics(userId, data) {
  const record = Object.assign({
    id: randomUUID(),
    userId,
    pathsEnrolled: 0,
    pathsCompleted: 0,
    averageScore: 0,
    learningHours: 0,
    updatedAt: new Date(),
  }, data, { updatedAt: new Date() });
  userAnalytics.set(userId, record);
  return record;
}

function getUserAnalytics(userId) {
  return userAnalytics.get(userId) || null;
}

function setUserSkills(userId, skills) {
  const records = skills.map(s => ({
    id: randomUUID(),
    userId,
    skill: s.skill,
    level: s.level,
    progress: s.progress || 0,
    updatedAt: new Date(),
  }));
  skillAnalytics.set(userId, records);
  return records;
}

function getUserSkills(userId) {
  return skillAnalytics.get(userId) || [];
}

function setPrediction(userId, prediction, confidence = 0) {
  const record = {
    id: randomUUID(),
    userId,
    prediction,
    confidence: Number(confidence),
    createdAt: new Date(),
  };
  learningPredictions.set(userId, record);
  return record;
}

function getPrediction(userId) {
  return learningPredictions.get(userId) || null;
}

function addVolunteerEngagement(volunteerId, hours, tasksCompleted, date = new Date()) {
  const record = {
    id: randomUUID(),
    volunteerId,
    hours: Number(hours),
    tasksCompleted: Number(tasksCompleted),
    date: new Date(date),
  };
  volunteerEngagement.push(record);
  return record;
}

function getVolunteerEngagement({ startDate, endDate } = {}) {
  return volunteerEngagement.filter(r => {
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  });
}

function addOrganizationProjectStat(organizationId, projectId, volunteers, impactScore, date = new Date()) {
  const record = {
    id: randomUUID(),
    organizationId,
    projectId,
    volunteers: Number(volunteers),
    impactScore: Number(impactScore),
    date: new Date(date),
  };
  organizationProjectStats.push(record);
  return record;
}

function getOrganizationProjectAnalytics({ startDate, endDate } = {}) {
  return organizationProjectStats.filter(r => {
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  });
}

module.exports = {
  // Agency analytics
  addEarning,
  getEarningsByAgency,
  addPerformance,
  getPerformanceByAgency,
  // Content analytics
  getAllContentAnalytics,
  getContentAnalytics,
  upsertContentAnalytics,
  addFeedback,
  getFeedbackByContent,
  updateFeedbackScore,
  // Learning analytics
  setPathAnalytics,
  getPathAnalytics,
  setUserAnalytics,
  getUserAnalytics,
  setUserSkills,
  getUserSkills,
  setPrediction,
  getPrediction,
  // Volunteer and organization analytics
  addVolunteerEngagement,
  getVolunteerEngagement,
  addOrganizationProjectStat,
  getOrganizationProjectAnalytics,
};

