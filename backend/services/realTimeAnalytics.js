const logger = require('../utils/logger');
const model = require('../models/realTimeAnalytics');

async function getRealTimeAnalytics(domain) {
  const data = model.getRealTime(domain);
  if (!data) {
    throw new Error('Real-time analytics not found');
  }
  logger.info('Real-time analytics retrieved', { domain });
  return data;
}

async function getTrendAnalytics(domain) {
  const data = model.getTrend(domain);
  if (!data) {
    throw new Error('Trend analytics not found');
  }
  logger.info('Trend analytics retrieved', { domain });
  return data;
}

async function getUserBehaviorAnalytics(userId) {
  const data = model.getUserBehavior(userId);
  if (!data) {
    throw new Error('User behavior analytics not found');
  }
  logger.info('User behavior analytics retrieved', { userId });
  return data;
}

async function getFinancialForecast() {
  const forecast = model.getFinancialForecast();
  logger.info('Financial forecast retrieved');
  return forecast;
}

async function getSentimentAnalytics(domain) {
  const data = model.getSentiment(domain);
  if (!data) {
    throw new Error('Sentiment analytics not found');
  }
  logger.info('Sentiment analytics retrieved', { domain });
  return data;
}

async function createCustomAnalyticsReport({ name, parameters }) {
  const report = model.createCustomReport({ name, parameters });
  logger.info('Custom analytics report created', { reportId: report.id });
  return report;
}

async function listCustomAnalyticsReports() {
  return model.listCustomReports();
}

async function getCustomAnalyticsReport(reportId) {
  const report = model.getCustomReport(reportId);
  if (!report) {
    throw new Error('Report not found');
  }
  return report;
}

async function updateCustomAnalyticsReport(reportId, data) {
  const report = model.updateCustomReport(reportId, data);
  if (!report) {
    throw new Error('Report not found');
  }
  logger.info('Custom analytics report updated', { reportId });
  return report;
}

async function deleteCustomAnalyticsReport(reportId) {
  const removed = model.deleteCustomReport(reportId);
  if (!removed) {
    throw new Error('Report not found');
  }
  logger.info('Custom analytics report deleted', { reportId });
}

async function getEngagementHeatmap(domain) {
  const data = model.getEngagementHeatmap(domain);
  if (!data) {
    throw new Error('Engagement heatmap not found');
  }
  logger.info('Engagement heatmap retrieved', { domain });
  return data;
}

async function getContentPerformance(contentType) {
  const data = model.getContentPerformance(contentType);
  if (!data) {
    throw new Error('Content performance not found');
  }
  logger.info('Content performance retrieved', { contentType });
  return data;
}

async function getApiUsageAnalytics() {
  const usage = model.getApiUsage();
  logger.info('API usage analytics retrieved');
  return usage;
}

async function getEducationOutcomes(courseId) {
  const data = model.getEducationOutcome(courseId);
  if (!data) {
    throw new Error('Education outcomes not found');
  }
  logger.info('Education outcomes retrieved', { courseId });
  return data;
}

module.exports = {
  getRealTimeAnalytics,
  getTrendAnalytics,
  getUserBehaviorAnalytics,
  getFinancialForecast,
  getSentimentAnalytics,
  createCustomAnalyticsReport,
  listCustomAnalyticsReports,
  getCustomAnalyticsReport,
  updateCustomAnalyticsReport,
  deleteCustomAnalyticsReport,
  getEngagementHeatmap,
  getContentPerformance,
  getApiUsageAnalytics,
  getEducationOutcomes,
};
