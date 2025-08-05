const logger = require('../utils/logger');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      logger.error('Forbidden access attempt', {
        user: req.user?.username,
        role,
        allowedRoles,
      });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
