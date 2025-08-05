const logger = require('../utils/logger');
const model = require('../models/employmentAnalytics');

async function getEmploymentOverview() {
  logger.info('Fetching employment overview analytics');
  return model.getOverview();
}

async function getJobAnalytics(jobId) {
  const stats = model.getJobStats(jobId);
  if (!stats) {
    throw new Error('Job not found');
  }
  logger.info('Fetched job analytics', { jobId });
  return stats;
}

async function getApplicationAnalytics() {
  logger.info('Fetching application analytics');
  return model.getApplicationStats();
}

async function listJobs() {
  logger.info('Listing employment jobs');
  return model.listJobs();
}

module.exports = {
  getEmploymentOverview,
  getJobAnalytics,
  getApplicationAnalytics,
  listJobs,
};
