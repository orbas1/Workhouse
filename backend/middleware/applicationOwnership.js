const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const userId = req.user?.id || req.user?.username;
  if (!req.application || req.application.userId !== userId) {
    logger.error('Unauthorized application access', {
      userId,
      applicationId: req.application?.id,
    });
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
