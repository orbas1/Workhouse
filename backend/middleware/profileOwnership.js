const profileModel = require('../models/profile');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { userId } = req.params;
  const profile = profileModel.findByUserId(userId);
  if (!profile) {
    logger.error('Profile not found', { userId });
    return res.status(404).json({ error: 'Profile not found' });
  }
  if (req.user?.id !== userId) {
    logger.error('Unauthorized profile access', { userId, requester: req.user?.id });
    return res.status(403).json({ error: 'Forbidden' });
  }
  req.profile = profile;
  next();
};
