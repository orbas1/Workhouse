const service = require('../services/userAnalytics');
const logger = require('../utils/logger');

async function getEngagementOverview(req, res) {
  try {
    const data = await service.getEngagementOverview(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get engagement overview', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve engagement overview' });
  }
}

async function getUserActivity(req, res) {
  const { userId } = req.params;
  try {
    const data = await service.getUserActivity(userId, req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get user activity', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to retrieve user activity' });
  }
}

async function getConversionRates(req, res) {
  try {
    const data = await service.getConversionRates(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get conversion rates', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve conversion rates' });
  }
}

async function getDemographics(req, res) {
  try {
    const data = await service.getDemographics();
    res.json(data);
  } catch (err) {
    logger.error('Failed to get demographics', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve demographics' });
  }
}

async function getBehaviorOverview(req, res) {
  try {
    const data = await service.getBehaviorOverview(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get behavior overview', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve behavior overview' });
  }
}

async function getUserBehavior(req, res) {
  const { userId } = req.params;
  try {
    const data = await service.getUserBehavior(userId, req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get user behavior', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to retrieve user behavior' });
  }
}

async function getPopularPages(req, res) {
  try {
    const data = await service.getPopularPages(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get popular pages', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve popular pages' });
  }
}

async function getSessionDurationAnalytics(req, res) {
  try {
    const data = await service.getSessionDurationAnalytics(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get session duration analytics', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve session duration analytics' });
  }
}

async function getUserFlowAnalytics(req, res) {
  try {
    const data = await service.getUserFlowAnalytics(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get user flow analytics', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve user flow analytics' });
  }
}

async function getUserSegments(req, res) {
  try {
    const data = await service.getUserSegments(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get user segments', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve user segments' });
  }
}

async function getBehaviorTrends(req, res) {
  try {
    const data = await service.getBehaviorTrends(req.analyticsQuery);
    res.json(data);
  } catch (err) {
    logger.error('Failed to get behavior trends', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve behavior trends' });
  }
}

async function analyzeBehaviorPatterns(req, res) {
  try {
    const data = await service.analyzeBehaviorPatterns(req.body);
    res.json(data);
  } catch (err) {
    logger.error('Failed to analyze behavior patterns', { error: err.message });
    res.status(500).json({ error: 'Failed to analyze behavior patterns' });
  }
}

async function predictUserBehavior(req, res) {
  try {
    const data = await service.predictUserBehavior(req.body);
    res.json(data);
  } catch (err) {
    logger.error('Failed to predict user behavior', { error: err.message });
    res.status(500).json({ error: 'Failed to predict user behavior' });
  }
}

async function segmentUserBehavior(req, res) {
  try {
    const data = await service.segmentUserBehavior(req.body);
    res.json(data);
  } catch (err) {
    logger.error('Failed to segment user behavior', { error: err.message });
    res.status(500).json({ error: 'Failed to segment user behavior' });
  }
}

module.exports = {
  getEngagementOverview,
  getUserActivity,
  getConversionRates,
  getDemographics,
  getBehaviorOverview,
  getUserBehavior,
  getPopularPages,
  getSessionDurationAnalytics,
  getUserFlowAnalytics,
  getUserSegments,
  getBehaviorTrends,
  analyzeBehaviorPatterns,
  predictUserBehavior,
  segmentUserBehavior,
};

