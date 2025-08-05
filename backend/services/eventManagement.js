const eventModel = require('../models/event');
const logger = require('../utils/logger');

async function createEvent(data, userId) {
  const event = eventModel.createEvent({ ...data, createdBy: userId });
  logger.info('Event created', { eventId: event.id, createdBy: userId });
  return event;
}

async function getTemplates() {
  return eventModel.getTemplates();
}

async function updateEvent(eventId, updates) {
  const updated = eventModel.updateEvent(eventId, updates);
  if (!updated) {
    logger.error('Attempt to update non-existent event', { eventId });
    throw new Error('Event not found');
  }
  logger.info('Event updated', { eventId });
  return updated;
}

async function deleteEvent(eventId) {
  const deleted = eventModel.deleteEvent(eventId);
  if (!deleted) {
    logger.error('Attempt to delete non-existent event', { eventId });
    throw new Error('Event not found');
  }
  logger.info('Event deleted', { eventId });
}

async function configureAgenda(eventId, agenda) {
  const updated = eventModel.setAgenda(eventId, agenda);
  if (!updated) {
    logger.error('Attempt to set agenda for non-existent event', { eventId });
    throw new Error('Event not found');
  }
  logger.info('Agenda configured', { eventId });
  return updated;
}

async function filterEvents(filters) {
  return eventModel.filterEvents(filters);
}

async function setupPayment(eventId, payment) {
  const updated = eventModel.setupPayment(eventId, payment);
  if (!updated) {
    logger.error('Attempt to setup payment for non-existent event', { eventId });
    throw new Error('Event not found');
  }
  logger.info('Payment setup configured', { eventId });
  return updated;
}

async function getUpcomingEvents() {
  return eventModel.getUpcomingEvents();
}

async function collectFeedback(eventId, feedback) {
  const record = eventModel.collectFeedback(eventId, feedback);
  if (!record) {
    logger.error('Attempt to collect feedback for non-existent event', { eventId });
    throw new Error('Event not found');
  }
  logger.info('Feedback collected', { eventId, userId: feedback.userId });
  return record;
}

async function getEventHistory(userId) {
  return eventModel.getEventHistory(userId);
}

async function getEventById(eventId) {
  return eventModel.getEventById(eventId);
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
  getEventHistory,
  getEventById
};
