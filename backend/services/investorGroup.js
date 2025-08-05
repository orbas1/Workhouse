const investorGroupModel = require('../models/investorGroup');
const logger = require('../utils/logger');

async function createInvestorGroup(ownerId, data) {
  if (!ownerId) {
    throw new Error('Owner is required');
  }
  const group = investorGroupModel.createGroup(ownerId, data);
  logger.info('Investor group created', { groupId: group.id, ownerId });
  return group;
}

async function getInvestorGroupById(groupId) {
  const group = investorGroupModel.findGroupById(groupId);
  if (!group) {
    throw new Error('Investor group not found');
  }
  return group;
}

async function listGroupsForOwner(ownerId) {
  return investorGroupModel.listGroupsByOwner(ownerId);
}

async function addMemberToGroup(groupId, memberId, requesterId) {
  const group = investorGroupModel.findGroupById(groupId);
  if (!group) {
    throw new Error('Investor group not found');
  }
  if (group.ownerId !== requesterId) {
    throw new Error('Only group owner can add members');
  }
  investorGroupModel.addMember(groupId, memberId);
  logger.info('Member added to investor group', { groupId, memberId, requesterId });
  return investorGroupModel.findGroupById(groupId);
}

async function removeMemberFromGroup(groupId, memberId, requesterId) {
  const group = investorGroupModel.findGroupById(groupId);
  if (!group) {
    throw new Error('Investor group not found');
  }
  if (group.ownerId !== requesterId) {
    throw new Error('Only group owner can remove members');
  }
  investorGroupModel.removeMember(groupId, memberId);
  logger.info('Member removed from investor group', { groupId, memberId, requesterId });
  return investorGroupModel.findGroupById(groupId);
}

module.exports = {
  createInvestorGroup,
  getInvestorGroupById,
  listGroupsForOwner,
  addMemberToGroup,
  removeMemberFromGroup,
};
