const model = require('../models/enhancedUserExperienceML');
const logger = require('../utils/logger');

async function optimizeUserExperience(userId) {
  const optimizedLayout = { theme: 'light', layout: 'compact' };
  const record = model.saveOptimization(userId, optimizedLayout);
  logger.info('User experience optimized', { userId });
  return record;
}

async function getEngagementHeatmap() {
  const heatmap = model.getHeatmap();
  logger.info('Engagement heatmap retrieved', { sections: heatmap.length });
  return heatmap;
}

async function generateContentRecommendations(userId, preferences = {}) {
  const recs = [];
  if (preferences.interests?.includes('jobs')) {
    recs.push('Check recommended jobs');
  }
  if (preferences.interests?.includes('courses')) {
    recs.push('Explore new courses');
  }
  if (recs.length === 0) {
    recs.push('Discover popular content');
  }
  const record = model.saveRecommendations(userId, recs);
  logger.info('Content recommendations generated', { userId, count: recs.length });
  return record;
}

module.exports = {
  optimizeUserExperience,
  getEngagementHeatmap,
  generateContentRecommendations,
};

