const crypto = require('crypto');
const { createReferral, findReferralsByAffiliate } = require('../models/referral');

/**
 * Record a new referral for an affiliate.
 */
async function trackReferral({ affiliateId, referredUserId, status = 'pending', metadata = {} }) {
  const referral = {
    id: crypto.randomUUID(),
    affiliateId,
    referredUserId,
    status,
    metadata,
    createdAt: new Date().toISOString(),
  };
  return createReferral(referral);
}

/**
 * Retrieve referrals for a given affiliate.
 */
async function listReferrals(affiliateId) {
  return findReferralsByAffiliate(affiliateId);
}

module.exports = { trackReferral, listReferrals };
