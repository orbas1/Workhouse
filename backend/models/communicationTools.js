const { randomUUID } = require('crypto');

// In-memory storage structures
const sessions = new Map(); // sessionId -> session
const contactExchanges = [];
const languageRooms = new Map(); // language -> { id, language, createdAt }
const history = [];

const messageTemplates = [
  'Great connecting with you!',
  'Let\'s stay in touch.',
  'I enjoyed our conversation.',
];

function createSession(sessionId, participants = [], language = 'en') {
  if (sessions.has(sessionId)) {
    return sessions.get(sessionId);
  }
  const session = {
    id: randomUUID(),
    sessionId,
    participants,
    language,
    startedAt: new Date(),
    endedAt: null,
  };
  sessions.set(sessionId, session);
  participants.forEach(userId =>
    history.push({ userId, sessionId, action: 'VIDEO_START', timestamp: new Date() })
  );
  return session;
}

function endSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;
  session.endedAt = new Date();
  session.participants.forEach(userId =>
    history.push({ userId, sessionId, action: 'VIDEO_END', timestamp: new Date() })
  );
  return session;
}

function addContactExchange(sessionId, userId, contactInfo) {
  const exchange = {
    id: randomUUID(),
    sessionId,
    userId,
    contactInfo,
    exchangedAt: new Date(),
  };
  contactExchanges.push(exchange);
  history.push({ userId, sessionId, action: 'CONTACT_EXCHANGE', details: contactInfo, timestamp: new Date() });
  return exchange;
}

function getTemplates() {
  return messageTemplates;
}

function createLanguageRoom(language) {
  const room = { id: randomUUID(), language, createdAt: new Date() };
  languageRooms.set(room.id, room);
  return room;
}

function getHistory(userId) {
  return history.filter(h => h.userId === userId);
}

function getSession(sessionId) {
  return sessions.get(sessionId);
}

function getSessionAnalytics(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;
  const contactCount = contactExchanges.filter(
    (c) => c.sessionId === sessionId
  ).length;
  return {
    sessionId,
    participants: session.participants.length,
    contactExchanges: contactCount,
    active: !session.endedAt,
  };
}

module.exports = {
  createSession,
  endSession,
  addContactExchange,
  getTemplates,
  createLanguageRoom,
  getHistory,
  getSession,
  getSessionAnalytics,
};
