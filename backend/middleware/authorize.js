const logger = require('../utils/logger');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];
    const authorized = allowedRoles.some(role => userRoles.includes(role));
    if (!authorized) {
      logger.error('Access forbidden for user', { username: req.user?.username });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
