const { randomUUID } = require('crypto');

// In-memory stores for transactions and refund requests
const transactions = new Map(); // key: userId -> array of transactions
const refundRequests = [];

function addTransaction(userId, { eventId = null, amount, type, description = null, date = new Date() }) {
  const transaction = {
    id: randomUUID(),
    userId,
    eventId,
    amount,
    type,
    description,
    date: new Date(date),
  };
  if (!transactions.has(userId)) {
    transactions.set(userId, []);
  }
  transactions.get(userId).push(transaction);
  return transaction;
}

function getTransactionsByUser(userId) {
  return transactions.get(userId) || [];
}

function createRefundRequest(eventId, { userId, amount, reason = null }) {
  const refund = {
    id: randomUUID(),
    eventId,
    userId,
    amount,
    reason,
    status: 'pending',
    requestedAt: new Date(),
  };
  refundRequests.push(refund);
  return refund;
}

module.exports = {
  addTransaction,
  getTransactionsByUser,
  createRefundRequest,
};
