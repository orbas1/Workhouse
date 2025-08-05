const {
  getAllAnalytics,
  getAnalyticsByCategory,
  getAnalyticsById,
} = require('../services/disputeAnalytics');
const logger = require('../utils/logger');

async function getAllDisputesAnalytics(req, res) {
  try {
    const analytics = await getAllAnalytics();
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch all dispute analytics', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getDisputesByCategoryHandler(req, res) {
  const { category } = req.query;
  try {
    const analytics = await getAnalyticsByCategory(category);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch dispute analytics by category', {
      error: err.message,
    });
    res.status(500).json({ error: err.message });
  }
}

async function getDisputeAnalyticsByIdHandler(req, res) {
  const { disputeId } = req.params;
  try {
    const analytics = await getAnalyticsById(disputeId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch dispute analytics by ID', {
      error: err.message,
      disputeId,
    });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getAllDisputesAnalytics,
  getDisputesByCategoryHandler,
  getDisputeAnalyticsByIdHandler,
};
