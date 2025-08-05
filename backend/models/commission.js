const commissions = new Map();
const commissionRates = new Map(); // tier -> rate
const rateHistory = [];

function addCommission(commission) {
  commissions.set(commission.id, commission);
}

function getCommissionsByAffiliate(affiliateId) {
  return Array.from(commissions.values()).filter(c => c.affiliateId === affiliateId);
}

function addRateHistory(entry) {
  rateHistory.push(entry);
}

module.exports = {
  commissions,
  commissionRates,
  rateHistory,
  addCommission,
  getCommissionsByAffiliate,
  addRateHistory,
};
