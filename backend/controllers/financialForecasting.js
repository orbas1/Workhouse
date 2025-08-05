const {
  getOverview,
  getSalesForecast,
  getExpenseForecast,
  getProfitForecast,
  getTrendForecast,
  createCustomForecast,
} = require('../services/financialForecasting');
const logger = require('../utils/logger');

async function overviewHandler(req, res) {
  try {
    const data = await getOverview(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve financial forecasting overview', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve forecasting overview' });
  }
}

async function salesForecastHandler(req, res) {
  try {
    const data = await getSalesForecast(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve sales forecast', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve sales forecast' });
  }
}

async function expenseForecastHandler(req, res) {
  try {
    const data = await getExpenseForecast(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve expense forecast', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve expense forecast' });
  }
}

async function profitForecastHandler(req, res) {
  try {
    const data = await getProfitForecast(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve profit forecast', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve profit forecast' });
  }
}

async function trendForecastHandler(req, res) {
  try {
    const data = await getTrendForecast(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve trend forecast', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve trend forecast' });
  }
}

async function customForecastHandler(req, res) {
  try {
    const data = await createCustomForecast(req.body);
    res.status(201).json(data);
  } catch (err) {
    logger.error('Failed to generate custom financial forecast', { error: err.message });
    res.status(500).json({ error: 'Unable to generate custom forecast' });
  }
}

module.exports = {
  overviewHandler,
  salesForecastHandler,
  expenseForecastHandler,
  profitForecastHandler,
  trendForecastHandler,
  customForecastHandler,
};
