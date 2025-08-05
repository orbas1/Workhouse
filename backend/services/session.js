const {
  createSession,
  getSessionById,
  updateSession,
  getSessionsByUser,
} = require('../models/session');
const logger = require('../utils/logger');

function scheduleSession(data) {
  logger.info('Scheduling session', { mentorId: data.mentorId, menteeId: data.menteeId });
  return createSession(data);
}

function setAgenda(sessionId, agenda) {
  const session = updateSession(sessionId, { agenda });
  if (!session) {
    throw new Error('Session not found');
  }
  logger.info('Agenda set for session', { sessionId });
  return session;
}

function getReminders(userId) {
  const now = new Date();
  return getSessionsByUser(userId).filter(
    (s) => s.status === 'scheduled' && s.scheduledFor > now
  );
}

function shareNotes(sessionId, note) {
  const session = getSessionById(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }
  session.notes.push({ note, createdAt: new Date() });
  session.updatedAt = new Date();
  logger.info('Note shared for session', { sessionId });
  return session;
}

function rescheduleSession(sessionId, newTime) {
  const session = updateSession(sessionId, { scheduledFor: new Date(newTime) });
  if (!session) {
    throw new Error('Session not found');
  }
  logger.info('Session rescheduled', { sessionId });
  return session;
}

function cancelSession(sessionId) {
  const session = updateSession(sessionId, { status: 'cancelled' });
  if (!session) {
    throw new Error('Session not found');
  }
  logger.info('Session cancelled', { sessionId });
  return session;
}

function getUpcomingSessions(userId) {
  const now = new Date();
  return getSessionsByUser(userId).filter(
    (s) => s.status === 'scheduled' && s.scheduledFor > now
  );
}

function requestMaterials(sessionId, materials) {
  const session = getSessionById(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }
  session.materials.push(...materials);
  session.updatedAt = new Date();
  logger.info('Materials requested for session', { sessionId });
  return session;
}

module.exports = {
  scheduleSession,
  setAgenda,
  getReminders,
  shareNotes,
  rescheduleSession,
  cancelSession,
  getUpcomingSessions,
  requestMaterials,
};
