const {
  sendMessage,
  getConversationMessages,
  listTemplates,
  sendTemplateMessage,
  scheduleMeeting,
  getMeeting,
  scheduleCall,
  getCall,
} = require('../services/communication');
const logger = require('../utils/logger');

async function sendMessageHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const result = await sendMessage(userId, req.body);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Failed to send message', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getConversationMessagesHandler(req, res) {
  const { conversationId } = req.params;
  try {
    const messages = await getConversationMessages(conversationId);
    res.json(messages);
  } catch (err) {
    logger.error('Failed to get conversation messages', {
      error: err.message,
      conversationId,
    });
    res.status(404).json({ error: err.message });
  }
}

async function listTemplatesHandler(req, res) {
  try {
    const templates = await listTemplates();
    res.json(templates);
  } catch (err) {
    logger.error('Failed to list templates', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function sendTemplateMessageHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const result = await sendTemplateMessage(userId, req.body);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Failed to send template message', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function scheduleMeetingHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const meeting = await scheduleMeeting(userId, req.body);
    res.status(201).json(meeting);
  } catch (err) {
    logger.error('Failed to schedule meeting', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getMeetingHandler(req, res) {
  const { meetingId } = req.params;
  try {
    const meeting = await getMeeting(meetingId);
    res.json(meeting);
  } catch (err) {
    logger.error('Failed to get meeting', { error: err.message, meetingId });
    res.status(404).json({ error: err.message });
  }
}

async function scheduleCallHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const call = await scheduleCall(userId, req.body);
    res.status(201).json(call);
  } catch (err) {
    logger.error('Failed to schedule call', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getCallHandler(req, res) {
  const { callId } = req.params;
  try {
    const call = await getCall(callId);
    res.json(call);
  } catch (err) {
    logger.error('Failed to get call', { error: err.message, callId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  sendMessageHandler,
  getConversationMessagesHandler,
  listTemplatesHandler,
  sendTemplateMessageHandler,
  scheduleMeetingHandler,
  getMeetingHandler,
  scheduleCallHandler,
  getCallHandler,
};
