const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const role = req.user?.role;
  if (role !== 'admin' && role !== 'super_admin') {
    logger.error('Admin privileges required', { user: req.user?.username });
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
