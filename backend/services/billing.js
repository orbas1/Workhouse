const subscriptionModel = require('../models/subscription');
const transactionsModel = require('../models/financialTransactions');
const PDFDocument = require('pdfkit');

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

async function generateInvoice(userId, transactionId) {
  const tx = transactionsModel.getTransaction(userId, transactionId);
  if (!tx) throw new Error('Transaction not found');
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Transaction ID: ${tx.id}`);
    doc.text(`Date: ${tx.date.toISOString()}`);
    doc.text(`Type: ${tx.type}`);
    doc.text(`Description: ${tx.description || '-'}`);
    doc.text(`Amount: $${tx.amount.toFixed(2)}`);
    doc.end();
  });
}

module.exports = {
  getSubscription,
  updateSubscription,
  listPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getTransactions,
  generateInvoice,
};
