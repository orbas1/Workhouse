const eventService = require('../services/eventManagement');
const logger = require('../utils/logger');

async function createEvent(req, res) {
  try {
    const event = await eventService.createEvent(req.body, req.user.id);
    res.status(201).json(event);
  } catch (err) {
    logger.error('Failed to create event', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getTemplates(req, res) {
  const templates = await eventService.getTemplates();
  res.json(templates);
}

async function updateEvent(req, res) {
  const { eventId } = req.params;
  try {
    const event = await eventService.updateEvent(eventId, req.body);
    res.json(event);
  } catch (err) {
    logger.error('Failed to update event', { error: err.message, eventId });
    res.status(404).json({ error: err.message });
  }
}

async function deleteEvent(req, res) {
  const { eventId } = req.params;
  try {
    await eventService.deleteEvent(eventId);
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete event', { error: err.message, eventId });
    res.status(404).json({ error: err.message });
  }
}

async function configureAgenda(req, res) {
  const { eventId } = req.params;
  try {
    const event = await eventService.configureAgenda(eventId, req.body);
    res.json(event);
  } catch (err) {
    logger.error('Failed to configure agenda', { error: err.message, eventId });
    res.status(404).json({ error: err.message });
  }
}

async function filterEvents(req, res) {
  const events = await eventService.filterEvents(req.query);
  res.json(events);
}

async function setupPayment(req, res) {
  const { eventId } = req.params;
  try {
    const event = await eventService.setupPayment(eventId, req.body);
    res.json(event);
  } catch (err) {
    logger.error('Failed to setup payment', { error: err.message, eventId });
    res.status(404).json({ error: err.message });
  }
}

async function getUpcomingEvents(req, res) {
  const events = await eventService.getUpcomingEvents();
  res.json(events);
}

async function collectFeedback(req, res) {
  const { eventId } = req.params;
  try {
    const record = await eventService.collectFeedback(eventId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to collect feedback', { error: err.message, eventId });
    res.status(404).json({ error: err.message });
  }
}

async function getEventHistory(req, res) {
  const { userId } = req.params;
  const events = await eventService.getEventHistory(userId);
  res.json(events);
}

module.exports = {
  createEvent,
  getTemplates,
  updateEvent,
  deleteEvent,
  configureAgenda,
  filterEvents,
  setupPayment,
  getUpcomingEvents,
  collectFeedback,
  getEventHistory
};
