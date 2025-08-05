const logger = require('../utils/logger');

/**
 * Ensures that a user can access only their own message analytics unless
 * they have elevated roles.
 */
function verifyMessageAccess(req, res, next) {
  const { userId } = req.params;
  const { id, role } = req.user || {};

  if (['admin', 'messaging-manager'].includes(role) || id === userId) {
    return next();
  }

  logger.error('Unauthorized message analytics access attempt', {
    requestingUser: id,
    targetUser: userId,
  });
  return res.status(403).json({ error: 'Forbidden' });
}

module.exports = verifyMessageAccess;
