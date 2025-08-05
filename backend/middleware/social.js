const { isGroupMember } = require('../models/socialLearning');

function ensureGroupMember(req, res, next) {
  const groupId = req.params.groupId;
  const userId = req.user?.username;
  if (!groupId || !userId) {
    return res.status(400).json({ error: 'Group ID and authentication required' });
  }
  if (!isGroupMember(groupId, userId)) {
    return res.status(403).json({ error: 'User is not a member of this group' });
  }
  return next();
}

function ensureSelf(req, res, next) {
  const targetUserId = req.params.userId || req.body.userId;
  const user = req.user || {};
  if (!targetUserId) {
    return res.status(400).json({ error: 'User identifier required' });
  }
  const isAdmin = user.role === 'admin' || (Array.isArray(user.roles) && user.roles.includes('admin'));
  if (isAdmin || user.username === targetUserId) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden' });
}

module.exports = {
  ensureGroupMember,
  ensureSelf,
};
