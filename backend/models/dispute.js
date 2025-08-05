const { randomUUID } = require('crypto');

const disputes = new Map();

function createDispute({ userId, category, status = 'open', createdAt = new Date(), resolvedAt = null }) {
  const id = randomUUID();
  const dispute = { id, userId, category, status, createdAt, resolvedAt };
  disputes.set(id, dispute);
  return dispute;
}

function findAll() {
  return Array.from(disputes.values());
}

function findById(id) {
  return disputes.get(id);
}

// Seed with some example disputes for analytics demonstration
createDispute({ userId: 'user1', category: 'payment', status: 'open' });
createDispute({ userId: 'user2', category: 'service', status: 'resolved', resolvedAt: new Date() });
createDispute({ userId: 'user3', category: 'payment', status: 'resolved', resolvedAt: new Date() });

module.exports = {
  createDispute,
  findAll,
  findById,
};
