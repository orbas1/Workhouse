const subscriptionModel = require('../models/communitySubscription');
const profileModel = require('../models/profile');
const logger = require('../utils/logger');

async function subscribeToCommunity(userId, communityId) {
  const owner = profileModel.findByUserId(communityId);
  if (!owner) {
    logger.error('Community not found', { communityId });
    throw new Error('Community not found');
  }
  const price = owner.communityPrice || 0;
  const sub = subscriptionModel.subscribe(communityId, userId, price);
  logger.info('Community subscription created', { communityId, userId });
  return sub;
}

async function checkAccess(userId, communityId) {
  const access = userId === communityId || subscriptionModel.hasAccess(communityId, userId);
  return { access };
}

async function listSubscribers(communityId) {
  const subs = subscriptionModel.listSubscribers(communityId);
  return { count: subs.length };
}

module.exports = {
  subscribeToCommunity,
  checkAccess,
  listSubscribers,
};
