const { randomUUID } = require('crypto');

const investorGroups = new Map();

function createGroup(ownerId, { name, description = '', members = [] }) {
  const id = randomUUID();
  const now = new Date();
  const uniqueMembers = new Set([ownerId, ...members]);
  const group = {
    id,
    name,
    description,
    ownerId,
    members: Array.from(uniqueMembers),
    createdAt: now,
    updatedAt: now,
  };
  investorGroups.set(id, group);
  return group;
}

function findGroupById(groupId) {
  return investorGroups.get(groupId);
}

function listGroupsByOwner(ownerId) {
  return Array.from(investorGroups.values()).filter((g) => g.ownerId === ownerId);
}

function addMember(groupId, memberId) {
  const group = investorGroups.get(groupId);
  if (!group) return null;
  if (!group.members.includes(memberId)) {
    group.members.push(memberId);
    group.updatedAt = new Date();
  }
  return group;
}

function removeMember(groupId, memberId) {
  const group = investorGroups.get(groupId);
  if (!group) return null;
  group.members = group.members.filter((m) => m !== memberId);
  group.updatedAt = new Date();
  return group;
}

module.exports = {
  createGroup,
  findGroupById,
  listGroupsByOwner,
  addMember,
  removeMember,
};
