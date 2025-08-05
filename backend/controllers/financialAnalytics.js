const {
  getOverview,
  getRevenueAnalytics,
  getExpenseAnalytics,
  getCryptoAnalytics,
} = require('../services/financialAnalytics');
const logger = require('../utils/logger');

async function overviewHandler(req, res) {
  try {
    const data = await getOverview(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve financial overview', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve financial overview' });
  }
}

async function revenueHandler(req, res) {
  try {
    const data = await getRevenueAnalytics(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve revenue analytics', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve revenue analytics' });
  }
}

async function expensesHandler(req, res) {
  try {
    const data = await getExpenseAnalytics(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve expense analytics', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve expense analytics' });
  }
}

async function cryptoTransactionsHandler(req, res) {
  try {
    const data = await getCryptoAnalytics(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve crypto transaction analytics', { error: err.message });
    res.status(500).json({ error: 'Unable to retrieve crypto transaction analytics' });
  }
}

module.exports = {
  overviewHandler,
  revenueHandler,
  expensesHandler,
  cryptoTransactionsHandler,
};
