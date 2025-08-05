const { fetchTrendingTopics, curateUserFeed } = require('../services/contentDiscovery');
const logger = require('../utils/logger');

async function getTrendingTopicsHandler(req, res) {
  const { limit } = req.query;
  try {
    const topics = await fetchTrendingTopics(limit);
    res.json(topics);
  } catch (err) {
    logger.error('Failed to retrieve trending topics', { error: err.message });
    res.status(500).json({ error: 'Unable to fetch trending topics' });
  }
}

async function curateFeedHandler(req, res) {
  const userId = req.user?.id;
  const { interests, interactions, feedback } = req.body;
  try {
    const feed = await curateUserFeed(userId, { interests, interactions, feedback });
    res.status(201).json(feed);
  } catch (err) {
    logger.error('Failed to curate feed', { error: err.message, userId });
    res.status(500).json({ error: 'Unable to curate feed' });
  }
}

module.exports = {
  getTrendingTopicsHandler,
  curateFeedHandler,
};
