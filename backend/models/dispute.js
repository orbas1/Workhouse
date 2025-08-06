const { randomUUID } = require('crypto');

const disputes = new Map();

function createDispute({
  userId,
  disputeeId,
  category,
  description = '',
  resolutionRequest = '',
  attachments = [],
  status = 'open',
  createdAt = new Date(),
  resolvedAt = null,
}) {
  const id = randomUUID();
  const dispute = {
    id,
    userId,
    disputeeId,
    category,
    description,
    resolutionRequest,
    attachments,
    responses: [],
    status,
    createdAt,
    resolvedAt,
  };
  disputes.set(id, dispute);
  return dispute;
}

function addResponse(disputeId, { responderId, counterArgument, resolution, attachments = [] }) {
  const dispute = disputes.get(disputeId);
  if (!dispute) return null;
  const response = {
    responderId,
    counterArgument,
    resolution,
    attachments,
    respondedAt: new Date(),
  };
  dispute.responses.push(response);
  if (resolution === 'accept') {
    dispute.status = 'resolved';
    dispute.resolvedAt = new Date();
  }
  return dispute;
}

function findAll() {
  return Array.from(disputes.values());
}

function findById(id) {
  return disputes.get(id);
}

// Seed with some example disputes for analytics demonstration
createDispute({ userId: 'user1', disputeeId: 'user2', category: 'payment', description: 'Unpaid invoice', resolutionRequest: 'Full payment', attachments: [] });
createDispute({ userId: 'user2', disputeeId: 'user3', category: 'service', description: 'Service not delivered', status: 'resolved', resolvedAt: new Date() });
createDispute({ userId: 'user3', disputeeId: 'user1', category: 'payment', description: 'Partial payment dispute', status: 'resolved', resolvedAt: new Date() });

module.exports = {
  createDispute,
  addResponse,
  findAll,
  findById,
};
