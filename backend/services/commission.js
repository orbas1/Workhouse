const crypto = require('crypto');
const logger = require('../utils/logger');
const {
  commissionRates,
  rateHistory,
  addCommission,
  getCommissionsByAffiliate,
  addRateHistory,
  commissions,
} = require('../models/commission');

function getCommissionRates() {
  return Object.fromEntries(commissionRates);
}

function updateCommissionRate(tier, rate, reason = 'manual update') {
  const oldRate = commissionRates.get(tier) || 0;
  commissionRates.set(tier, rate);
  addRateHistory({ tier, oldRate, newRate: rate, changedAt: new Date().toISOString(), reason });
  logger.info(`Commission rate updated for ${tier} from ${oldRate} to ${rate}`);
  return { tier, rate };
}

function getCommissionRateHistory() {
  return rateHistory;
}

function recordCommission({ affiliateId, amount }) {
  const commission = {
    id: crypto.randomUUID(),
    affiliateId,
    amount,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  addCommission(commission);
  logger.info('Commission recorded', commission);
  return commission;
}

function getCommissionHistory(affiliateId) {
  return getCommissionsByAffiliate(affiliateId);
}

function calculateCommission(tier, serviceFee) {
  const rate = commissionRates.get(tier) || 0;
  return {
    tier,
    rate,
    commission: serviceFee * rate,
  };
}

function adjustRateForPerformance(tier, rate) {
  // In a real implementation this might consider performance metrics.
  return updateCommissionRate(tier, rate, 'performance-adjust');
}

function getLeaderboard(limit = 10) {
  const totals = new Map();
  for (const commission of commissions.values()) {
    const current = totals.get(commission.affiliateId) || 0;
    totals.set(commission.affiliateId, current + commission.amount);
  }
  return Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([affiliateId, total]) => ({ affiliateId, total }));
}

module.exports = {
  getCommissionRates,
  updateCommissionRate,
  getCommissionRateHistory,
  recordCommission,
  getCommissionHistory,
  calculateCommission,
  adjustRateForPerformance,
  getLeaderboard,
};
