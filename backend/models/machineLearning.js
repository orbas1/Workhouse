const { randomUUID } = require('crypto');

// In-memory data stores
const models = new Map(); // modelName -> { name, updates: [], performance: [], lastUpdated }
const trends = new Map(); // `${metric}:${domain}` -> [{ timestamp, value }]

// Seed some trend data for demonstration
function seedTrends() {
  const metrics = ['engagement', 'revenue'];
  const domains = ['education', 'employment'];
  metrics.forEach(metric => {
    domains.forEach(domain => {
      const key = `${metric}:${domain}`;
      const series = [];
      for (let i = 0; i < 5; i += 1) {
        series.push({
          timestamp: new Date(Date.now() - (5 - i) * 24 * 60 * 60 * 1000),
          value: Number((Math.random() * 100).toFixed(2)),
        });
      }
      trends.set(key, series);
    });
  });
}

seedTrends();

// Seed a default model performance for demonstration
addModelPerformance('recommendation', {
  accuracy: 0.95,
  precision: 0.92,
  recall: 0.9,
  f1Score: 0.91,
});

function addModelUpdate(modelName, data) {
  const model = models.get(modelName) || { name: modelName, updates: [], performance: [] };
  const update = { id: randomUUID(), data, timestamp: new Date() };
  model.updates.push(update);
  model.lastUpdated = update.timestamp;
  models.set(modelName, model);
  return update;
}

function addModelPerformance(modelName, metrics) {
  const model = models.get(modelName) || { name: modelName, updates: [], performance: [] };
  const perf = { id: randomUUID(), ...metrics, timestamp: new Date() };
  model.performance.push(perf);
  models.set(modelName, model);
  return perf;
}

function getLatestPerformance(modelName) {
  const model = models.get(modelName);
  if (!model || model.performance.length === 0) return null;
  return model.performance[model.performance.length - 1];
}

function getAllTrends() {
  const result = [];
  trends.forEach((series, key) => {
    const [metric, domain] = key.split(':');
    const latest = series[series.length - 1];
    result.push({ metric, domain, latest });
  });
  return result;
}

function getTrendsByMetric(metric) {
  const result = [];
  trends.forEach((series, key) => {
    const [m, domain] = key.split(':');
    if (m === metric) {
      result.push({ domain, series });
    }
  });
  return result;
}

function getTrendsByMetricDomain(metric, domain) {
  const key = `${metric}:${domain}`;
  return trends.get(key) || [];
}

module.exports = {
  addModelUpdate,
  addModelPerformance,
  getLatestPerformance,
  getAllTrends,
  getTrendsByMetric,
  getTrendsByMetricDomain,
};
