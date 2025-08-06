const { randomUUID } = require('crypto');

// In-memory store for investor events keyed by id
const events = new Map();

function createEvent({ type, title, description, date, hostId }) {
  const id = randomUUID();
  const timestamp = new Date();
  const event = {
    id,
    type, // 'pitch', 'networking', 'workshop'
    title,
    description: description || null,
    date: new Date(date),
    hostId,
    attendees: new Set(),
    livestreamUrl: null,
    questions: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  events.set(id, event);
  return event;
}

function findById(id) {
  return events.get(id);
}

function addAttendee(id, userId) {
  const event = events.get(id);
  if (!event) return null;
  event.attendees.add(userId);
  event.updatedAt = new Date();
  return event;
}

function setLivestream(id, url) {
  const event = events.get(id);
  if (!event) return null;
  event.livestreamUrl = url;
  event.updatedAt = new Date();
  return event.livestreamUrl;
}

function getLivestream(id) {
  return events.get(id)?.livestreamUrl || null;
}

function addQuestion(id, userId, question) {
  const event = events.get(id);
  if (!event) return null;
  const entry = { id: randomUUID(), userId, question, createdAt: new Date() };
  event.questions.push(entry);
  event.updatedAt = new Date();
  return entry;
}

function getQuestions(id) {
  const event = events.get(id);
  return event ? event.questions : null;
}

function listByType(type) {
  return Array.from(events.values()).filter((e) => e.type === type);
}

function findByHost(hostId) {
  return Array.from(events.values()).filter((e) => e.hostId === hostId);
}

function findByAttendee(userId) {
  return Array.from(events.values()).filter((e) => e.attendees.has(userId));
}

module.exports = {
  createEvent,
  findById,
  addAttendee,
  setLivestream,
  getLivestream,
  addQuestion,
  getQuestions,
  listByType,
  findByHost,
  findByAttendee,
};
