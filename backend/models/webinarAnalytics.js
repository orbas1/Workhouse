const { randomUUID } = require('crypto');

// In-memory stores for webinar and user behavior analytics
const webinarAnalyticsStore = new Map();
const userBehaviorStore = new Map();

function saveWebinarAnalytics(webinarId, data = {}, ownerId) {
  const record = {
    id: randomUUID(),
    webinarId,
    ownerId,
    title: data.title || '',
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

function getWebinarsByOwner(ownerId) {
  return Array.from(webinarAnalyticsStore.values()).filter(w => w.ownerId === ownerId);
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
  getWebinarsByOwner,
  saveUserBehavior,
  getUserBehavior,
  getAllUserBehavior,
};

// Seed sample webinar analytics
const ownerId = 'user-123';
const sampleWebinarId = randomUUID();
saveWebinarAnalytics(
  sampleWebinarId,
  {
    title: 'Sample Webinar',
    overview: { attendees: 150, registrations: 200, revenue: 1000 },
    engagement: { engagementRate: 0.82 },
  },
  ownerId
);
