const logger = require('../utils/logger');
const model = require('../models/liveFeedAnalytics');

async function getEngagement(range) {
  const records = model.getEngagement(range);
  const totals = records.reduce(
    (acc, r) => {
      acc.views += r.views;
      acc.likes += r.likes;
      acc.comments += r.comments;
      acc.shares += r.shares;
      return acc;
    },
    { views: 0, likes: 0, comments: 0, shares: 0 }
  );
  logger.info('Retrieved live feed engagement analytics', { count: records.length });
  return { totals, records };
}

async function getPostAnalytics(postId, range) {
  const records = model.getPostAnalytics(postId, range);
  const totals = records.reduce(
    (acc, r) => {
      acc.views += r.views;
      acc.likes += r.likes;
      acc.comments += r.comments;
      acc.shares += r.shares;
      return acc;
    },
    { views: 0, likes: 0, comments: 0, shares: 0 }
  );
  logger.info('Retrieved analytics for live feed post', { postId, count: records.length });
  return { postId, totals, records };
}

module.exports = {
  getEngagement,
  getPostAnalytics,
};
