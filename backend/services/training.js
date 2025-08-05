const logger = require('../utils/logger');
const trainingModel = require('../models/training');

async function scheduleSession(data) {
  const session = trainingModel.createSession(data);
  logger.info('Training session scheduled', { sessionId: session.id });
  return session;
}

async function listAllSessions() {
  return trainingModel.listSessions();
}

async function recordSessionAttendance(sessionId, userId) {
  const session = trainingModel.getSessionById(sessionId);
  if (!session) {
    throw new Error('Training session not found');
  }
  const record = trainingModel.recordAttendance(sessionId, userId);
  logger.info('Training attendance recorded', { sessionId, userId });
  return record;
}

async function getTrainingResources(tags) {
  const tagArray = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const resources = trainingModel.listResources(tagArray);
  logger.info('Training resources retrieved', { tags: tagArray, count: resources.length });
  return resources;
}

async function reviewTrainingResource(resourceId, userId, data) {
  const review = trainingModel.addReview(resourceId, userId, data);
  if (!review) {
    logger.error('Training resource not found for review', { resourceId });
    throw new Error('Training resource not found');
  }
  logger.info('Training resource reviewed', { resourceId, userId, rating: data.rating });
  return review;
}

async function completeTraining(userId, data) {
  const record = trainingModel.recordCompletion({ userId, ...data });
  if (!record) {
    logger.error('Training resource not found for completion', { resourceId: data.resourceId, userId });
    throw new Error('Training resource not found');
  }
  if (data.externalId) {
    logger.info('Synced training completion with external platform', { externalId: data.externalId });
  }
  logger.info('Training completion recorded', { resourceId: data.resourceId, userId });
  return record;
}

module.exports = {
  scheduleSession,
  listAllSessions,
  recordSessionAttendance,
  getTrainingResources,
  reviewTrainingResource,
  completeTraining,
};
