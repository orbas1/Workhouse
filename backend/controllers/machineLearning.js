const {
  updateModelTraining,
  evaluateModelPerformance,
  getTrendAnalytics,
  getMetricTrends,
  getDomainMetricTrends,
  getDomainMetricHistoryTrends,
  getDomainMetricForecastTrends,
  compareDomainMetricTrends,
  customTrendAnalyticsQuery,
} = require('../services/machineLearning');
const logger = require('../utils/logger');

async function updateModelTrainingHandler(req, res) {
  const { modelName, data } = req.body;
  try {
    const update = await updateModelTraining(modelName, data);
    res.status(201).json(update);
  } catch (err) {
    logger.error('Failed to update model training', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function evaluateModelPerformanceHandler(req, res) {
  const { modelName } = req.query;
  try {
    const performance = await evaluateModelPerformance(modelName);
    res.json(performance);
  } catch (err) {
    logger.error('Failed to evaluate model performance', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getTrendAnalyticsHandler(req, res) {
  try {
    const data = await getTrendAnalytics();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch trend analytics', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getMetricTrendsHandler(req, res) {
  const { metric } = req.params;
  try {
    const data = await getMetricTrends(metric);
    res.json({ metric, data });
  } catch (err) {
    logger.error('Failed to fetch metric trends', { metric, error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getDomainMetricTrendsHandler(req, res) {
  const { metric, domain } = req.params;
  try {
    const data = await getDomainMetricTrends(metric, domain);
    res.json({ metric, domain, data });
  } catch (err) {
    logger.error('Failed to fetch domain metric trends', { metric, domain, error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getDomainMetricHistoryTrendsHandler(req, res) {
  const { metric, domain } = req.params;
  try {
    const data = await getDomainMetricHistoryTrends(metric, domain);
    res.json({ metric, domain, data });
  } catch (err) {
    logger.error('Failed to fetch domain metric history', { metric, domain, error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getDomainMetricForecastTrendsHandler(req, res) {
  const { metric, domain } = req.params;
  try {
    const forecast = await getDomainMetricForecastTrends(metric, domain);
    res.json({ metric, domain, forecast });
  } catch (err) {
    logger.error('Failed to forecast domain metric trends', { metric, domain, error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function compareDomainMetricTrendsHandler(req, res) {
  const { metric, domain } = req.params;
  const { compareWith } = req.body;
  try {
    const result = await compareDomainMetricTrends(metric, domain, compareWith);
    res.json(result);
  } catch (err) {
    logger.error('Failed to compare domain metric trends', { metric, domain, error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function customTrendAnalyticsQueryHandler(req, res) {
  const { metric, domain, startDate, endDate } = req.body;
  try {
    const result = await customTrendAnalyticsQuery({
      metric,
      domain,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    res.json(result);
  } catch (err) {
    logger.error('Failed custom trend analytics query', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  updateModelTrainingHandler,
  evaluateModelPerformanceHandler,
  getTrendAnalyticsHandler,
  getMetricTrendsHandler,
  getDomainMetricTrendsHandler,
  getDomainMetricHistoryTrendsHandler,
  getDomainMetricForecastTrendsHandler,
  compareDomainMetricTrendsHandler,
  customTrendAnalyticsQueryHandler,
};
