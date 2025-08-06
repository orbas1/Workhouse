const { randomUUID } = require('crypto');

const messages = new Map(); // Map of disputeId -> messages array

function addMessage(disputeId, senderId, message) {
  const id = randomUUID();
  const entry = { id, disputeId, senderId, message, createdAt: new Date() };
  if (!messages.has(disputeId)) messages.set(disputeId, []);
  messages.get(disputeId).push(entry);
  return entry;
}

function getMessagesByDisputeId(disputeId) {
  return messages.get(disputeId) || [];
}

module.exports = {
  addMessage,
  getMessagesByDisputeId,
};
