const referrals = [];

function createReferral(referral) {
  referrals.push(referral);
  return referral;
}

function findReferralsByAffiliate(affiliateId) {
  return referrals.filter(r => r.affiliateId === affiliateId);
}

module.exports = { referrals, createReferral, findReferralsByAffiliate };
