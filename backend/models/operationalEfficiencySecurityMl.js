const { randomUUID } = require('crypto');

// In-memory stores for machine learning insights
const threatEvents = []; // { id, type, severity, description, detectedAt }
const operationMetrics = []; // { id, cpuUsage, memoryUsage, notes, recordedAt }
const apiUsageStats = []; // { id, endpoint, avgResponseTime, errorRate, timestamp }

function recordThreat(type, severity, description) {
  const event = {
    id: randomUUID(),
    type,
    severity,
    description: description || '',
    detectedAt: new Date(),
  };
  threatEvents.push(event);
  return event;
}

function getThreats({ start, end }) {
  return threatEvents.filter(e => e.detectedAt >= start && e.detectedAt <= end);
}

function recordOperationMetric({ cpuUsage, memoryUsage, notes }) {
  const metric = {
    id: randomUUID(),
    cpuUsage: Number(cpuUsage),
    memoryUsage: Number(memoryUsage),
    notes: notes || '',
    recordedAt: new Date(),
  };
  operationMetrics.push(metric);
  return metric;
}

function getOperations({ start, end }) {
  return operationMetrics.filter(m => m.recordedAt >= start && m.recordedAt <= end);
}

function recordApiUsage({ endpoint, avgResponseTime, errorRate }) {
  const stat = {
    id: randomUUID(),
    endpoint,
    avgResponseTime: Number(avgResponseTime),
    errorRate: Number(errorRate),
    timestamp: new Date(),
  };
  apiUsageStats.push(stat);
  return stat;
}

function getApiUsage({ start, end }) {
  return apiUsageStats.filter(s => s.timestamp >= start && s.timestamp <= end);
}

module.exports = {
  recordThreat,
  getThreats,
  recordOperationMetric,
  getOperations,
  recordApiUsage,
  getApiUsage,
};
