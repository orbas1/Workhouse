const logger = require('../utils/logger');

function verifyApiKey(req, res, next) {
  const providedKey = req.header('x-api-key');
  const expectedKey = process.env.ML_API_KEY || 'devops-key';
  if (providedKey !== expectedKey) {
    logger.warn('Invalid infrastructure ML API key', { providedKey });
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
}

module.exports = { verifyApiKey };
