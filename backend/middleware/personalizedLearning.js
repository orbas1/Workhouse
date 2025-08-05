const logger = require('../utils/logger');

module.exports = function verifyUserAccess(req, res, next) {
  const targetUserId = req.params.userId || req.body.userId;
  const requester = req.user;
  if (!requester) {
    logger.error('No authenticated user found');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (requester.role === 'admin' || requester.role === 'instructor' || requester.id === targetUserId) {
    return next();
  }
  logger.error('Forbidden personalized learning access', {
    requesterId: requester.id,
    targetUserId,
  });
  return res.status(403).json({ error: 'Forbidden' });
};
