const {
  scheduleSession,
  listAllSessions,
  recordSessionAttendance,
} = require('../services/training');
const logger = require('../utils/logger');

async function scheduleSessionHandler(req, res) {
  try {
    const session = await scheduleSession(req.body);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to schedule training session', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listSessionsHandler(req, res) {
  const sessions = await listAllSessions();
  res.json(sessions);
}

async function recordAttendanceHandler(req, res) {
  const { sessionId } = req.params;
  const { userId } = req.body;
  try {
    const record = await recordSessionAttendance(sessionId, userId);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to record training attendance', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  scheduleSessionHandler,
  listSessionsHandler,
  recordAttendanceHandler,
};
