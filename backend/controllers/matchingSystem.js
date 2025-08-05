const {
  runMatching,
  getOneMinuteMatches,
  getThreeMinuteMatches,
  getPostEventSuggestions,
  setMatchingPreferences,
  getMatchingHistory,
  submitMatchingFeedback,
} = require('../services/matchingSystem');
const logger = require('../utils/logger');

async function runMatchingHandler(req, res) {
  const { eventId } = req.params;
  const { participants } = req.body;
  try {
    const result = await runMatching(eventId, participants);
    res.json(result);
  } catch (err) {
    logger.error('Failed to run matching', { error: err.message, eventId });
    res.status(400).json({ error: err.message });
  }
}

async function oneMinuteMatchesHandler(req, res) {
  const { eventId } = req.params;
  try {
    const matches = await getOneMinuteMatches(eventId);
    res.json({ matches });
  } catch (err) {
    logger.error('Failed to fetch one-minute matches', { error: err.message, eventId });
    res.status(400).json({ error: err.message });
  }
}

async function threeMinuteMatchesHandler(req, res) {
  const { eventId } = req.params;
  try {
    const matches = await getThreeMinuteMatches(eventId);
    res.json({ matches });
  } catch (err) {
    logger.error('Failed to fetch three-minute matches', { error: err.message, eventId });
    res.status(400).json({ error: err.message });
  }
}

async function postEventSuggestionsHandler(req, res) {
  const { eventId } = req.params;
  try {
    const suggestions = await getPostEventSuggestions(eventId);
    res.json({ suggestions });
  } catch (err) {
    logger.error('Failed to fetch post-event suggestions', { error: err.message, eventId });
    res.status(400).json({ error: err.message });
  }
}

async function setPreferencesHandler(req, res) {
  const { userId } = req.params;
  try {
    const record = await setMatchingPreferences(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to set preferences', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getHistoryHandler(req, res) {
  const { userId } = req.params;
  try {
    const history = await getMatchingHistory(userId);
    res.json({ history });
  } catch (err) {
    logger.error('Failed to fetch matching history', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function submitFeedbackHandler(req, res) {
  const { matchId } = req.params;
  const { userId, rating, comments } = req.body;
  try {
    const record = await submitMatchingFeedback(matchId, userId, rating, comments);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to submit feedback', { error: err.message, matchId, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  runMatchingHandler,
  oneMinuteMatchesHandler,
  threeMinuteMatchesHandler,
  postEventSuggestionsHandler,
  setPreferencesHandler,
  getHistoryHandler,
  submitFeedbackHandler,
};

