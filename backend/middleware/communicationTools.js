const communicationService = require('../services/communicationTools');

function requireSession(req, res, next) {
  const { sessionId } = req.params;
  const session = communicationService.getSession(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  req.communicationSession = session;
  next();
}

module.exports = { requireSession };
