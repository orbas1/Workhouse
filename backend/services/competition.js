const { listCompetitions } = require('../models/competition');
const { findReferralsByAffiliate } = require('../models/referral');

function getCompetitionsWithProgress(affiliateId) {
  return listCompetitions().map(comp => {
    const referrals = affiliateId ? findReferralsByAffiliate(affiliateId).length : 0;
    const progress = comp.targetReferrals > 0 ? Math.min(referrals / comp.targetReferrals, 1) : 0;
    return { ...comp, referrals, progress };
  });
}

module.exports = {
  getCompetitionsWithProgress,
};
