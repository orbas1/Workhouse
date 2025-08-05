const logger = require('../utils/logger');
const paymentModel = require('../models/payment');

async function distributePayments(agencyId, paymentsData = []) {
  if (!Array.isArray(paymentsData) || paymentsData.length === 0) {
    throw new Error('Payments data must be a non-empty array');
  }
  const distributed = paymentsData.map((p) => {
    if (!p.employeeId || !p.jobId || typeof p.amount !== 'number') {
      throw new Error('Invalid payment object');
    }
    const payment = paymentModel.createPayment(agencyId, p);
    logger.info('Payment distributed', {
      agencyId,
      paymentId: payment.id,
      employeeId: p.employeeId,
    });
    return payment;
  });
  return distributed;
}

async function getAgencyPayments(agencyId) {
  return paymentModel.getPaymentsByAgency(agencyId);
}

async function adjustPayment(agencyId, paymentId, newAmount, reason) {
  const payment = paymentModel.findPaymentById(paymentId);
  if (!payment || payment.agencyId !== agencyId) {
    throw new Error('Payment not found');
  }
  const oldAmount = payment.amount;
  paymentModel.updatePayment(paymentId, { amount: newAmount });
  const adjustment = paymentModel.recordAdjustment(
    paymentId,
    oldAmount,
    newAmount,
    reason,
  );
  logger.info('Payment adjusted', {
    paymentId,
    oldAmount,
    newAmount,
    agencyId,
  });
  return { payment: paymentModel.findPaymentById(paymentId), adjustment };
}

async function initiatePayment(userId, amount, method) {
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid amount');
  }
  return paymentModel.createUserPayment({ userId, amount, method });
}

async function getPaymentStatus(paymentId) {
  return paymentModel.getUserPayment(paymentId);
}

module.exports = {
  distributePayments,
  getAgencyPayments,
  adjustPayment,
  initiatePayment,
  getPaymentStatus,
};
