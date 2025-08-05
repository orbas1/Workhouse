const logger = require('../utils/logger');
const matchingModel = require('../models/matchingSystem');

async function runMatching(eventId, participants) {
  if (!Array.isArray(participants) || participants.length < 2) {
    throw new Error('At least two participants are required');
  }
  matchingModel.setParticipants(eventId, participants);
  const oneMinute = matchingModel.createMatches(eventId, 1);
  const threeMinute = matchingModel.createMatches(eventId, 3.5);
  logger.info('Matching run completed', { eventId, participants: participants.length });
  return { oneMinute, threeMinute };
}

async function getOneMinuteMatches(eventId) {
  return matchingModel.getMatchesByDuration(eventId, 1);
}

async function getThreeMinuteMatches(eventId) {
  return matchingModel.getMatchesByDuration(eventId, 3.5);
}

async function getPostEventSuggestions(eventId) {
  return matchingModel.generateSuggestions(eventId);
}

async function setMatchingPreferences(userId, prefs) {
  const record = matchingModel.setPreferences(userId, prefs);
  logger.info('Preferences updated', { userId });
  return record;
}

async function getMatchingHistory(userId) {
  return matchingModel.getHistory(userId);
}

async function submitMatchingFeedback(matchId, userId, rating, comments) {
  const feedback = matchingModel.recordFeedback(matchId, userId, rating, comments);
  logger.info('Feedback recorded', { matchId, userId });
  return feedback;
}

module.exports = {
  runMatching,
  getOneMinuteMatches,
  getThreeMinuteMatches,
  getPostEventSuggestions,
  setMatchingPreferences,
  getMatchingHistory,
  submitMatchingFeedback,
};

