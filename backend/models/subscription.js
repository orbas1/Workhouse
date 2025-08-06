const { randomUUID } = require('crypto');

// In-memory subscription and payment method storage
const subscriptions = new Map(); // userId -> subscription
const paymentMethods = new Map(); // userId -> [methods]

function getSubscription(userId) {
  return (
    subscriptions.get(userId) || {
      plan: 'Free',
      autoRenew: false,
      renewalDate: null,
      adBudget: 0,
      updatedAt: new Date(),
    }
  );
}

function setSubscription(userId, { plan, autoRenew = false, renewalDate = null, adBudget = 0 }) {
  const sub = { plan, autoRenew, renewalDate, adBudget, updatedAt: new Date() };
  subscriptions.set(userId, sub);
  return sub;
}

function listPaymentMethods(userId) {
  return paymentMethods.get(userId) || [];
}

function addPaymentMethod(userId, { cardNumber, expiry, brand }) {
  const method = {
    id: randomUUID(),
    brand,
    last4: cardNumber.slice(-4),
    expiry,
    createdAt: new Date(),
  };
  if (!paymentMethods.has(userId)) paymentMethods.set(userId, []);
  paymentMethods.get(userId).push(method);
  return method;
}

function removePaymentMethod(userId, methodId) {
  const list = paymentMethods.get(userId);
  if (!list) return false;
  const index = list.findIndex((m) => m.id === methodId);
  if (index >= 0) {
    list.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  getSubscription,
  setSubscription,
  listPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
};
