const { getSessionById } = require('../models/session');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { sessionId } = req.params;
  const session = getSessionById(sessionId);
  if (!session) {
    logger.error('Session not found', { sessionId });
    return res.status(404).json({ error: 'Session not found' });
  }
  req.session = session;
  next();
};
