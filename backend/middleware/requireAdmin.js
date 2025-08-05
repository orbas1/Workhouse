const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    logger.error('Admin privileges required', { user: req.user?.username });
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
