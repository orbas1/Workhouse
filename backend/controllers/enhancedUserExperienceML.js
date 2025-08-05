const {
  optimizeUserExperience,
  getEngagementHeatmap,
  generateContentRecommendations,
} = require('../services/enhancedUserExperienceML');
const logger = require('../utils/logger');

async function optimizeUserExperienceHandler(req, res) {
  const userId = req.user?.id;
  try {
    const result = await optimizeUserExperience(userId);
    res.json(result);
  } catch (err) {
    logger.error('Failed to optimize user experience', { userId, error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getEngagementHeatmapHandler(req, res) {
  try {
    const heatmap = await getEngagementHeatmap();
    res.json(heatmap);
  } catch (err) {
    logger.error('Failed to fetch engagement heatmap', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function generateContentRecommendationsHandler(req, res) {
  const { userId, preferences } = req.body;
  try {
    const recommendations = await generateContentRecommendations(userId, preferences);
    res.status(201).json(recommendations);
  } catch (err) {
    logger.error('Failed to generate content recommendations', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  optimizeUserExperienceHandler,
  getEngagementHeatmapHandler,
  generateContentRecommendationsHandler,
};

