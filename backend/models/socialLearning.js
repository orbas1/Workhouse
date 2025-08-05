const { randomUUID } = require('crypto');

// Simulated in-memory data stores
const groupMembers = [];
const posts = [];
const liveStudySessions = [];
const mentorshipApplications = [];

function isGroupMember(groupId, userId) {
  return groupMembers.some((m) => m.groupId === groupId && m.userId === userId);
}

function addMemberToGroup(groupId, userId) {
  if (isGroupMember(groupId, userId)) {
    return null;
  }
  const record = {
    id: randomUUID(),
    groupId,
    userId,
    joinedAt: new Date(),
  };
  groupMembers.push(record);
  return record;
}

function addPost({ groupId, userId, content }) {
  const record = {
    id: randomUUID(),
    groupId,
    userId,
    content,
    createdAt: new Date(),
  };
  posts.push(record);
  return record;
}

function addLiveStudySession(groupId, hostId, { topic, scheduledFor, description }) {
  const record = {
    id: randomUUID(),
    groupId,
    hostId,
    topic,
    scheduledFor: new Date(scheduledFor),
    description: description || null,
    createdAt: new Date(),
  };
  liveStudySessions.push(record);
  return record;
}

function addMentorshipApplication(userId, message) {
  const record = {
    id: randomUUID(),
    menteeId: userId,
    message: message || null,
    status: 'pending',
    appliedAt: new Date(),
  };
  mentorshipApplications.push(record);
  return record;
}

module.exports = {
  isGroupMember,
  addMemberToGroup,
  addPost,
  addLiveStudySession,
  addMentorshipApplication,
};
