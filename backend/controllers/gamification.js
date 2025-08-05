const {
  getLeaderboard,
  claimReward,
  awardBadge,
  listBadges,
} = require('../services/gamification');
const logger = require('../utils/logger');

async function getLeaderboardHandler(req, res) {
  const { courseId } = req.params;
  try {
    const data = await getLeaderboard(courseId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch leaderboard', { error: err.message, courseId });
    res.status(err.status || 500).json({ error: 'Failed to fetch leaderboard' });
  }
}

async function claimRewardHandler(req, res) {
  try {
    const claim = await claimReward(req.body);
    res.status(201).json(claim);
  } catch (err) {
    logger.error('Failed to claim reward', { error: err.message });
    res.status(err.status || 400).json({ error: err.message });
  }
}

async function earnBadgeHandler(req, res) {
  const { userId } = req.params;
  const { badgeId } = req.body;
  try {
    const record = await awardBadge(userId, badgeId);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to award badge', { error: err.message, userId });
    res.status(err.status || 400).json({ error: err.message });
  }
}

async function listBadgesHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await listBadges(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to list badges', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to list badges' });
  }
}

module.exports = {
  getLeaderboardHandler,
  claimRewardHandler,
  earnBadgeHandler,
  listBadgesHandler,
};
