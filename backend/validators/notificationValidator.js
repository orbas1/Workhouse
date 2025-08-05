function validateRateChange(req, res, next) {
  const { affiliateId, oldRate, newRate } = req.body;

  if (!affiliateId || typeof affiliateId !== 'string') {
    return res.status(400).json({ error: 'affiliateId (string) is required' });
  }
  if (typeof oldRate !== 'number' || typeof newRate !== 'number') {
    return res.status(400).json({ error: 'oldRate and newRate must be numbers' });
  }
  if (oldRate < 0 || newRate < 0) {
    return res.status(400).json({ error: 'Rates must be non-negative numbers' });
  }
  next();
}

module.exports = {
  validateRateChange,
};
