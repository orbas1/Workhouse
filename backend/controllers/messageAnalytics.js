const {
  getActivityOverview,
  getUserMessagesAnalytics,
  getResponseTimesAnalytics,
} = require('../services/messageAnalytics');
const logger = require('../utils/logger');

async function activityOverviewHandler(req, res) {
  try {
    const data = await getActivityOverview(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve message activity overview', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve message activity overview' });
  }
}

async function userMessagesHandler(req, res) {
  try {
    const { userId } = req.params;
    const data = await getUserMessagesAnalytics(userId, req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve user message analytics', { userId: req.params.userId, error: err.message });
    res.status(500).json({ error: 'Unable to retrieve user message analytics' });
  }
}

async function responseTimesHandler(req, res) {
  try {
    const data = await getResponseTimesAnalytics(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve message response time analytics', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve message response time analytics' });
  }
}

module.exports = {
  activityOverviewHandler,
  userMessagesHandler,
  responseTimesHandler,
};
