const logger = require('../utils/logger');
const workspaceAnalyticsModel = require('../models/workspaceAnalytics');

async function getOverview() {
  const overview = workspaceAnalyticsModel.getOverview();
  logger.info('Workspace overview retrieved');
  return overview;
}

async function getDetails(workspaceId) {
  const details = workspaceAnalyticsModel.getDetails(workspaceId);
  if (!details) {
    throw new Error('Workspace analytics not found');
  }
  logger.info('Workspace details retrieved', { workspaceId });
  return details;
}

async function getCollaboration(workspaceId) {
  const collaboration = workspaceAnalyticsModel.getCollaboration(workspaceId);
  if (!collaboration) {
    throw new Error('Workspace collaboration analytics not found');
  }
  logger.info('Workspace collaboration metrics retrieved', { workspaceId });
  return collaboration;
}

module.exports = {
  getOverview,
  getDetails,
  getCollaboration,
};
