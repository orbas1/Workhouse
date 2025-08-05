const model = require('../models/userAnalytics');
const logger = require('../utils/logger');

async function getEngagementOverview(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchEngagementOverview(startDate, endDate);
  logger.info('Engagement overview retrieved', { startDate, endDate });
  return data;
}

async function getUserActivity(userId, query) {
  const { startDate, endDate } = query;
  const data = await model.fetchUserActivity(userId, startDate, endDate);
  logger.info('User activity retrieved', { userId, startDate, endDate });
  return data;
}

async function getConversionRates(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchConversionRates(startDate, endDate);
  logger.info('Conversion rates retrieved', { startDate, endDate });
  return data;
}

async function getDemographics() {
  const data = await model.fetchDemographics();
  logger.info('Demographics retrieved');
  return data;
}

async function getBehaviorOverview(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchBehaviorOverview(startDate, endDate);
  logger.info('Behavior overview retrieved', { startDate, endDate });
  return data;
}

async function getUserBehavior(userId, query) {
  const { startDate, endDate } = query;
  const data = await model.fetchUserBehavior(userId, startDate, endDate);
  logger.info('User behavior retrieved', { userId, startDate, endDate });
  return data;
}

async function getPopularPages(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchPopularPages(startDate, endDate);
  logger.info('Popular pages retrieved', { startDate, endDate });
  return data;
}

async function getSessionDurationAnalytics(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchSessionDuration(startDate, endDate);
  logger.info('Session duration analytics retrieved', { startDate, endDate });
  return data;
}

async function getUserFlowAnalytics(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchUserFlow(startDate, endDate);
  logger.info('User flow analytics retrieved', { startDate, endDate });
  return data;
}

async function getUserSegments(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchUserSegments(startDate, endDate);
  logger.info('User segments retrieved', { startDate, endDate });
  return data;
}

async function getBehaviorTrends(query) {
  const { startDate, endDate } = query;
  const data = await model.fetchBehaviorTrends(startDate, endDate);
  logger.info('Behavior trends retrieved', { startDate, endDate });
  return data;
}

async function analyzeBehaviorPatterns(payload) {
  const data = await model.analyzeBehaviorPatterns(payload);
  logger.info('Behavior patterns analyzed');
  return data;
}

async function predictUserBehavior(payload) {
  const data = await model.predictUserBehavior(payload);
  logger.info('User behavior predicted', { userId: payload.userId, timeframe: payload.timeframe });
  return data;
}

async function segmentUserBehavior(payload) {
  const data = await model.segmentUserBehavior(payload);
  logger.info('User behavior segmented', { segmentBy: payload.segmentBy });
  return data;
}

module.exports = {
  getEngagementOverview,
  getUserActivity,
  getConversionRates,
  getDemographics,
  getBehaviorOverview,
  getUserBehavior,
  getPopularPages,
  getSessionDurationAnalytics,
  getUserFlowAnalytics,
  getUserSegments,
  getBehaviorTrends,
  analyzeBehaviorPatterns,
  predictUserBehavior,
  segmentUserBehavior,
};

