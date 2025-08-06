const eventService = require('../services/event');
const logger = require('../utils/logger');

async function createPitchEvent(req, res) {
  try {
    const event = await eventService.createPitchEvent(req.body, req.user.id);
    res.status(201).json(event);
  } catch (err) {
    logger.error('Failed to create pitch event', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getPitchEvent(req, res) {
  const event = await eventService.getPitchEvent(req.params.eventId);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
}

async function attendPitchEvent(req, res) {
  const result = await eventService.attendPitchEvent(req.params.eventId, req.user.id);
  if (!result) return res.status(404).json({ error: 'Event not found' });
  res.json(result);
}

async function setupPitchLivestream(req, res) {
  const { eventId } = req.params;
  const { streamUrl } = req.body;
  const result = await eventService.setupPitchLivestream(eventId, streamUrl);
  if (!result) return res.status(404).json({ error: 'Event not found' });
  res.json(result);
}

async function getPitchLivestream(req, res) {
  const result = await eventService.getPitchLivestream(req.params.eventId);
  if (!result) return res.status(404).json({ error: 'Event not found' });
  res.json(result);
}

async function createNetworkingEvent(req, res) {
  try {
    const event = await eventService.createNetworkingEvent(req.body, req.user.id);
    res.status(201).json(event);
  } catch (err) {
    logger.error('Failed to create networking event', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getNetworkingEvent(req, res) {
  const event = await eventService.getNetworkingEvent(req.params.eventId);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
}

async function listNetworkingEvents(req, res) {
  const events = await eventService.listNetworkingEvents();
  res.json(events);
}

async function attendNetworkingEvent(req, res) {
  const result = await eventService.attendNetworkingEvent(req.params.eventId, req.user.id);
  if (!result) return res.status(404).json({ error: 'Event not found' });
  res.json(result);
}

async function listNetworkingEventsForHost(req, res) {
  const events = await eventService.listNetworkingEventsForHost(req.user.id);
  res.json(events);
}

async function listNetworkingEventsForUser(req, res) {
  const events = await eventService.listNetworkingEventsForUser(req.user.id);
  res.json(events);
}

async function createWorkshop(req, res) {
  try {
    const event = await eventService.createWorkshopEvent(req.body, req.user.id);
    res.status(201).json(event);
  } catch (err) {
    logger.error('Failed to create workshop', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getWorkshop(req, res) {
  const event = await eventService.getWorkshopEvent(req.params.eventId);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
}

async function submitQuestion(req, res) {
  const { eventId } = req.params;
  const { question } = req.body;
  const result = await eventService.submitQuestion(eventId, req.user.id, question);
  if (!result) return res.status(404).json({ error: 'Event not found' });
  res.status(201).json(result);
}

async function getQuestions(req, res) {
  const questions = await eventService.getQuestions(req.params.eventId);
  if (!questions) return res.status(404).json({ error: 'Event not found' });
  res.json(questions);
}

module.exports = {
  createPitchEvent,
  getPitchEvent,
  attendPitchEvent,
  setupPitchLivestream,
  getPitchLivestream,
  createNetworkingEvent,
  getNetworkingEvent,
  listNetworkingEvents,
  attendNetworkingEvent,
  listNetworkingEventsForHost,
  listNetworkingEventsForUser,
  createWorkshop,
  getWorkshop,
  submitQuestion,
  getQuestions,
};
