const analyticsModel = require('../models/analytics');
const logger = require('../utils/logger');

function ensurePathAnalytics(req, res, next) {
  const { pathId } = req.params;
  const data = analyticsModel.getPathAnalytics(pathId);
  if (!data) {
    logger.error('Path analytics not found', { pathId });
    return res.status(404).json({ error: 'Path analytics not found' });
  }
  req.pathAnalytics = data;
  next();
}

function ensureUserAnalytics(req, res, next) {
  const { userId } = req.params;
  const data = analyticsModel.getUserAnalytics(userId);
  if (!data) {
    logger.error('User analytics not found', { userId });
    return res.status(404).json({ error: 'User analytics not found' });
  }
  req.userAnalytics = data;
  next();
}

module.exports = { ensurePathAnalytics, ensureUserAnalytics };

