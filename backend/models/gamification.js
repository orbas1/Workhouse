const { randomUUID } = require('crypto');

// In-memory data stores
const leaderboardEntries = [];
const badges = [
  { id: 'badge-1', name: 'First Course', description: 'Completed first course' },
];
const userBadges = [];
const rewards = [
  { id: 'reward-1', name: 'Free Course', description: 'Access to a free course', pointsRequired: 100 },
];
const rewardClaims = [];

function getLeaderboardEntries(courseId) {
  return leaderboardEntries
    .filter((e) => e.courseId === courseId)
    .sort((a, b) => b.points - a.points);
}

function addRewardClaim({ userId, rewardId }) {
  const claim = { id: randomUUID(), userId, rewardId, claimedAt: new Date() };
  rewardClaims.push(claim);
  return claim;
}

function findRewardById(rewardId) {
  return rewards.find((r) => r.id === rewardId);
}

function hasClaimedReward(userId, rewardId) {
  return rewardClaims.some((c) => c.userId === userId && c.rewardId === rewardId);
}

function addUserBadge({ userId, badgeId }) {
  const record = { id: randomUUID(), userId, badgeId, earnedAt: new Date() };
  userBadges.push(record);
  return record;
}

function listUserBadges(userId) {
  return userBadges
    .filter((b) => b.userId === userId)
    .map((b) => ({
      ...b,
      badge: badges.find((bd) => bd.id === b.badgeId) || null,
    }));
}

function findBadgeById(badgeId) {
  return badges.find((b) => b.id === badgeId);
}

function hasUserBadge(userId, badgeId) {
  return userBadges.some((b) => b.userId === userId && b.badgeId === badgeId);
}

module.exports = {
  getLeaderboardEntries,
  addRewardClaim,
  findRewardById,
  hasClaimedReward,
  addUserBadge,
  listUserBadges,
  findBadgeById,
  hasUserBadge,
};
