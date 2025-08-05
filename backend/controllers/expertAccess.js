const {
  bookSession,
  listWebinars,
  requestAdvice,
  requestProjectFeedback,
} = require('../services/expertAccess');
const logger = require('../utils/logger');

async function bookSessionHandler(req, res) {
  try {
    const { expertId } = req.params;
    const { sessionDate } = req.body;
    const session = await bookSession(req.user.id, expertId, sessionDate);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to book expert session', { error: err.message });
    res.status(500).json({ error: 'Failed to book session' });
  }
}

async function listWebinarsHandler(req, res) {
  try {
    const webinars = await listWebinars();
    res.json(webinars);
  } catch (err) {
    logger.error('Failed to retrieve webinars', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve webinars' });
  }
}

async function requestAdviceHandler(req, res) {
  try {
    const { expertId } = req.params;
    const { topic, details } = req.body;
    const request = await requestAdvice(req.user.id, expertId, topic, details);
    res.status(201).json(request);
  } catch (err) {
    logger.error('Failed to request advice', { error: err.message });
    res.status(500).json({ error: 'Failed to request advice' });
  }
}

async function requestProjectFeedbackHandler(req, res) {
  try {
    const { projectId } = req.params;
    const { expertId, notes } = req.body;
    const request = await requestProjectFeedback(req.user.id, projectId, expertId, notes);
    res.status(201).json(request);
  } catch (err) {
    logger.error('Failed to request project feedback', { error: err.message });
    res.status(500).json({ error: 'Failed to request feedback' });
  }
}

module.exports = {
  bookSessionHandler,
  listWebinarsHandler,
  requestAdviceHandler,
  requestProjectFeedbackHandler,
};
