const { randomUUID } = require('crypto');

const events = [];

function createEvent({ sellerId, buyerId = null, serviceId = null, startTime, endTime, status = 'available' }) {
  const event = {
    id: randomUUID(),
    sellerId,
    buyerId,
    serviceId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  events.push(event);
  return event;
}

function getEventsByUser(userId) {
  return events.filter((e) => e.sellerId === userId || e.buyerId === userId);
}

function getEventById(id) {
  return events.find((e) => e.id === id);
}

function updateEvent(id, updates) {
  const event = getEventById(id);
  if (!event) return null;
  Object.assign(event, updates, { updatedAt: new Date() });
  return event;
}

function deleteEvent(id) {
  const index = events.findIndex((e) => e.id === id);
  if (index !== -1) {
    return events.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  events,
  createEvent,
  getEventsByUser,
  getEventById,
  updateEvent,
  deleteEvent,
};
