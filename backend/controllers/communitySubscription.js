const {
  subscribeToCommunity,
  checkAccess,
  listSubscribers,
} = require('../services/communitySubscription');
const logger = require('../utils/logger');

async function subscribeHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  const { communityId } = req.params;
  try {
    const sub = await subscribeToCommunity(userId, communityId);
    res.status(201).json(sub);
  } catch (err) {
    logger.error('Failed to subscribe to community', { error: err.message, communityId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function checkAccessHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  const { communityId } = req.params;
  try {
    const result = await checkAccess(userId, communityId);
    res.json(result);
  } catch (err) {
    logger.error('Failed to check community access', { error: err.message, communityId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function listSubscribersHandler(req, res) {
  const { communityId } = req.params;
  try {
    const result = await listSubscribers(communityId);
    res.json(result);
  } catch (err) {
    logger.error('Failed to list community subscribers', { error: err.message, communityId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  subscribeHandler,
  checkAccessHandler,
  listSubscribersHandler,
};
