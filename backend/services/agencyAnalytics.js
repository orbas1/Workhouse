const logger = require('../utils/logger');
const agencyAnalyticsModel = require('../models/agencyAnalytics');

async function getAgencyAnalytics(agencyId) {
  const analytics = agencyAnalyticsModel.getAnalytics(agencyId);
  if (!analytics) {
    throw new Error('Agency analytics not found');
  }
  logger.info('Agency analytics retrieved', { agencyId });
  return analytics;
}

async function saveAgencyAnalytics(agencyId, metrics) {
  const record = agencyAnalyticsModel.saveAnalytics(agencyId, metrics);
  logger.info('Agency analytics saved', { agencyId });
  return record;
}

module.exports = {
  getAgencyAnalytics,
  saveAgencyAnalytics,
};
