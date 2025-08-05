const {
  getAgencyEarnings,
  getAgencyPerformance,
  getContentPerformance,
  getContentPerformanceById,
  detectPerformanceAnomalies,
  getContentTrends,
  getPopularContent,
  getContentRecommendations,
  submitContentFeedback,
  getPathAnalytics,
  getUserAnalytics,
  getSkillsAnalytics,
  getLearningPredictions,
} = require('../services/analytics');
const logger = require('../utils/logger');

// -----------------------------
// Agency analytics handlers
// -----------------------------
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
    res.status(404).json({ error: err.message });
  }
}

// -----------------------------
// Content analytics handlers
// -----------------------------
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
    logger.error('Failed to fetch content performance by id', { contentId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

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

// -----------------------------
// Learning analytics handlers
// -----------------------------
async function getPathAnalyticsHandler(req, res) {
  const { pathId } = req.params;
  try {
    const data = await getPathAnalytics(pathId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch path analytics', { pathId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getUserAnalyticsHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getUserAnalytics(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch user analytics', { userId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getSkillsAnalyticsHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getSkillsAnalytics(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch skills analytics', { userId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getPredictionsHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getLearningPredictions(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch learning predictions', { userId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getAgencyEarningsHandler,
  getAgencyPerformanceHandler,
  getContentPerformanceHandler,
  getContentPerformanceByIdHandler,
  detectAnomaliesHandler,
  getContentTrendsHandler,
  getPopularContentHandler,
  getContentRecommendationsHandler,
  submitContentFeedbackHandler,
  getPathAnalyticsHandler,
  getUserAnalyticsHandler,
  getSkillsAnalyticsHandler,
  getPredictionsHandler,
};

