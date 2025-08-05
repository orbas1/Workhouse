const expertAccessModel = require('../models/expertAccess');
const logger = require('../utils/logger');

function bookSession(userId, expertId, sessionDate) {
  const session = expertAccessModel.createSession({ userId, expertId, sessionDate });
  logger.info('Expert session booked', { sessionId: session.id, userId, expertId });
  return session;
}

function listWebinars() {
  const webinars = expertAccessModel.getWebinars();
  logger.info('Retrieved expert webinars', { count: webinars.length });
  return webinars;
}

function requestAdvice(userId, expertId, topic, details) {
  const request = expertAccessModel.createAdviceRequest({ userId, expertId, topic, details });
  logger.info('Expert advice requested', { requestId: request.id, userId, expertId });
  return request;
}

function requestProjectFeedback(userId, projectId, expertId, notes) {
  const request = expertAccessModel.createProjectFeedbackRequest({ userId, projectId, expertId, notes });
  logger.info('Project feedback requested', { requestId: request.id, userId, projectId, expertId });
  return request;
}

module.exports = {
  bookSession,
  listWebinars,
  requestAdvice,
  requestProjectFeedback,
};
