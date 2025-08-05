const logger = require('../utils/logger');
const model = require('../models/socialLearning');

async function joinGroup(userId, groupId) {
  const membership = model.addMemberToGroup(groupId, userId);
  if (!membership) {
    const err = new Error('Already a member of this group');
    err.status = 400;
    throw err;
  }
  logger.info('User joined group', { userId, groupId });
  return membership;
}

async function postToGroup(groupId, userId, content) {
  const post = model.addPost({ groupId, userId, content });
  logger.info('Post created in group', { postId: post.id, groupId, userId });
  return post;
}

async function scheduleLiveStudy(groupId, hostId, data) {
  const session = model.addLiveStudySession(groupId, hostId, data);
  logger.info('Live study session scheduled', { sessionId: session.id, groupId, hostId });
  return session;
}

async function applyForMentorship(userId, message) {
  const application = model.addMentorshipApplication(userId, message);
  logger.info('Mentorship application submitted', { applicationId: application.id, userId });
  return application;
}

module.exports = {
  joinGroup,
  postToGroup,
  scheduleLiveStudy,
  applyForMentorship,
};
