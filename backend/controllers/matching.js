const {
  findMatches,
  setPreferences,
  submitFeedback,
  subscribeNotifications,
  getNotifications,
  getHistory,
  getMatchesByStage,
} = require('../services/matching');
const logger = require('../utils/logger');

async function findMatchesHandler(req, res) {
  try {
    const match = await findMatches(req.user.id, req.body);
    res.status(201).json(match);
  } catch (err) {
    logger.error('Match finding failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function setPreferencesHandler(req, res) {
  const { profileId } = req.params;
  if (profileId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized to set preferences for this profile' });
  }
  try {
    const record = await setPreferences(profileId, req.body);
    res.status(200).json(record);
  } catch (err) {
    logger.error('Setting preferences failed', { error: err.message, profileId });
    res.status(400).json({ error: err.message });
  }
}

async function submitFeedbackHandler(req, res) {
  const { matchId } = req.params;
  try {
    const record = await submitFeedback(matchId, req.user.id, req.body.rating, req.body.comments);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Submitting match feedback failed', { error: err.message, matchId });
    res.status(400).json({ error: err.message });
  }
}

async function subscribeNotificationsHandler(req, res) {
  try {
    const result = await subscribeNotifications(req.user.id);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Subscription to notifications failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getNotificationsHandler(req, res) {
  const { profileId } = req.params;
  if (profileId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized to access notifications' });
  }
  try {
    const result = await getNotifications(profileId);
    res.json({ notifications: result });
  } catch (err) {
    logger.error('Fetching notifications failed', { error: err.message, profileId });
    res.status(400).json({ error: err.message });
  }
}

async function getHistoryHandler(req, res) {
  const { profileId } = req.params;
  if (profileId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized to access history' });
  }
  try {
    const history = await getHistory(profileId);
    res.json({ history });
  } catch (err) {
    logger.error('Fetching match history failed', { error: err.message, profileId });
    res.status(400).json({ error: err.message });
  }
}

async function getMatchesByStageHandler(req, res) {
  const { stage } = req.params;
  try {
    const matches = await getMatchesByStage(stage);
    res.json({ matches });
  } catch (err) {
    logger.error('Fetching matches by stage failed', { error: err.message, stage });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  findMatchesHandler,
  setPreferencesHandler,
  submitFeedbackHandler,
  subscribeNotificationsHandler,
  getNotificationsHandler,
  getHistoryHandler,
  getMatchesByStageHandler,
};
