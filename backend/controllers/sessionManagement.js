const {
  scheduleSession,
  setAgenda,
  getReminders,
  shareNotes,
  rescheduleSession,
  cancelSession,
  getUpcomingSessions,
  requestMaterials,
} = require('../services/session');
const logger = require('../utils/logger');

async function scheduleSessionHandler(req, res) {
  try {
    const session = scheduleSession(req.body);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to schedule session', err);
    res.status(400).json({ error: err.message });
  }
}

async function setAgendaHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const session = setAgenda(sessionId, req.body.agenda);
    res.json(session);
  } catch (err) {
    logger.error('Failed to set agenda', err);
    res.status(404).json({ error: err.message });
  }
}

async function getRemindersHandler(req, res) {
  const { userId } = req.params;
  try {
    const reminders = getReminders(userId);
    res.json(reminders);
  } catch (err) {
    logger.error('Failed to get reminders', err);
    res.status(400).json({ error: err.message });
  }
}

async function shareNotesHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const session = shareNotes(sessionId, req.body.note);
    res.json(session);
  } catch (err) {
    logger.error('Failed to share notes', err);
    res.status(404).json({ error: err.message });
  }
}

async function rescheduleSessionHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const session = rescheduleSession(sessionId, req.body.newTime);
    res.json(session);
  } catch (err) {
    logger.error('Failed to reschedule session', err);
    res.status(404).json({ error: err.message });
  }
}

async function cancelSessionHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const session = cancelSession(sessionId);
    res.json(session);
  } catch (err) {
    logger.error('Failed to cancel session', err);
    res.status(404).json({ error: err.message });
  }
}

async function getUpcomingSessionsHandler(req, res) {
  const { userId } = req.params;
  try {
    const sessions = getUpcomingSessions(userId);
    res.json(sessions);
  } catch (err) {
    logger.error('Failed to get upcoming sessions', err);
    res.status(400).json({ error: err.message });
  }
}

async function requestMaterialsHandler(req, res) {
  const { sessionId } = req.params;
  try {
    const session = requestMaterials(sessionId, req.body.materials);
    res.json(session);
  } catch (err) {
    logger.error('Failed to request materials', err);
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  scheduleSessionHandler,
  setAgendaHandler,
  getRemindersHandler,
  shareNotesHandler,
  rescheduleSessionHandler,
  cancelSessionHandler,
  getUpcomingSessionsHandler,
  requestMaterialsHandler,
};
