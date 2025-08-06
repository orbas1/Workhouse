const { randomUUID } = require('crypto');

const purchases = new Map();

function createPurchase({ courseId, userId, amount, paymentMethod, promoCode }) {
  const id = randomUUID();
  const now = new Date();
  const purchase = { id, courseId, userId, amount, paymentMethod, promoCode: promoCode || null, createdAt: now };
  purchases.set(id, purchase);
  return purchase;
}

function findById(id) {
  return purchases.get(id);
}

function findByUser(userId) {
  return Array.from(purchases.values()).filter(p => p.userId === userId);
}

module.exports = { createPurchase, findById, findByUser };
