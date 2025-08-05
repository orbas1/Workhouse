const {
  runMatching,
  searchProfiles,
  sendInvitation,
  setupTrialSession,
  getManualMatches,
  respondInvitation,
  getMatchHistory,
} = require('../services/matchingEngine');
const logger = require('../utils/logger');

async function runMatchingHandler(req, res) {
  try {
    const matches = await runMatching(req.user?.id);
    res.json({ matches });
  } catch (err) {
    logger.error('Failed to run matching', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function searchProfilesHandler(req, res) {
  try {
    const results = await searchProfiles(req.query);
    res.json({ results });
  } catch (err) {
    logger.error('Profile search failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function sendInvitationHandler(req, res) {
  const { userId } = req.params;
  try {
    const invitation = await sendInvitation(req.user.id, userId, req.body.message);
    res.status(201).json(invitation);
  } catch (err) {
    logger.error('Failed to send invitation', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function setupTrialSessionHandler(req, res) {
  try {
    const session = await setupTrialSession(req.body);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Trial session setup failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function manualMatchesHandler(req, res) {
  const { userId } = req.params;
  try {
    const matches = await getManualMatches(userId);
    res.json({ matches });
  } catch (err) {
    logger.error('Manual match retrieval failed', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function respondInvitationHandler(req, res) {
  const { invitationId } = req.params;
  try {
    const result = await respondInvitation(invitationId, req.user.id, req.body.status);
    res.json(result);
  } catch (err) {
    logger.error('Invitation response failed', { error: err.message, invitationId });
    res.status(400).json({ error: err.message });
  }
}

async function matchHistoryHandler(req, res) {
  const { userId } = req.params;
  try {
    const history = await getMatchHistory(userId);
    res.json({ history });
  } catch (err) {
    logger.error('Failed to fetch match history', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  runMatchingHandler,
  searchProfilesHandler,
  sendInvitationHandler,
  setupTrialSessionHandler,
  manualMatchesHandler,
  respondInvitationHandler,
  matchHistoryHandler,
};

