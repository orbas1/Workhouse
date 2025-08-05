let payouts = [];
let nextId = 1;

function createPayout({ affiliateId, amount }) {
  const payout = {
    id: nextId++,
    affiliateId,
    amount,
    status: 'pending',
    initiatedAt: new Date(),
    processedAt: null,
  };
  payouts.push(payout);
  return payout;
}

function findByAffiliate(affiliateId) {
  return payouts.filter(p => p.affiliateId === affiliateId);
}

function findById(id) {
  return payouts.find(p => p.id === id);
}

function updateStatus(id, status) {
  const payout = findById(id);
  if (!payout) return null;
  payout.status = status;
  if (status === 'processed') {
    payout.processedAt = new Date();
  }
  return payout;
}

module.exports = {
  createPayout,
  findByAffiliate,
  findById,
  updateStatus,
};
