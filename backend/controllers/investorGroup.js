const {
  createInvestorGroup,
  getInvestorGroupById,
  listGroupsForOwner,
  addMemberToGroup,
  removeMemberFromGroup,
} = require('../services/investorGroup');
const logger = require('../utils/logger');

async function createGroupHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username;
  try {
    const group = await createInvestorGroup(ownerId, req.body);
    res.status(201).json(group);
  } catch (err) {
    logger.error('Failed to create investor group', { error: err.message, ownerId });
    res.status(400).json({ error: err.message });
  }
}

async function getGroupHandler(req, res) {
  const { groupId } = req.params;
  try {
    const group = await getInvestorGroupById(groupId);
    res.json(group);
  } catch (err) {
    logger.error('Failed to retrieve investor group', { error: err.message, groupId });
    res.status(404).json({ error: err.message });
  }
}

async function listGroupsHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username;
  try {
    const groups = await listGroupsForOwner(ownerId);
    res.json(groups);
  } catch (err) {
    logger.error('Failed to list investor groups', { error: err.message, ownerId });
    res.status(500).json({ error: err.message });
  }
}

async function addMemberHandler(req, res) {
  const { groupId } = req.params;
  const { memberId } = req.body;
  const requesterId = req.user?.id || req.user?.username;
  try {
    const group = await addMemberToGroup(groupId, memberId, requesterId);
    res.json(group);
  } catch (err) {
    logger.error('Failed to add member to group', {
      error: err.message,
      groupId,
      memberId,
      requesterId,
    });
    res.status(400).json({ error: err.message });
  }
}

async function removeMemberHandler(req, res) {
  const { groupId, memberId } = req.params;
  const requesterId = req.user?.id || req.user?.username;
  try {
    const group = await removeMemberFromGroup(groupId, memberId, requesterId);
    res.json(group);
  } catch (err) {
    logger.error('Failed to remove member from group', {
      error: err.message,
      groupId,
      memberId,
      requesterId,
    });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createGroupHandler,
  getGroupHandler,
  listGroupsHandler,
  addMemberHandler,
  removeMemberHandler,
};
