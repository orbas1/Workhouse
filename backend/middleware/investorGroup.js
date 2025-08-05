const investorGroupModel = require('../models/investorGroup');
const logger = require('../utils/logger');

function groupExists(req, res, next) {
  const { groupId } = req.params;
  const group = investorGroupModel.findGroupById(groupId);
  if (!group) {
    logger.error('Investor group not found', { groupId });
    return res.status(404).json({ error: 'Investor group not found' });
  }
  req.group = group;
  next();
}

function requireGroupOwner(req, res, next) {
  const userId = req.user?.id || req.user?.username;
  if (req.group.ownerId !== userId) {
    logger.error('User is not investor group owner', { groupId: req.group.id, userId });
    return res.status(403).json({ error: 'Only group owner can perform this action' });
  }
  next();
}

module.exports = {
  groupExists,
  requireGroupOwner,
};
