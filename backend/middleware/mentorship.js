const logger = require('../utils/logger');

/**
 * Ensures the authenticated user has access to mentorship features.
 * Allows roles: mentor, mentee, admin.
 */
module.exports = function mentorshipAccess(req, res, next) {
  const roles = req.user?.roles || [req.user?.role];
  const roleList = Array.isArray(roles) ? roles : [];
  const allowed = roleList.some(r => ['mentor', 'mentee', 'admin'].includes(r));
  if (!allowed) {
    logger.error('Mentorship access denied', { userId: req.user?.id });
    return res.status(403).json({ error: 'Mentorship access required' });
  }
  next();
};

