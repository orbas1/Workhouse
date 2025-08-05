const logger = require('../utils/logger');
const model = require('../models/financialTransactions');

async function recordTransaction(userId, data) {
  const transaction = model.addTransaction(userId, data);
  logger.info('Transaction recorded', { userId, transactionId: transaction.id });
  return transaction;
}

async function getTransactionHistory(userId) {
  const history = model.getTransactionsByUser(userId);
  logger.info('Fetched transaction history', { userId, count: history.length });
  return history;
}

async function requestRefund(eventId, data) {
  const refund = model.createRefundRequest(eventId, data);
  logger.info('Refund requested', { eventId, userId: data.userId, refundId: refund.id });
  return refund;
}

module.exports = {
  recordTransaction,
  getTransactionHistory,
  requestRefund,
};
