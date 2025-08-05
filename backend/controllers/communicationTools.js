const communicationService = require('../services/communicationTools');
const logger = require('../utils/logger');

async function startVideoCallHandler(req, res) {
  try {
    const { sessionId } = req.params;
    const { participants, language } = req.body;
    const session = await communicationService.startVideo(sessionId, participants, language);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to start video session', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function endVideoCallHandler(req, res) {
  try {
    const { sessionId } = req.params;
    const session = await communicationService.endVideo(sessionId);
    res.json(session);
  } catch (err) {
    logger.error('Failed to end video session', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function exchangeContactHandler(req, res) {
  try {
    const { sessionId } = req.params;
    const { userId, contactInfo } = req.body;
    const exchange = communicationService.exchangeContact(sessionId, userId, contactInfo);
    res.status(201).json(exchange);
  } catch (err) {
    logger.error('Contact exchange failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function getMessageTemplateHandler(req, res) {
  try {
    const templates = communicationService.getMessageTemplates();
    res.json({ templates });
  } catch (err) {
    logger.error('Failed to fetch message templates', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}

function createLanguageRoomHandler(req, res) {
  try {
    const { language } = req.body;
    const room = communicationService.createLanguageRoom(language);
    res.status(201).json(room);
  } catch (err) {
    logger.error('Failed to create language room', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function getCommunicationHistoryHandler(req, res) {
  try {
    const { userId } = req.params;
    const history = communicationService.getCommunicationHistory(userId);
    res.json({ history });
  } catch (err) {
    logger.error('Failed to retrieve communication history', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function translateMessageHandler(req, res) {
  try {
    const { message, targetLanguage } = req.body;
    const result = await communicationService.translateMessage(message, targetLanguage);
    res.json(result);
  } catch (err) {
    logger.error('Translation failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function getSessionAnalyticsHandler(req, res) {
  try {
    const { sessionId } = req.params;
    const analytics = communicationService.getSessionAnalytics(sessionId);
    if (!analytics) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch session analytics', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  startVideoCallHandler,
  endVideoCallHandler,
  exchangeContactHandler,
  getMessageTemplateHandler,
  createLanguageRoomHandler,
  getCommunicationHistoryHandler,
  translateMessageHandler,
  getSessionAnalyticsHandler,
};
