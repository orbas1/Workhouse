const profileModel = require('../models/profile');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { profileId } = req.params;
  const profile = profileModel.findById(profileId);
  if (!profile) {
    logger.error('Profile not found', { profileId });
    return res.status(404).json({ error: 'Profile not found' });
  }
  if (profile.userId !== req.user?.id) {
    logger.error('Unauthorized profile access', {
      profileId,
      requester: req.user?.id,
    });
    return res.status(403).json({ error: 'Forbidden' });
  }
  req.profile = profile;
  next();
};
