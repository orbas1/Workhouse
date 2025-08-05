const { randomUUID } = require('crypto');

// In-memory storage for events and templates
const events = [];
const templates = [
  {
    id: randomUUID(),
    name: 'Standard Networking',
    description: 'Basic 1:1 speed networking format.'
  },
  {
    id: randomUUID(),
    name: 'Workshop',
    description: 'Networking combined with educational sessions.'
  }
];

function createEvent({ name, description, date, language, region, templateId, createdBy }) {
  const event = {
    id: randomUUID(),
    name,
    description: description || null,
    date: new Date(date),
    language: language || null,
    region: region || null,
    templateId: templateId || null,
    payment: null,
    agenda: null,
    createdBy,
    participants: [],
    feedback: [],
    createdAt: new Date()
  };
  events.push(event);
  return event;
}

function getEventById(eventId) {
  return events.find(e => e.id === eventId) || null;
}

function getTemplates() {
  return templates;
}

function updateEvent(eventId, updates) {
  const event = getEventById(eventId);
  if (!event) return null;
  Object.assign(event, updates, updates.date ? { date: new Date(updates.date) } : {});
  return event;
}

function deleteEvent(eventId) {
  const index = events.findIndex(e => e.id === eventId);
  if (index === -1) return false;
  events.splice(index, 1);
  return true;
}

function setAgenda(eventId, agenda) {
  const event = getEventById(eventId);
  if (!event) return null;
  event.agenda = agenda;
  return event;
}

function filterEvents({ language, region }) {
  return events.filter(e => {
    return (
      (language ? e.language === language : true) &&
      (region ? e.region === region : true)
    );
  });
}

function setupPayment(eventId, payment) {
  const event = getEventById(eventId);
  if (!event) return null;
  event.payment = payment;
  return event;
}

function getUpcomingEvents() {
  const now = new Date();
  return events.filter(e => e.date > now);
}

function collectFeedback(eventId, { userId, rating, comment }) {
  const event = getEventById(eventId);
  if (!event) return null;
  const record = {
    id: randomUUID(),
    userId,
    rating,
    comment: comment || null,
    createdAt: new Date()
  };
  event.feedback.push(record);
  return record;
}

function addParticipant(eventId, userId) {
  const event = getEventById(eventId);
  if (!event) return null;
  event.participants.push({ userId, joinedAt: new Date() });
  return true;
}

function getEventHistory(userId) {
  return events.filter(e => e.participants.some(p => p.userId === userId));
}

module.exports = {
  createEvent,
  getEventById,
  getTemplates,
  updateEvent,
  deleteEvent,
  setAgenda,
  filterEvents,
  setupPayment,
  getUpcomingEvents,
  collectFeedback,
  addParticipant,
  getEventHistory
};
