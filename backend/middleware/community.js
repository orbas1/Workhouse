const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const communityId = req.params.communityId || req.query.communityId || req.body.communityId;
  if (!communityId) {
    logger.error('communityId missing');
    return res.status(400).json({ error: 'communityId is required' });
  }
  const userCommunities = req.user?.communities || [];
  const communities = Array.isArray(userCommunities) ? userCommunities : [userCommunities];
  if (communities.length && !communities.includes(communityId)) {
    logger.error('User not part of community', { userId: req.user?.id, communityId });
    return res.status(403).json({ error: 'Access to community denied' });
  }
  req.communityId = communityId;
  next();
};
