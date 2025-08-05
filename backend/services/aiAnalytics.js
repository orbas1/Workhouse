const logger = require('../utils/logger');
const model = require('../models/aiAnalytics');

async function getInsights(domain) {
  const data = model.findInsightsByDomain(domain);
  logger.info('AI insights retrieved', { domain, count: data.length });
  return data;
}

async function getRecommendations(userId) {
  const data = model.findRecommendationsByUser(userId);
  logger.info('AI recommendations retrieved', { userId, count: data.length });
  return data;
}

module.exports = {
  getInsights,
  getRecommendations,
};
