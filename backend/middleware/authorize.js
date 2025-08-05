const logger = require('../utils/logger');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logger.error('Forbidden access attempt', { user: req.user?.username, role: req.user?.role });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
