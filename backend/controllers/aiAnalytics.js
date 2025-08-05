const { getInsights, getRecommendations } = require('../services/aiAnalytics');
const logger = require('../utils/logger');

async function insightsHandler(req, res) {
  const { domain } = req.params;
  try {
    const insights = await getInsights(domain);
    res.json({ domain, insights });
  } catch (err) {
    logger.error('Failed to fetch AI insights', { error: err.message, domain });
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
}

async function recommendationsHandler(req, res) {
  const { userId } = req.params;
  try {
    const recommendations = await getRecommendations(userId);
    res.json({ userId, recommendations });
  } catch (err) {
    logger.error('Failed to fetch AI recommendations', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
}

module.exports = {
  insightsHandler,
  recommendationsHandler,
};
