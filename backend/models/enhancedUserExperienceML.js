const { randomUUID } = require('crypto');

const optimizations = [];
const heatmap = [
  { id: randomUUID(), section: 'home', engagementScore: 0.8 },
  { id: randomUUID(), section: 'dashboard', engagementScore: 0.6 },
];
const recommendations = [];

function getLatestOptimization(userId) {
  return optimizations
    .filter(o => o.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt)[0] || null;
}

function saveOptimization(userId, optimizedLayout) {
  const record = {
    id: randomUUID(),
    userId,
    optimizedLayout,
    createdAt: new Date(),
  };
  optimizations.push(record);
  return record;
}

function getHeatmap() {
  return heatmap;
}

function saveRecommendations(userId, recs) {
  const record = {
    id: randomUUID(),
    userId,
    recommendations: recs,
    createdAt: new Date(),
  };
  recommendations.push(record);
  return record;
}

module.exports = {
  getLatestOptimization,
  saveOptimization,
  getHeatmap,
  saveRecommendations,
};

