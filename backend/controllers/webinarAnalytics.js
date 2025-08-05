const {
  getWebinarOverview,
  getWebinarDetails,
  getWebinarEngagement,
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
} = require('../services/webinarAnalytics');
const logger = require('../utils/logger');

async function getWebinarOverviewHandler(req, res) {
  try {
    const data = await getWebinarOverview();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch webinar overview', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getWebinarDetailsHandler(req, res) {
  const { webinarId } = req.params;
  try {
    const data = await getWebinarDetails(webinarId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch webinar details', { webinarId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getWebinarEngagementHandler(req, res) {
  const { webinarId } = req.params;
  try {
    const data = await getWebinarEngagement(webinarId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch webinar engagement', { webinarId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getBehaviorOverviewHandler(req, res) {
  try {
    const data = await getBehaviorOverview();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch behavior overview', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getUserBehaviorHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getUserBehavior(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch user behavior', { userId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getPopularPagesHandler(req, res) {
  try {
    const data = await getPopularPages();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch popular pages', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getSessionDurationHandler(req, res) {
  try {
    const data = await getSessionDurationAnalytics();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch session duration analytics', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getUserFlowHandler(req, res) {
  try {
    const data = await getUserFlowAnalytics();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch user flow analytics', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getUserSegmentsHandler(req, res) {
  try {
    const data = await getUserSegments();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch user segments', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getBehaviorTrendsHandler(req, res) {
  try {
    const data = await getBehaviorTrends();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch behavior trends', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function analyzeBehaviorPatternsHandler(req, res) {
  const { data } = req.body;
  try {
    const result = await analyzeBehaviorPatterns(data);
    res.json(result);
  } catch (err) {
    logger.error('Failed to analyze behavior patterns', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function predictUserBehaviorHandler(req, res) {
  const { history } = req.body;
  try {
    const result = await predictUserBehavior(history);
    res.json(result);
  } catch (err) {
    logger.error('Failed to predict user behavior', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function segmentUserBehaviorHandler(req, res) {
  const { attributes } = req.body;
  try {
    const result = await segmentUserBehavior(attributes);
    res.json(result);
  } catch (err) {
    logger.error('Failed to segment user behavior', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getWebinarOverviewHandler,
  getWebinarDetailsHandler,
  getWebinarEngagementHandler,
  getBehaviorOverviewHandler,
  getUserBehaviorHandler,
  getPopularPagesHandler,
  getSessionDurationHandler,
  getUserFlowHandler,
  getUserSegmentsHandler,
  getBehaviorTrendsHandler,
  analyzeBehaviorPatternsHandler,
  predictUserBehaviorHandler,
  segmentUserBehaviorHandler,
};
