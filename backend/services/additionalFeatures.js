const model = require('../models/additionalFeatures');
const logger = require('../utils/logger');

async function listPathways() {
  const data = model.listPathways();
  logger.info('Retrieved mentorship pathways', { count: data.length });
  return data;
}

async function createGroupSession(data) {
  const session = model.addGroupSession(data);
  logger.info('Group session created', { sessionId: session.id, mentorId: data.mentorId });
  return session;
}

async function createLiveQA(data) {
  const qa = model.addLiveQA(data);
  logger.info('Live QA scheduled', { qaId: qa.id, mentorId: data.mentorId });
  return qa;
}

async function getCommunityForum() {
  const posts = model.getForumPosts();
  logger.info('Fetched community forum posts', { count: posts.length });
  return posts;
}

async function recommendResource(menteeId, resource, mentorId) {
  const rec = model.recommendResource({ menteeId, resource, mentorId });
  logger.info('Resource recommended', { menteeId, mentorId });
  return rec;
}

async function getAnalyticsDashboard(userId) {
  const dashboard = model.getAnalyticsDashboard(userId);
  logger.info('Retrieved mentorship analytics dashboard', { userId });
  return dashboard;
}

async function setupConfidentialityAgreement(sessionId, text) {
  const agreement = model.setupConfidentialityAgreement(sessionId, text);
  logger.info('Confidentiality agreement setup', { sessionId });
  return agreement;
}

async function getPathwayDetail(pathwayId) {
  const pathway = model.getPathway(pathwayId);
  if (!pathway) {
    throw new Error('Pathway not found');
  }
  logger.info('Retrieved pathway detail', { pathwayId });
  return pathway;
}

async function joinGroupSession(sessionId, userId) {
  const session = model.joinGroupSession(sessionId, userId);
  if (!session) {
    throw new Error('Group session not found');
  }
  logger.info('User joined group session', { sessionId, userId });
  return session;
}

async function getUpcomingLiveQa() {
  const sessions = model.getUpcomingLiveQAs();
  logger.info('Retrieved upcoming live QA sessions', { count: sessions.length });
  return sessions;
}

async function getCommunityDiscussions() {
  const posts = model.getForumPosts();
  logger.info('Retrieved community discussions', { count: posts.length });
  return posts;
}

async function assignLearningResource(menteeId, resource, mentorId) {
  const assignment = model.assignResource({ menteeId, resource, mentorId });
  logger.info('Resource assigned', { menteeId, mentorId });
  return assignment;
}

async function getMenteeProgress(menteeId) {
  const progress = model.getMenteeProgress(menteeId);
  logger.info('Retrieved mentee progress', { menteeId });
  return progress;
}

async function confirmConfidentiality(userId, sessionId) {
  const agreement = model.confirmConfidentiality(userId, sessionId);
  if (!agreement) {
    throw new Error('Agreement not found');
  }
  logger.info('Confidentiality agreement confirmed', { sessionId, userId });
  return agreement;
}

async function getBadges(userId) {
  const badges = model.getBadges(userId);
  logger.info('Retrieved user badges', { userId, count: badges.length });
  return badges;
}

module.exports = {
  listPathways,
  createGroupSession,
  createLiveQA,
  getCommunityForum,
  recommendResource,
  getAnalyticsDashboard,
  setupConfidentialityAgreement,
  getPathwayDetail,
  joinGroupSession,
  getUpcomingLiveQa,
  getCommunityDiscussions,
  assignLearningResource,
  getMenteeProgress,
  confirmConfidentiality,
  getBadges,
};

