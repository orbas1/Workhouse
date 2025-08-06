const communicationModel = require('../models/communicationTools');
const logger = require('../utils/logger');

async function startVideo(sessionId, participants = [], language = 'en') {
  const session = communicationModel.createSession(sessionId, participants, language);
  logger.info('Video session started', { sessionId, participants, language });
  return session;
}

async function endVideo(sessionId) {
  const session = communicationModel.endSession(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }
  logger.info('Video session ended', { sessionId });
  return session;
}

function exchangeContact(sessionId, userId, contactInfo) {
  const exchange = communicationModel.addContactExchange(sessionId, userId, contactInfo);
  logger.info('Contact information exchanged', { sessionId, userId });
  return exchange;
}

function getMessageTemplates() {
  return communicationModel.getTemplates();
}

function createLanguageRoom(language) {
  const room = communicationModel.createLanguageRoom(language);
  logger.info('Language room created', { language, roomId: room.id });
  return room;
}

function getCommunicationHistory(userId) {
  return communicationModel.getHistory(userId);
}

async function translateMessage(message, targetLanguage) {
  // Placeholder translation logic
  logger.info('Message translation requested', { targetLanguage });
  return { translated: `[${targetLanguage}] ${message}` };
}

function getSession(sessionId) {
  return communicationModel.getSession(sessionId);
}

function getSessionAnalytics(sessionId) {
  return communicationModel.getSessionAnalytics(sessionId);
}

module.exports = {
  startVideo,
  endVideo,
  exchangeContact,
  getMessageTemplates,
  createLanguageRoom,
  getCommunicationHistory,
  translateMessage,
  getSession,
  getSessionAnalytics,
};
