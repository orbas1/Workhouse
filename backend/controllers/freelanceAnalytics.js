const {
  fetchMarketTrends,
  fetchJobAnalytics,
  fetchFreelancerPerformance,
  fetchClientSatisfaction,
} = require('../services/freelanceAnalytics');
const logger = require('../utils/logger');

async function marketTrendsHandler(req, res) {
  try {
    const data = await fetchMarketTrends(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve freelance market trends', { error: err.message });
    res.status(err.status || 500).json({ error: 'Unable to retrieve market trends' });
  }
}

async function jobAnalyticsHandler(req, res) {
  try {
    const data = await fetchJobAnalytics(req.params.jobId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve job analytics', { error: err.message, jobId: req.params.jobId });
    const status = err.status || 500;
    const message = status === 404 ? 'Job analytics not found' : 'Unable to retrieve job analytics';
    res.status(status).json({ error: message });
  }
}

async function freelancerPerformanceHandler(req, res) {
  try {
    const data = await fetchFreelancerPerformance(req.params.freelancerId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve freelancer performance', { error: err.message, freelancerId: req.params.freelancerId });
    const status = err.status || 500;
    const message = status === 404 ? 'Freelancer performance not found' : 'Unable to retrieve freelancer performance';
    res.status(status).json({ error: message });
  }
}

async function clientSatisfactionHandler(req, res) {
  try {
    const data = await fetchClientSatisfaction(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve client satisfaction analytics', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve client satisfaction analytics' });
  }
}

module.exports = {
  marketTrendsHandler,
  jobAnalyticsHandler,
  freelancerPerformanceHandler,
  clientSatisfactionHandler,
};
