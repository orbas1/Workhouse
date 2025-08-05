const { getAgencyEarnings, getAgencyPerformance } = require('../services/analytics');
const logger = require('../utils/logger');

async function getAgencyEarningsHandler(req, res) {
  const { agencyId } = req.params;
  const { startDate, endDate } = req.query;
  try {
    const data = await getAgencyEarnings(agencyId, {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch agency earnings analytics', { agencyId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getAgencyPerformanceHandler(req, res) {
  const { agencyId } = req.params;
  const { startDate, endDate } = req.query;
  try {
    const data = await getAgencyPerformance(agencyId, {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch agency performance analytics', { agencyId, error: err.message });
const {
  getContentPerformance,
  getContentPerformanceById,
  detectPerformanceAnomalies,
  getContentTrends,
  getPopularContent,
  getContentRecommendations,
  submitContentFeedback,
} = require('../services/analytics');
const logger = require('../utils/logger');

async function getContentPerformanceHandler(req, res) {
  try {
    const data = await getContentPerformance();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch content performance', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getContentPerformanceByIdHandler(req, res) {
  const { contentId } = req.params;
  try {
    const data = await getContentPerformanceById(contentId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch content performance by id', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getAgencyEarningsHandler,
  getAgencyPerformanceHandler,
async function detectAnomaliesHandler(req, res) {
  const { metrics, threshold } = req.body;
  try {
    const result = await detectPerformanceAnomalies(metrics, threshold);
    res.json(result);
  } catch (err) {
    logger.error('Failed to detect anomalies', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getContentTrendsHandler(req, res) {
  try {
    const data = await getContentTrends();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch content trends', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getPopularContentHandler(req, res) {
  try {
    const data = await getPopularContent();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch popular content', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getContentRecommendationsHandler(req, res) {
  try {
    const data = await getContentRecommendations(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch content recommendations', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function submitContentFeedbackHandler(req, res) {
  const { contentId, rating, comment } = req.body;
  const userId = req.user?.id;
  try {
    const feedback = await submitContentFeedback(contentId, userId, rating, comment);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit feedback', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getContentPerformanceHandler,
  getContentPerformanceByIdHandler,
  detectAnomaliesHandler,
  getContentTrendsHandler,
  getPopularContentHandler,
  getContentRecommendationsHandler,
  submitContentFeedbackHandler,
};
