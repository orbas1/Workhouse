const logger = require('../utils/logger');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      logger.error('Access denied', { user: req.user?.username, role, requiredRoles: allowedRoles });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
