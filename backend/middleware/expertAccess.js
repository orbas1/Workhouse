const logger = require('../utils/logger');

/**
 * Ensures the authenticated user has access to expert features.
 * Allowed roles: user, learner, admin.
 */
module.exports = function expertAccess(req, res, next) {
  const roles = req.user?.roles || [req.user?.role];
  const roleList = Array.isArray(roles) ? roles : [];
  const allowed = roleList.some(r => ['user', 'learner', 'admin'].includes(r));
  if (!allowed) {
    logger.error('Expert access denied', { userId: req.user?.id });
    return res.status(403).json({ error: 'Expert access required' });
  }
  next();
};
