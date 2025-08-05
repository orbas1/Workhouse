const {
  getLeaderboardEntries,
  addRewardClaim,
  findRewardById,
  hasClaimedReward,
  addUserBadge,
  listUserBadges,
  findBadgeById,
  hasUserBadge,
} = require('../models/gamification');
const logger = require('../utils/logger');

async function getLeaderboard(courseId) {
  return getLeaderboardEntries(courseId);
}

async function claimReward({ userId, rewardId }) {
  const reward = findRewardById(rewardId);
  if (!reward) {
    const err = new Error('Reward not found');
    err.status = 404;
    throw err;
  }
  if (hasClaimedReward(userId, rewardId)) {
    const err = new Error('Reward already claimed');
    err.status = 409;
    throw err;
  }
  const claim = addRewardClaim({ userId, rewardId });
  logger.info('Reward claimed', { userId, rewardId });
  return claim;
}

async function awardBadge(userId, badgeId) {
  const badge = findBadgeById(badgeId);
  if (!badge) {
    const err = new Error('Badge not found');
    err.status = 404;
    throw err;
  }
  if (hasUserBadge(userId, badgeId)) {
    const err = new Error('Badge already awarded');
    err.status = 409;
    throw err;
  }
  const record = addUserBadge({ userId, badgeId });
  logger.info('Badge awarded', { userId, badgeId });
  return record;
}

async function listBadges(userId) {
  return listUserBadges(userId);
}

function getReward(rewardId) {
  return findRewardById(rewardId);
}

function getBadge(badgeId) {
  return findBadgeById(badgeId);
}

module.exports = {
  getLeaderboard,
  claimReward,
  awardBadge,
  listBadges,
  getReward,
  getBadge,
};
