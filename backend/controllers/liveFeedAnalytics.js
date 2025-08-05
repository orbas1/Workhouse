const { getEngagement, getPostAnalytics } = require('../services/liveFeedAnalytics');
const logger = require('../utils/logger');

async function engagementHandler(req, res) {
  try {
    const data = await getEngagement(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve live feed engagement analytics', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve live feed engagement analytics' });
  }
}

async function postAnalyticsHandler(req, res) {
  const { postId } = req.params;
  try {
    const data = await getPostAnalytics(postId, req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve live feed post analytics', { postId, error: err.message });
    res.status(404).json({ error: 'Live feed post analytics not found' });
  }
}

module.exports = {
  engagementHandler,
  postAnalyticsHandler,
};
