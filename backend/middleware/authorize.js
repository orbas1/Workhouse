const logger = require('../utils/logger');

/**
 * Middleware to authorize users based on role.
 * @param {...string} allowedRoles - Roles permitted to access the route.
 */
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];
    const rolesArray = Array.isArray(userRoles) ? userRoles : [userRoles];
    const permitted = rolesArray.some(role => allowedRoles.includes(role));
    if (!permitted) {
      logger.error('Access denied', { user: req.user?.username, requiredRoles: allowedRoles });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
