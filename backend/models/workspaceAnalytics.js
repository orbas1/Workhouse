const { randomUUID } = require('crypto');

const workspaceAnalyticsStore = new Map();

function saveAnalytics(workspaceId, metrics) {
  const record = {
    id: randomUUID(),
    workspaceId,
    metrics,
    collectedAt: new Date(),
  };
  workspaceAnalyticsStore.set(workspaceId, record);
  return record;
}

function getOverview() {
  const overview = [];
  workspaceAnalyticsStore.forEach((record) => {
    overview.push({
      workspaceId: record.workspaceId,
      activeUsers: record.metrics.activeUsers || 0,
      projectsCreated: record.metrics.projectsCreated || 0,
      messagesExchanged: record.metrics.messagesExchanged || 0,
    });
  });
  return overview;
}

function getDetails(workspaceId) {
  return workspaceAnalyticsStore.get(workspaceId);
}

function getCollaboration(workspaceId) {
  const record = workspaceAnalyticsStore.get(workspaceId);
  return record ? record.metrics.collaboration : null;
}

module.exports = {
  saveAnalytics,
  getOverview,
  getDetails,
  getCollaboration,
};
