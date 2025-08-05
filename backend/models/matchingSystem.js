const { randomUUID } = require('crypto');

// Stores participants for each event
const eventParticipants = new Map(); // eventId -> [userId]

// Stores matches by id
const matches = new Map(); // matchId -> { id, eventId, participants:[a,b], duration, createdAt }
const eventMatches = new Map(); // eventId -> [matchId]

// Store user preferences
const preferences = new Map(); // userId -> { ...prefs, updatedAt }

// Track user match history
const userHistory = new Map(); // userId -> [matchId]

// Feedback records
const feedback = [];

function setParticipants(eventId, participants) {
  eventParticipants.set(eventId, participants);
}

function createMatches(eventId, duration) {
  const participants = eventParticipants.get(eventId) || [];
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const createdMatches = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    if (!shuffled[i + 1]) break; // ignore unmatched participant
    const matchId = randomUUID();
    const match = {
      id: matchId,
      eventId,
      participants: [shuffled[i], shuffled[i + 1]],
      duration,
      createdAt: new Date(),
    };
    matches.set(matchId, match);
    eventMatches.set(eventId, [...(eventMatches.get(eventId) || []), matchId]);
    createdMatches.push(match);
    for (const userId of match.participants) {
      const history = userHistory.get(userId) || [];
      history.push(matchId);
      userHistory.set(userId, history);
    }
  }
  return createdMatches;
}

function getMatchesByDuration(eventId, duration) {
  const ids = eventMatches.get(eventId) || [];
  return ids.map((id) => matches.get(id)).filter((m) => m.duration === duration);
}

function generateSuggestions(eventId) {
  const participants = eventParticipants.get(eventId) || [];
  const matchIds = eventMatches.get(eventId) || [];
  const existing = new Set(
    matchIds.map((id) => {
      const pair = matches.get(id).participants;
      return `${pair[0]}:${pair[1]}`;
    })
  );
  const suggestions = [];
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const keyAB = `${participants[i]}:${participants[j]}`;
      const keyBA = `${participants[j]}:${participants[i]}`;
      if (!existing.has(keyAB) && !existing.has(keyBA)) {
        suggestions.push({ participants: [participants[i], participants[j]] });
      }
    }
  }
  return suggestions;
}

function setPreferences(userId, prefs) {
  const record = { ...prefs, updatedAt: new Date() };
  preferences.set(userId, record);
  return record;
}

function getHistory(userId) {
  const ids = userHistory.get(userId) || [];
  return ids.map((id) => matches.get(id));
}

function recordFeedback(matchId, userId, rating, comments) {
  const entry = {
    id: randomUUID(),
    matchId,
    userId,
    rating,
    comments: comments || null,
    createdAt: new Date(),
  };
  feedback.push(entry);
  return entry;
}

module.exports = {
  setParticipants,
  createMatches,
  getMatchesByDuration,
  generateSuggestions,
  setPreferences,
  getHistory,
  recordFeedback,
};

