const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { profileId } = req.params;
  if (req.user?.id === profileId) {
    logger.error('User attempted to review own profile', { userId: profileId });
    return res.status(403).json({ error: 'You cannot review your own profile' });
  }
  next();
};
