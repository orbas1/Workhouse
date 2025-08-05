const {
  scheduleSession,
  listAllSessions,
  recordSessionAttendance,
  getTrainingResources,
  reviewTrainingResource,
  completeTraining,
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

async function getResourcesHandler(req, res) {
  try {
    const resources = await getTrainingResources(req.query.tags);
    res.json(resources);
  } catch (err) {
    logger.error('Failed to retrieve training resources', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function reviewResourceHandler(req, res) {
  const { resourceId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const review = await reviewTrainingResource(resourceId, userId, req.body);
    res.status(201).json(review);
  } catch (err) {
    logger.error('Failed to review training resource', { error: err.message, resourceId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function completeTrainingHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const record = await completeTraining(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to record training completion', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  scheduleSessionHandler,
  listSessionsHandler,
  recordAttendanceHandler,
  getResourcesHandler,
  reviewResourceHandler,
  completeTrainingHandler,
};
