const logger = require('../utils/logger');
const model = require('../models/machineLearning');

async function updateModelTraining(modelName, data) {
  const update = model.addModelUpdate(modelName, data);
  logger.info('Model training updated', { modelName, updateId: update.id });
  return update;
}

async function evaluateModelPerformance(modelName) {
  const performance = model.getLatestPerformance(modelName);
  if (!performance) {
    const message = 'Performance data not found';
    logger.error(message, { modelName });
    throw new Error(message);
  }
  logger.info('Model performance retrieved', { modelName, performanceId: performance.id });
  return performance;
}

async function getTrendAnalytics() {
  const data = model.getAllTrends();
  logger.info('Trend analytics retrieved', { count: data.length });
  return data;
}

async function getMetricTrends(metric) {
  const data = model.getTrendsByMetric(metric);
  logger.info('Metric trends retrieved', { metric, count: data.length });
  return data;
}

async function getDomainMetricTrends(metric, domain) {
  const data = model.getTrendsByMetricDomain(metric, domain);
  logger.info('Domain metric trends retrieved', { metric, domain, count: data.length });
  return data;
}

async function getDomainMetricHistoryTrends(metric, domain) {
  return getDomainMetricTrends(metric, domain);
}

async function getDomainMetricForecastTrends(metric, domain) {
  const series = model.getTrendsByMetricDomain(metric, domain);
  if (series.length < 2) {
    const message = 'Insufficient data for forecast';
    logger.error(message, { metric, domain });
    throw new Error(message);
  }
  const diffs = [];
  for (let i = 1; i < series.length; i += 1) {
    diffs.push(series[i].value - series[i - 1].value);
  }
  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const last = series[series.length - 1];
  const forecast = {
    timestamp: new Date(last.timestamp.getTime() + 24 * 60 * 60 * 1000),
    value: Number((last.value + avgDiff).toFixed(2)),
  };
  logger.info('Forecast generated', { metric, domain, forecast });
  return forecast;
}

async function compareDomainMetricTrends(metric, domain, compareWith) {
  const base = model.getTrendsByMetricDomain(metric, domain);
  const comparisons = {};
  compareWith.forEach(other => {
    comparisons[other] = model.getTrendsByMetricDomain(metric, other);
  });
  logger.info('Domain metric comparison completed', { metric, domain, compareWith });
  return { base: { domain, series: base }, comparisons };
}

async function customTrendAnalyticsQuery({ metric, domain, startDate, endDate }) {
  let data;
  if (domain) {
    data = model.getTrendsByMetricDomain(metric, domain);
  } else {
    data = model.getTrendsByMetric(metric).flatMap(d => d.series);
  }
  if (startDate) {
    data = data.filter(d => d.timestamp >= startDate);
  }
  if (endDate) {
    data = data.filter(d => d.timestamp <= endDate);
  }
  logger.info('Custom trend analytics query executed', { metric, domain, count: data.length });
  return data;
}

module.exports = {
  updateModelTraining,
  evaluateModelPerformance,
  getTrendAnalytics,
  getMetricTrends,
  getDomainMetricTrends,
  getDomainMetricHistoryTrends,
  getDomainMetricForecastTrends,
  compareDomainMetricTrends,
  customTrendAnalyticsQuery,
};
