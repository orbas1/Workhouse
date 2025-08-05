const {
  createPayout,
  findByAffiliate,
  findById,
  updateStatus,
} = require('../models/payout');
const { allowedStatuses } = require('../middleware/payoutValidation');

async function initiatePayout(affiliateId, amount) {
  console.info('Initiating payout', { affiliateId, amount });
  // In a real system, verify affiliate exists and has sufficient commissions.
  return createPayout({ affiliateId, amount });
}

async function getPayoutHistory(affiliateId) {
  console.info('Fetching payout history', { affiliateId });
  return findByAffiliate(affiliateId);
}

async function updatePayoutStatusService(payoutId, status) {
  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid status');
  }
  console.info('Updating payout status', { payoutId, status });
  const payout = updateStatus(payoutId, status);
  if (!payout) {
    const error = new Error('Payout not found');
    error.statusCode = 404;
    throw error;
  }
  return payout;
}

module.exports = {
  initiatePayout,
  getPayoutHistory,
  updatePayoutStatusService,
};
