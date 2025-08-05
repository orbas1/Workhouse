const { randomUUID } = require('crypto');

// Mock data representing user activity and market history
const userActivities = [
  { id: randomUUID(), userId: randomUUID(), lastActive: new Date('2024-04-10'), sessions: 5 },
  { id: randomUUID(), userId: randomUUID(), lastActive: new Date('2024-03-25'), sessions: 2 },
  { id: randomUUID(), userId: randomUUID(), lastActive: new Date('2024-04-15'), sessions: 3 },
  { id: randomUUID(), userId: randomUUID(), lastActive: new Date('2024-04-18'), sessions: 7 },
];

const marketHistory = [
  { id: randomUUID(), industry: 'technology', date: new Date('2024-01-01'), index: 100 },
  { id: randomUUID(), industry: 'technology', date: new Date('2024-02-01'), index: 105 },
  { id: randomUUID(), industry: 'technology', date: new Date('2024-03-01'), index: 107 },
  { id: randomUUID(), industry: 'finance', date: new Date('2024-01-01'), index: 80 },
  { id: randomUUID(), industry: 'finance', date: new Date('2024-02-01'), index: 82 },
  { id: randomUUID(), industry: 'finance', date: new Date('2024-03-01'), index: 81 },
];

function getUserActivities() {
  return userActivities;
}

function getMarketHistory(industry) {
  return marketHistory.filter(record => !industry || record.industry === industry);
}

module.exports = {
  getUserActivities,
  getMarketHistory,
};
