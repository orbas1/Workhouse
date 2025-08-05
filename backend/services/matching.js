const model = require('../models/matching');
const logger = require('../utils/logger');

async function findMatches(profileId, data) {
  const { investorId, entrepreneurId, stage, score } = data;
  if (!investorId || !entrepreneurId) {
    throw new Error('Investor and entrepreneur IDs are required');
  }
  const match = model.createMatch({ investorId, entrepreneurId, stage, score });
  model.addNotification(investorId, `New match with ${entrepreneurId}`);
  model.addNotification(entrepreneurId, `New match with ${investorId}`);
  logger.info('Match created', { matchId: match.id, investorId, entrepreneurId, stage });
  return match;
}

async function setPreferences(profileId, prefs) {
  const record = model.setPreferences(profileId, prefs);
  logger.info('Preferences updated', { profileId });
  return record;
}

async function submitFeedback(matchId, profileId, rating, comments) {
  const record = model.addFeedback({ matchId, profileId, rating, comments });
  logger.info('Feedback submitted', { matchId, profileId, rating });
  return record;
}

async function subscribeNotifications(profileId) {
  const sub = model.subscribe(profileId);
  logger.info('Notification subscription added', { profileId });
  return sub;
}

async function getNotifications(profileId) {
  return model.getNotifications(profileId);
}

async function getHistory(profileId) {
  return model.getMatchesByProfile(profileId);
}

async function getMatchesByStage(stage) {
  return model.getMatchesByStage(stage);
}

module.exports = {
  findMatches,
  setPreferences,
  submitFeedback,
  subscribeNotifications,
  getNotifications,
  getHistory,
  getMatchesByStage,
};
