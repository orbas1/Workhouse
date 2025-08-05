const { getReward, getBadge } = require('../services/gamification');
const logger = require('../utils/logger');

function ensureRewardExists(req, res, next) {
  const { rewardId } = req.body;
  if (!getReward(rewardId)) {
    logger.error('Reward not found', { rewardId });
    return res.status(404).json({ error: 'Reward not found' });
  }
  next();
}

function ensureBadgeExists(req, res, next) {
  const { badgeId } = req.body;
  if (!getBadge(badgeId)) {
    logger.error('Badge not found', { badgeId });
    return res.status(404).json({ error: 'Badge not found' });
  }
  next();
}

module.exports = { ensureRewardExists, ensureBadgeExists };
