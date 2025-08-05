const logger = require('../utils/logger');

function ensureSelf(req, res, next) {
  const requested = req.params.userId;
  const current = req.user?.username;
  if (!requested || requested !== current) {
    logger.error('Forbidden participant access', { current, requested });
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

module.exports = { ensureSelf };

