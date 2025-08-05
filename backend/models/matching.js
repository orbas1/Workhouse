const { randomUUID } = require('crypto');

// In-memory storage for investor-entrepreneur matching
const matches = []; // {id, investorId, entrepreneurId, stage, score, status, createdAt}
const preferences = new Map(); // profileId -> { industries, stages, minInvestment, maxInvestment, updatedAt }
const feedbacks = []; // {id, matchId, profileId, rating, comments, createdAt}
const subscriptions = new Set(); // profileIds subscribed to notifications
const notifications = []; // {id, profileId, message, isRead, createdAt}

function createMatch({ investorId, entrepreneurId, stage, score }) {
  const match = {
    id: randomUUID(),
    investorId,
    entrepreneurId,
    stage,
    score: score ?? null,
    status: 'pending',
    createdAt: new Date(),
  };
  matches.push(match);
  return match;
}

function findMatchById(matchId) {
  return matches.find((m) => m.id === matchId);
}

function getMatchesByProfile(profileId) {
  return matches.filter(
    (m) => m.investorId === profileId || m.entrepreneurId === profileId
  );
}

function getMatchesByStage(stage) {
  return matches.filter((m) => m.stage === stage);
}

function setPreferences(profileId, prefs) {
  const record = { ...prefs, updatedAt: new Date() };
  preferences.set(profileId, record);
  return record;
}

function addFeedback({ matchId, profileId, rating, comments }) {
  const feedback = {
    id: randomUUID(),
    matchId,
    profileId,
    rating,
    comments: comments || null,
    createdAt: new Date(),
  };
  feedbacks.push(feedback);
  return feedback;
}

function subscribe(profileId) {
  subscriptions.add(profileId);
  return { profileId, subscribedAt: new Date() };
}

function addNotification(profileId, message) {
  const notification = {
    id: randomUUID(),
    profileId,
    message,
    isRead: false,
    createdAt: new Date(),
  };
  notifications.push(notification);
  return notification;
}

function getNotifications(profileId) {
  return notifications.filter((n) => n.profileId === profileId);
}

module.exports = {
  createMatch,
  findMatchById,
  getMatchesByProfile,
  getMatchesByStage,
  setPreferences,
  addFeedback,
  subscribe,
  addNotification,
  getNotifications,
};
