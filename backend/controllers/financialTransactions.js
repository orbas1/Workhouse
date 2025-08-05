const {
  recordTransaction,
  getTransactionHistory,
  requestRefund,
} = require('../services/financialTransactions');
const logger = require('../utils/logger');

async function recordTransactionHandler(req, res) {
  const { userId } = req.params;
  try {
    const transaction = await recordTransaction(userId, req.body);
    res.status(201).json(transaction);
  } catch (err) {
    logger.error('Failed to record transaction', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getTransactionHistoryHandler(req, res) {
  const { userId } = req.params;
  try {
    const history = await getTransactionHistory(userId);
    res.json(history);
  } catch (err) {
    logger.error('Failed to fetch transaction history', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function requestRefundHandler(req, res) {
  const { eventId } = req.params;
  try {
    const refund = await requestRefund(eventId, req.body);
    res.status(201).json(refund);
  } catch (err) {
    logger.error('Failed to request refund', { error: err.message, eventId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  recordTransactionHandler,
  getTransactionHistoryHandler,
  requestRefundHandler,
};
