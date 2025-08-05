const { randomUUID } = require('crypto');

// In-memory storage for participants keyed by `${eventId}:${userId}`
const participants = new Map();
// Waitlists keyed by eventId -> Set of userIds
const waitlists = new Map();

function key(eventId, userId) {
  return `${eventId}:${userId}`;
}

function register(eventId, userId, profile) {
  const k = key(eventId, userId);
  if (participants.has(k)) {
    throw new Error('User already registered for this event');
  }
  const participant = {
    id: randomUUID(),
    eventId,
    userId,
    profile: { ...profile },
    preferences: {},
    status: 'registered',
    payment: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  participants.set(k, participant);
  return participant;
}

function getParticipant(eventId, userId) {
  return participants.get(key(eventId, userId)) || null;
}

function findByUser(userId) {
  for (const participant of participants.values()) {
    if (participant.userId === userId) return participant;
  }
  return null;
}

function updatePreferences(userId, preferences) {
  const participant = findByUser(userId);
  if (!participant) return null;
  participant.preferences = { ...participant.preferences, ...preferences };
  participant.updatedAt = new Date();
  return participant;
}

function listByEvent(eventId) {
  return Array.from(participants.values()).filter(
    (p) => p.eventId === eventId && p.status === 'registered'
  );
}

function addToWaitlist(eventId, userId) {
  const list = waitlists.get(eventId) || new Set();
  list.add(userId);
  waitlists.set(eventId, list);
  return { eventId, userId };
}

function processPayment(eventId, userId, payment) {
  const participant = getParticipant(eventId, userId);
  if (!participant) return null;
  participant.payment = {
    amount: payment.amount,
    method: payment.method,
    paidAt: new Date(),
  };
  participant.updatedAt = new Date();
  return participant;
}

function updateProfile(userId, updates) {
  const participant = findByUser(userId);
  if (!participant) return null;
  participant.profile = { ...participant.profile, ...updates };
  participant.updatedAt = new Date();
  return participant;
}

function cancelRegistration(eventId, userId) {
  const participant = getParticipant(eventId, userId);
  if (!participant) return null;
  participant.status = 'cancelled';
  participant.updatedAt = new Date();
  return participant;
}

module.exports = {
  register,
  getParticipant,
  findByUser,
  updatePreferences,
  listByEvent,
  addToWaitlist,
  processPayment,
  updateProfile,
  cancelRegistration,
};

