const subscriptionModel = require('../models/subscription');
const transactionsModel = require('../models/financialTransactions');

async function getSubscription(userId) {
  return subscriptionModel.getSubscription(userId);
}

async function updateSubscription(userId, data) {
  return subscriptionModel.setSubscription(userId, data);
}

async function listPaymentMethods(userId) {
  return subscriptionModel.listPaymentMethods(userId);
}

async function addPaymentMethod(userId, method) {
  return subscriptionModel.addPaymentMethod(userId, method);
}

async function removePaymentMethod(userId, methodId) {
  return subscriptionModel.removePaymentMethod(userId, methodId);
}

async function getTransactions(userId) {
  return transactionsModel.getTransactionsByUser(userId);
}

module.exports = {
  getSubscription,
  updateSubscription,
  listPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getTransactions,
};
