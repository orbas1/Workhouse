const logger = require('../utils/logger');
const model = require('../models/mlAnalytics');

async function getRecommendations(userId) {
  const data = model.findRecommendationsByUser(userId);
  logger.info('ML recommendations retrieved', { userId, count: data.length });
  return data;
}

async function getInsights(domain) {
  const data = model.findInsightsByDomain(domain);
  logger.info('ML insights retrieved', { domain, count: data.length });
  return data;
}

async function runCustomQuery(query, parameters) {
  const result = model.addCustomQuery(query, parameters);
  logger.info('ML custom query executed', { query });
  return result;
}

async function getContentPerformanceAnalysis() {
  const data = model.getContentPerformance();
  logger.info('ML content performance analysis retrieved', { count: data.length });
  return data;
}

async function getUserBehaviorPatterns(userId) {
  const data = model.findUserBehaviorByUser(userId);
  logger.info('ML user behavior patterns retrieved', { userId, count: data.length });
  return data;
}

async function getFinancialForecasting() {
  const data = model.getFinancialForecast();
  logger.info('ML financial forecast retrieved');
  return data;
}

async function getSentimentAnalysis(domain) {
  const data = model.findSentimentByDomain(domain);
  logger.info('ML sentiment analysis retrieved', { domain, count: data.length });
  return data;
}

module.exports = {
  getRecommendations,
  getInsights,
  runCustomQuery,
  getContentPerformanceAnalysis,
  getUserBehaviorPatterns,
  getFinancialForecasting,
  getSentimentAnalysis,
};

