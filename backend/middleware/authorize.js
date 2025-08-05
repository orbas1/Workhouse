const logger = require('../utils/logger');

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      logger.error('Forbidden access', { user: req.user?.username, requiredRoles: allowedRoles });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
