const { randomUUID } = require('crypto');

const events = new Map();

function listEvents() {
  return Array.from(events.values());
}

function createEvent({ title, description = '', start, end, courseId, type, createdBy }) {
  const id = randomUUID();
  const event = {
    id,
    title,
    description,
    start,
    end,
    courseId,
    type,
    createdBy,
  };
  events.set(id, event);
  return event;
}

module.exports = {
  listEvents,
  createEvent,
};
