const logger = require('../utils/logger');
const model = require('../models/financialForecasting');

async function getOverview(range) {
  const sales = model.getSalesForecast(range);
  const expenses = model.getExpenseForecast(range);
  const profit = model.getProfitForecast(range);
  logger.info('Retrieved financial forecasting overview', { range });
  return { sales, expenses, profit };
}

async function getSalesForecast(range) {
  const data = model.getSalesForecast(range);
  logger.info('Retrieved sales forecast', { count: data.length });
  return data;
}

async function getExpenseForecast(range) {
  const data = model.getExpenseForecast(range);
  logger.info('Retrieved expense forecast', { count: data.length });
  return data;
}

async function getProfitForecast(range) {
  const data = model.getProfitForecast(range);
  logger.info('Retrieved profit forecast', { count: data.length });
  return data;
}

async function getTrendForecast(range) {
  const data = model.getTrends(range);
  logger.info('Retrieved trend forecast', { count: data.length });
  return data;
}

async function createCustomForecast(params) {
  const data = model.createCustomForecast(params);
  logger.info('Generated custom financial forecast', {
    startDate: params.startDate,
    endDate: params.endDate,
  });
  return data;
}

module.exports = {
  getOverview,
  getSalesForecast,
  getExpenseForecast,
  getProfitForecast,
  getTrendForecast,
  createCustomForecast,
};
