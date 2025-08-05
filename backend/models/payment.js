const { randomUUID } = require('crypto');

const payments = new Map();
const adjustments = [];

function createPayment(agencyId, { employeeId, jobId, amount }) {
  const id = randomUUID();
  const timestamp = new Date();
  const payment = {
    id,
    agencyId,
    employeeId,
    jobId,
    amount,
    status: 'disbursed',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  payments.set(id, payment);
  return payment;
}

function getPaymentsByAgency(agencyId) {
  return Array.from(payments.values()).filter(p => p.agencyId === agencyId);
}

function findPaymentById(id) {
  return payments.get(id);
}

function updatePayment(id, updates) {
  const payment = payments.get(id);
  if (!payment) return null;
  Object.assign(payment, updates, { updatedAt: new Date() });
  payments.set(id, payment);
  return payment;
}

function recordAdjustment(paymentId, oldAmount, newAmount, reason) {
  const record = {
    id: randomUUID(),
    paymentId,
    oldAmount,
    newAmount,
    reason: reason || null,
    adjustedAt: new Date(),
  };
  adjustments.push(record);
  return record;
}

module.exports = {
  createPayment,
  getPaymentsByAgency,
  findPaymentById,
  updatePayment,
  recordAdjustment,
};
