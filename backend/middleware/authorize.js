const logger = require('../utils/logger');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      logger.error('Authorization failed', { userId: req.user?.id, role, required: allowedRoles });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
