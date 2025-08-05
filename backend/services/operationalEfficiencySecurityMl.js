const model = require('../models/operationalEfficiencySecurityMl');

async function getThreatDetections(dateRange) {
  const events = model.getThreats(dateRange);
  const summary = {
    totalEvents: events.length,
    criticalEvents: events.filter(e => e.severity === 'high').length,
  };
  return { summary, events };
}

async function getEfficiencyAnalysis(dateRange) {
  const metrics = model.getOperations(dateRange);
  const avgCpu = metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / (metrics.length || 1);
  const avgMemory = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / (metrics.length || 1);
  const averages = {
    cpuUsage: Number(avgCpu.toFixed(2)),
    memoryUsage: Number(avgMemory.toFixed(2)),
  };
  return { averages, records: metrics };
}

async function getApiUsageOptimization(dateRange) {
  const stats = model.getApiUsage(dateRange);
  const suggestions = stats
    .filter(s => s.avgResponseTime > 1000 || s.errorRate > 0.05)
    .map(s => ({
      endpoint: s.endpoint,
      action: 'Investigate high response time or error rate',
    }));
  return { stats, suggestions };
}

module.exports = {
  getThreatDetections,
  getEfficiencyAnalysis,
  getApiUsageOptimization,
};
