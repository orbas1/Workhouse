const analyticsModel = require('../models/analytics');
const logger = require('../utils/logger');

// -----------------------------
// Agency analytics services
// -----------------------------
async function getAgencyEarnings(agencyId, { startDate, endDate } = {}) {
  const records = analyticsModel.getEarningsByAgency(agencyId);
  if (records.length === 0) {
    throw new Error('No earnings data found for agency');
  }
  let filtered = records;
  if (startDate) {
    filtered = filtered.filter(r => r.date >= startDate);
  }
  if (endDate) {
    filtered = filtered.filter(r => r.date <= endDate);
  }
  const total = filtered.reduce((sum, r) => sum + r.amount, 0);
  logger.info('Earnings analytics retrieved', { agencyId, count: filtered.length });
  return { agencyId, totalEarnings: total, records: filtered };
}

async function getAgencyPerformance(agencyId, { startDate, endDate } = {}) {
  const records = analyticsModel.getPerformanceByAgency(agencyId);
  if (records.length === 0) {
    throw new Error('No performance data found for agency');
  }
  let filtered = records;
  if (startDate) {
    filtered = filtered.filter(r => r.periodStart >= startDate);
  }
  if (endDate) {
    filtered = filtered.filter(r => r.periodEnd <= endDate);
  }

  const employeeMap = new Map();
  let totalTasks = 0;
  let totalRating = 0;
  for (const r of filtered) {
    totalTasks += r.tasksCompleted;
    totalRating += r.rating;
    if (!employeeMap.has(r.employeeId)) {
      employeeMap.set(r.employeeId, { tasksCompleted: 0, ratingSum: 0, entries: 0 });
    }
    const stats = employeeMap.get(r.employeeId);
    stats.tasksCompleted += r.tasksCompleted;
    stats.ratingSum += r.rating;
    stats.entries += 1;
  }

  const employeeStats = Array.from(employeeMap.entries()).map(([employeeId, stats]) => ({
    employeeId,
    tasksCompleted: stats.tasksCompleted,
    averageRating: stats.entries ? stats.ratingSum / stats.entries : 0,
  }));

  const averageRating = filtered.length ? totalRating / filtered.length : 0;
  logger.info('Performance analytics retrieved', { agencyId, employees: employeeStats.length });
  return { agencyId, summary: { totalTasks, averageRating }, employeeStats };
}

// -----------------------------
// Content analytics services
// -----------------------------
async function getContentPerformance() {
  return analyticsModel.getAllContentAnalytics();
}

async function getContentPerformanceById(contentId) {
  const data = analyticsModel.getContentAnalytics(contentId);
  if (!data) {
    throw new Error('Content not found');
  }
  return data;
}

async function detectPerformanceAnomalies(metrics, threshold = 2) {
  const mean = metrics.reduce((sum, m) => sum + m, 0) / metrics.length;
  const variance =
    metrics.reduce((sum, m) => sum + Math.pow(m - mean, 2), 0) / metrics.length;
  const stdDev = Math.sqrt(variance);
  const anomalies = metrics.filter(m => Math.abs(m - mean) > threshold * stdDev);
  logger.info('Anomaly detection executed', { mean, stdDev, threshold, anomalies });
  return { mean, stdDev, anomalies };
}

async function getContentTrends() {
  const data = analyticsModel.getAllContentAnalytics();
  return data.sort((a, b) => b.views - a.views);
}

async function getPopularContent() {
  const data = analyticsModel.getAllContentAnalytics();
  return data.sort((a, b) => b.engagementRate - a.engagementRate).slice(0, 5);
}

async function getContentRecommendations(userPrefs = {}) {
  // Simple recommendation: reuse popular content
  return getPopularContent();
}

async function submitContentFeedback(contentId, userId, rating, comment) {
  const feedback = analyticsModel.addFeedback({
    contentId,
    userId,
    rating,
    comment,
  });
  analyticsModel.updateFeedbackScore(contentId);
  logger.info('Feedback recorded', { contentId, userId });
  return feedback;
}

// -----------------------------
// Learning analytics services
// -----------------------------
async function getPathAnalytics(pathId) {
  const data = analyticsModel.getPathAnalytics(pathId);
  if (!data) {
    throw new Error('Analytics not found for path');
  }
  return data;
}

async function getUserAnalytics(userId) {
  const data = analyticsModel.getUserAnalytics(userId);
  if (!data) {
    throw new Error('Analytics not found for user');
  }
  return data;
}

async function getSkillsAnalytics(userId) {
  return analyticsModel.getUserSkills(userId);
}

async function getLearningPredictions(userId) {
  let prediction = analyticsModel.getPrediction(userId);
  if (!prediction) {
    // Generate a naive prediction based on user analytics
    const analytics = analyticsModel.getUserAnalytics(userId);
    if (!analytics) {
      throw new Error('Analytics not found for user');
    }
    const completionRate = analytics.pathsEnrolled
      ? analytics.pathsCompleted / analytics.pathsEnrolled
      : 0;
    const confidence = Math.min(0.9, completionRate + 0.1);
    const message = completionRate > 0.7
      ? 'High likelihood of completing current paths'
      : 'Focus required to improve completion rate';
    prediction = analyticsModel.setPrediction(userId, message, confidence);
  }
  return prediction;
}

module.exports = {
  getAgencyEarnings,
  getAgencyPerformance,
  getContentPerformance,
  getContentPerformanceById,
  detectPerformanceAnomalies,
  getContentTrends,
  getPopularContent,
  getContentRecommendations,
  submitContentFeedback,
  getPathAnalytics,
  getUserAnalytics,
  getSkillsAnalytics,
  getLearningPredictions,
};

