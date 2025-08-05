const {
  getMarketTrends,
  getJobAnalytics,
  getCompletionRates,
  getSatisfactionAnalytics,
} = require('../services/gigAnalytics');
const logger = require('../utils/logger');

async function marketTrendsHandler(req, res) {
  try {
    const data = await getMarketTrends();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch gig market trends', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve market trends' });
  }
}

async function jobAnalyticsHandler(req, res) {
  const { jobId } = req.params;
  try {
    const data = await getJobAnalytics(jobId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch gig job analytics', { error: err.message, jobId });
    res.status(404).json({ error: err.message });
  }
}

async function completionRatesHandler(req, res) {
  try {
    const data = await getCompletionRates();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch gig completion rates', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve completion rates' });
  }
}

async function satisfactionHandler(req, res) {
  try {
    const data = await getSatisfactionAnalytics();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch gig satisfaction analytics', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve satisfaction analytics' });
  }
}

module.exports = {
  marketTrendsHandler,
  jobAnalyticsHandler,
  completionRatesHandler,
  satisfactionHandler,
};
