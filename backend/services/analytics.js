const logger = require('../utils/logger');
const analyticsModel = require('../models/analytics');

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
    metrics.reduce((sum, m) => sum + Math.pow(m - mean, 2), 0) /
    metrics.length;
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
  // Simple recommendation: reuse popular content, could be extended with real ML models
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

module.exports = {
  getContentPerformance,
  getContentPerformanceById,
  detectPerformanceAnomalies,
  getContentTrends,
  getPopularContent,
  getContentRecommendations,
  submitContentFeedback,
};
