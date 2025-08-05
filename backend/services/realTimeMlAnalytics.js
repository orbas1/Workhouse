const logger = require('../utils/logger');
const model = require('../models/realTimeMlAnalytics');

async function getRealTimeEngagement(eventId) {
  const data = model.findByEventId(eventId);
  logger.info('Real-time engagement metrics retrieved', { eventId, count: data.length });
  return data;
}

async function checkEvent(eventId) {
  const exists = model.eventExists(eventId);
  logger.info('Event existence checked', { eventId, exists });
  return exists;
}

module.exports = {
  getRealTimeEngagement,
  checkEvent,
};
