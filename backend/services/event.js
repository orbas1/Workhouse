const eventModel = require('../models/eventController');
const logger = require('../utils/logger');

function ensureType(event, expectedType) {
  if (!event || event.type !== expectedType) {
    return null;
  }
  return event;
}

async function createPitchEvent(data, hostId) {
  const event = eventModel.createEvent({ ...data, type: 'pitch', hostId });
  logger.info('Pitch event created', { eventId: event.id, hostId });
  return event;
}

async function getPitchEvent(eventId) {
  return ensureType(eventModel.findById(eventId), 'pitch');
}

async function attendPitchEvent(eventId, userId) {
  const event = await getPitchEvent(eventId);
  if (!event) return null;
  eventModel.addAttendee(eventId, userId);
  logger.info('User attending pitch event', { eventId, userId });
  return { success: true };
}

async function setupPitchLivestream(eventId, url) {
  const event = await getPitchEvent(eventId);
  if (!event) return null;
  eventModel.setLivestream(eventId, url);
  logger.info('Livestream set for pitch event', { eventId });
  return { streamUrl: url };
}

async function getPitchLivestream(eventId) {
  const event = await getPitchEvent(eventId);
  if (!event) return null;
  return { streamUrl: eventModel.getLivestream(eventId) };
}

async function createNetworkingEvent(data, hostId) {
  const event = eventModel.createEvent({ ...data, type: 'networking', hostId });
  logger.info('Networking event created', { eventId: event.id, hostId });
  return event;
}

async function getNetworkingEvent(eventId) {
  return ensureType(eventModel.findById(eventId), 'networking');
}

async function listNetworkingEvents() {
  return eventModel.listByType('networking');
}

async function attendNetworkingEvent(eventId, userId) {
  const event = await getNetworkingEvent(eventId);
  if (!event) return null;
  eventModel.addAttendee(eventId, userId);
  logger.info('User attending networking event', { eventId, userId });
  return { success: true };
async function listNetworkingEventsForHost(hostId) {
  return eventModel
    .findByHost(hostId)
    .filter((e) => e.type === 'networking');
}

async function listNetworkingEventsForUser(userId) {
  return eventModel
    .findByAttendee(userId)
    .filter((e) => e.type === 'networking');
}

async function createWorkshopEvent(data, hostId) {
  const event = eventModel.createEvent({ ...data, type: 'workshop', hostId });
  logger.info('Workshop event created', { eventId: event.id, hostId });
  return event;
}

async function getWorkshopEvent(eventId) {
  return ensureType(eventModel.findById(eventId), 'workshop');
}

async function submitQuestion(eventId, userId, question) {
  const event = eventModel.findById(eventId);
  if (!event) return null;
  const q = eventModel.addQuestion(eventId, userId, question);
  logger.info('Question submitted for event', { eventId, userId });
  return q;
}

async function getQuestions(eventId) {
  const questions = eventModel.getQuestions(eventId);
  return questions || null;
}

async function getEventById(eventId) {
  return eventModel.findById(eventId);
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
  createWorkshopEvent,
  getWorkshopEvent,
  submitQuestion,
  getQuestions,
  getEventById,
};
