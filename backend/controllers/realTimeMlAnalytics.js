const { getRealTimeEngagement } = require('../services/realTimeMlAnalytics');
const logger = require('../utils/logger');

async function realTimeEngagementHandler(req, res) {
  const { eventId } = req.params;
  try {
    const metrics = await getRealTimeEngagement(eventId);
    res.json({ eventId, metrics });
  } catch (err) {
    logger.error('Failed to fetch real-time engagement metrics', { error: err.message, eventId });
    res.status(500).json({ error: 'Failed to fetch engagement metrics' });
  }
}

module.exports = {
  realTimeEngagementHandler,
};
