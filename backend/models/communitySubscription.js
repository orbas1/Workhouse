const { randomUUID } = require('crypto');

const subscriptions = new Map(); // communityId -> [subscriptions]

function subscribe(communityId, subscriberId, price = 0) {
  const record = {
    id: randomUUID(),
    communityId,
    subscriberId,
    price,
    status: 'active',
    subscribedAt: new Date(),
  };
  if (!subscriptions.has(communityId)) subscriptions.set(communityId, []);
  subscriptions.get(communityId).push(record);
  return record;
}

function unsubscribe(communityId, subscriberId) {
  const list = subscriptions.get(communityId) || [];
  const sub = list.find((s) => s.subscriberId === subscriberId && s.status === 'active');
  if (sub) {
    sub.status = 'canceled';
  }
  return sub || null;
}

function hasAccess(communityId, subscriberId) {
  const list = subscriptions.get(communityId) || [];
  return list.some((s) => s.subscriberId === subscriberId && s.status === 'active');
}

function listSubscribers(communityId) {
  const list = subscriptions.get(communityId) || [];
  return list.filter((s) => s.status === 'active');
}

module.exports = {
  subscribe,
  unsubscribe,
  hasAccess,
  listSubscribers,
};
