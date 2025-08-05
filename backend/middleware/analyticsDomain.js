const logger = require('../utils/logger');

const allowedDomains = ['finance', 'education', 'employment', 'community'];

module.exports = (req, res, next) => {
  const { domain } = req.params;
  if (domain && !allowedDomains.includes(domain)) {
    logger.error('Invalid analytics domain', { domain });
    return res.status(400).json({ error: 'Invalid domain' });
  }
  return next();
};
