const { checkEvent } = require('../services/realTimeMlAnalytics');
const logger = require('../utils/logger');

async function ensureEventExists(req, res, next) {
  const { eventId } = req.params;
  const exists = await checkEvent(eventId);
  if (!exists) {
    logger.error('Event not found for real-time analytics', { eventId });
    return res.status(404).json({ error: 'Event not found' });
  }
  next();
}

module.exports = {
  ensureEventExists,
};
