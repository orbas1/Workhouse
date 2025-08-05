const { randomUUID } = require('crypto');

const analyticsStore = new Map();

function saveAnalytics(agencyId, metrics) {
  const record = {
    id: randomUUID(),
    agencyId,
    metrics,
    calculatedAt: new Date(),
  };
  analyticsStore.set(agencyId, record);
  return record;
}

function getAnalytics(agencyId) {
  return analyticsStore.get(agencyId);
}

module.exports = {
  saveAnalytics,
  getAnalytics,
};
