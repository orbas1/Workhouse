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

module.exports = {
  scheduleSession,
  listAllSessions,
  recordSessionAttendance,
};
