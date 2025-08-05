/**
 * Validates the payload for tracking a referral.
 */
function validateTrackReferral(req, res, next) {
  const { referredUserId, status, metadata } = req.body || {};

  if (!referredUserId || typeof referredUserId !== 'string') {
    return res.status(400).json({ error: 'referredUserId is required and must be a string' });
  }

  if (status && typeof status !== 'string') {
    return res.status(400).json({ error: 'status must be a string if provided' });
  }

  if (metadata && typeof metadata !== 'object') {
    return res.status(400).json({ error: 'metadata must be an object if provided' });
  }

  return next();
}

module.exports = { validateTrackReferral };
