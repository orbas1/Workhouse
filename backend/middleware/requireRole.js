const logger = require('../utils/logger');

module.exports = (...roles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      logger.error('Access denied', { userId: req.user?.id, role, required: roles });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
