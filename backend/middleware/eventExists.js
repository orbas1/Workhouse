const eventService = require('../services/eventManagement');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  const { eventId } = req.params;
  const event = await eventService.getEventById(eventId);
  if (!event) {
    logger.error('Event not found', { eventId });
    return res.status(404).json({ error: 'Event not found' });
  }
  req.event = event;
  next();
};
