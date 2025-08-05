const logger = require('../utils/logger');
const model = require('../models/financialAnalytics');

async function getOverview(range) {
  const overview = model.getOverview(range);
  logger.info('Retrieved financial overview', { range });
  return overview;
}

async function getRevenueAnalytics(range) {
  const records = model.getRevenues(range);
  const total = records.reduce((sum, r) => sum + r.amount, 0);
  logger.info('Retrieved revenue analytics', { count: records.length });
  return { total, records };
}

async function getExpenseAnalytics(range) {
  const records = model.getExpenses(range);
  const total = records.reduce((sum, e) => sum + e.amount, 0);
  logger.info('Retrieved expense analytics', { count: records.length });
  return { total, records };
}

async function getCryptoAnalytics(range) {
  const records = model.getCryptoTransactions(range);
  const totalValueUSD = records.reduce((sum, t) => sum + t.valueUSD, 0);
  logger.info('Retrieved crypto transaction analytics', { count: records.length });
  return { totalValueUSD, records };
}

module.exports = {
  getOverview,
  getRevenueAnalytics,
  getExpenseAnalytics,
  getCryptoAnalytics,
};
