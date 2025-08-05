const { trackReferral, listReferrals } = require('../services/referral');

/**
 * Controller to handle referral tracking requests.
 */
async function trackReferralHandler(req, res) {
  try {
    const { referredUserId, status, metadata } = req.body;
    const referral = await trackReferral({
      affiliateId: req.user.username,
      referredUserId,
      status,
      metadata,
    });
    return res.status(201).json(referral);
  } catch (err) {
    console.error('Error tracking referral:', err);
    return res.status(500).json({ error: 'Failed to track referral' });
  }
}

/**
 * Controller to retrieve referrals for an affiliate.
 */
async function listReferralsHandler(req, res) {
  try {
    const { affiliateId } = req.params;
    if (affiliateId !== req.user.username) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const referrals = await listReferrals(affiliateId);
    return res.json({ referrals });
  } catch (err) {
    console.error('Error fetching referrals:', err);
    return res.status(500).json({ error: 'Failed to fetch referrals' });
  }
}

module.exports = { trackReferralHandler, listReferralsHandler };
