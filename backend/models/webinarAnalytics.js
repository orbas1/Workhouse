const { randomUUID } = require('crypto');

// In-memory stores for webinar and user behavior analytics
const webinarAnalyticsStore = new Map();
const userBehaviorStore = new Map();

function saveWebinarAnalytics(webinarId, data = {}) {
  const record = {
    id: randomUUID(),
    webinarId,
    overview: data.overview || {},
    engagement: data.engagement || {},
    createdAt: new Date(),
  };
  webinarAnalyticsStore.set(webinarId, record);
  return record;
}

function getWebinarAnalytics(webinarId) {
  return webinarAnalyticsStore.get(webinarId);
}

function getAllWebinarAnalytics() {
  return Array.from(webinarAnalyticsStore.values());
}

function saveUserBehavior(userId, behavior = {}) {
  const record = {
    id: randomUUID(),
    userId,
    behavior,
    createdAt: new Date(),
  };
  userBehaviorStore.set(userId, record);
  return record;
}

function getUserBehavior(userId) {
  return userBehaviorStore.get(userId);
}

function getAllUserBehavior() {
  return Array.from(userBehaviorStore.values());
}

module.exports = {
  saveWebinarAnalytics,
  getWebinarAnalytics,
  getAllWebinarAnalytics,
  saveUserBehavior,
  getUserBehavior,
  getAllUserBehavior,
};
