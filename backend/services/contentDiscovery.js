const contentDiscoveryModel = require('../models/contentDiscovery');
const logger = require('../utils/logger');

async function fetchTrendingTopics(limit) {
  const topics = contentDiscoveryModel.getTrendingTopics(limit);
  logger.info('Retrieved trending topics', { count: topics.length });
  return topics;
}

async function curateUserFeed(userId, { interests = [], interactions = [], feedback = [] }) {
  const trending = contentDiscoveryModel.getTrendingTopics();
  const curatedContent = trending.filter(t => interests.includes(t.topic));

  const record = contentDiscoveryModel.saveCuratedFeed({
    userId,
    interests,
    interactions,
    feedback,
    curatedContent,
  });

  logger.info('Curated feed generated', { userId, items: curatedContent.length });
  return record;
}

module.exports = {
  fetchTrendingTopics,
  curateUserFeed,
};
