const webinarAnalyticsModel = require('../models/webinarAnalytics');
const logger = require('../utils/logger');

async function getWebinarOverview() {
  const webinars = webinarAnalyticsModel.getAllWebinarAnalytics();
  const totalWebinars = webinars.length;
  const totalAttendees = webinars.reduce((sum, w) => sum + (w.overview.attendees || 0), 0);
  const averageEngagement =
    webinars.length === 0
      ? 0
      : webinars.reduce((sum, w) => sum + (w.engagement.engagementRate || 0), 0) / webinars.length;

  logger.info('Retrieved webinar overview', { totalWebinars });
  return { totalWebinars, totalAttendees, averageEngagement };
}

async function getWebinarDetails(webinarId) {
  const data = webinarAnalyticsModel.getWebinarAnalytics(webinarId);
  if (!data) {
    throw new Error('Webinar analytics not found');
  }
  logger.info('Fetched webinar analytics details', { webinarId });
  return data;
}

async function getWebinarEngagement(webinarId) {
  const data = webinarAnalyticsModel.getWebinarAnalytics(webinarId);
  if (!data) {
    throw new Error('Webinar analytics not found');
  }
  logger.info('Retrieved webinar engagement metrics', { webinarId });
  return data.engagement;
}

async function getBehaviorOverview() {
  const behaviors = webinarAnalyticsModel.getAllUserBehavior();
  const totalUsers = behaviors.length;
  const avgSessionDuration =
    behaviors.length === 0
      ? 0
      : behaviors.reduce((sum, b) => sum + (b.behavior.sessionDuration || 0), 0) / behaviors.length;

  logger.info('Retrieved user behavior overview', { totalUsers });
  return { totalUsers, avgSessionDuration };
}

async function getUserBehavior(userId) {
  const record = webinarAnalyticsModel.getUserBehavior(userId);
  if (!record) {
    throw new Error('User behavior analytics not found');
  }
  logger.info('Fetched user behavior analytics', { userId });
  return record.behavior;
}

async function getCreatorWebinars(ownerId) {
  logger.info('Fetching creator webinars', { ownerId });
  return webinarAnalyticsModel.getWebinarsByOwner(ownerId);
}

async function getPopularPages() {
  const behaviors = webinarAnalyticsModel.getAllUserBehavior();
  const pageCounts = {};
  behaviors.forEach(({ behavior }) => {
    (behavior.pageViews || []).forEach(({ page, count }) => {
      pageCounts[page] = (pageCounts[page] || 0) + count;
    });
  });
  const popularPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([page, count]) => ({ page, count }));
  logger.info('Computed popular pages');
  return popularPages;
}

async function getSessionDurationAnalytics() {
  const behaviors = webinarAnalyticsModel.getAllUserBehavior();
  const avgSessionDuration =
    behaviors.length === 0
      ? 0
      : behaviors.reduce((sum, b) => sum + (b.behavior.sessionDuration || 0), 0) / behaviors.length;
  logger.info('Retrieved session duration analytics');
  return { avgSessionDuration };
}

async function getUserFlowAnalytics() {
  const behaviors = webinarAnalyticsModel.getAllUserBehavior();
  const flows = behaviors.map(b => b.behavior.flow || []);
  logger.info('Retrieved user flow analytics');
  return { flows };
}

async function getUserSegments() {
  const behaviors = webinarAnalyticsModel.getAllUserBehavior();
  const segments = {};
  behaviors.forEach(b => {
    (b.behavior.segments || []).forEach(seg => {
      segments[seg] = (segments[seg] || 0) + 1;
    });
  });
  logger.info('Computed user segments');
  return segments;
}

async function getBehaviorTrends() {
  const behaviors = webinarAnalyticsModel.getAllUserBehavior();
  const trends = behaviors.map(b => ({
    userId: b.userId,
    timestamp: b.createdAt,
  }));
  logger.info('Retrieved behavior trends');
  return trends;
}

async function analyzeBehaviorPatterns(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Data array is required for analysis');
  }
  const patternCounts = {};
  data.forEach(evt => {
    const action = evt.action || 'unknown';
    patternCounts[action] = (patternCounts[action] || 0) + 1;
  });
  logger.info('Analyzed behavior patterns');
  return patternCounts;
}

async function predictUserBehavior(history) {
  if (!Array.isArray(history) || history.length === 0) {
    throw new Error('History array is required for prediction');
  }
  const lastAction = history[history.length - 1]?.action || 'unknown';
  logger.info('Predicted user behavior', { lastAction });
  return { nextLikelyAction: lastAction };
}

async function segmentUserBehavior(attributes) {
  if (!Array.isArray(attributes) || attributes.length === 0) {
    throw new Error('Attributes array is required for segmentation');
  }
  const segments = attributes.reduce((acc, attr) => {
    acc[attr] = (acc[attr] || 0) + 1;
    return acc;
  }, {});
  logger.info('Segmented user behavior');
  return segments;
}

module.exports = {
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
  getCreatorWebinars,
};
