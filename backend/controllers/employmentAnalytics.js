const {
  getEmploymentOverview,
  getJobAnalytics,
  getApplicationAnalytics,
} = require('../services/employmentAnalytics');
const logger = require('../utils/logger');

async function overviewHandler(req, res) {
  try {
    const data = await getEmploymentOverview();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch employment overview', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve overview' });
  }
}

async function jobAnalyticsHandler(req, res) {
  const { jobId } = req.params;
  try {
    const data = await getJobAnalytics(jobId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch job analytics', { error: err.message, jobId });
    res.status(404).json({ error: err.message });
  }
}

async function applicationAnalyticsHandler(req, res) {
  try {
    const data = await getApplicationAnalytics();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch application analytics', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
}

module.exports = {
  overviewHandler,
  jobAnalyticsHandler,
  applicationAnalyticsHandler,
};
