const logger = require('../utils/logger');
const model = require('../models/freelanceAnalytics');

async function fetchMarketTrends(range) {
  const trends = model.getMarketTrends(range);
  logger.info('Retrieved freelance market trends', { count: trends.length });
  return trends;
}

async function fetchJobAnalytics(jobId) {
  const stats = model.getJobAnalytics(jobId);
  if (!stats) {
    const err = new Error('Job analytics not found');
    err.status = 404;
    throw err;
  }
  logger.info('Retrieved job analytics', { jobId });
  return stats;
}

async function fetchFreelancerPerformance(freelancerId) {
  const stats = model.getFreelancerPerformance(freelancerId);
  if (!stats) {
    const err = new Error('Freelancer performance not found');
    err.status = 404;
    throw err;
  }
  logger.info('Retrieved freelancer performance analytics', { freelancerId });
  return stats;
}

async function fetchClientSatisfaction(range) {
  const stats = model.getClientSatisfaction(range);
  logger.info('Retrieved client satisfaction analytics', { count: stats.length });
  return stats;
}

module.exports = {
  fetchMarketTrends,
  fetchJobAnalytics,
  fetchFreelancerPerformance,
  fetchClientSatisfaction,
};
