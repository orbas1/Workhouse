const logger = require('../utils/logger');
const model = require('../models/gigAnalytics');

async function getMarketTrends() {
  logger.info('Fetching gig market trends');
  return model.fetchMarketTrends();
}

async function getJobAnalytics(jobId) {
  const analytics = model.fetchJobAnalytics(jobId);
  if (!analytics) {
    throw new Error('Gig job not found');
  }
  logger.info('Fetched gig job analytics', { jobId });
  return analytics;
}

async function getCompletionRates() {
  logger.info('Retrieving gig completion rates');
  return model.fetchCompletionRates();
}

async function getSatisfactionAnalytics() {
  logger.info('Retrieving gig satisfaction analytics');
  return model.fetchSatisfactionAnalytics();
}

module.exports = {
  getMarketTrends,
  getJobAnalytics,
  getCompletionRates,
  getSatisfactionAnalytics,
};
