function validateRateUpdate(req, res, next) {
  const { tier, rate } = req.body;
  if (!tier || typeof tier !== 'string') {
    return res.status(400).json({ error: 'tier is required and must be a string' });
  }
  if (typeof rate !== 'number' || rate < 0) {
    return res.status(400).json({ error: 'rate must be a non-negative number' });
  }
  next();
}

function validateRecordCommission(req, res, next) {
  const { affiliateId, amount } = req.body;
  if (!affiliateId || typeof affiliateId !== 'string') {
    return res.status(400).json({ error: 'affiliateId is required and must be a string' });
  }
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  next();
}

function validateCalculateCommission(req, res, next) {
  const { tier, serviceFee } = req.body;
  if (!tier || typeof tier !== 'string') {
    return res.status(400).json({ error: 'tier is required and must be a string' });
  }
  if (typeof serviceFee !== 'number' || serviceFee < 0) {
    return res.status(400).json({ error: 'serviceFee must be a non-negative number' });
  }
  next();
}

module.exports = {
  validateRateUpdate,
  validateRecordCommission,
  validateCalculateCommission,
};
