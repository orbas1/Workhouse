const communicationModel = require('../models/communication');
const logger = require('../utils/logger');

async function sendMessage(
  userId,
  { conversationId, recipientId, content, attachments = [], category }
) {
  let conversation;
  if (conversationId) {
    conversation = communicationModel.getConversation(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
  } else {
    if (!recipientId) {
      throw new Error('recipientId is required to start a conversation');
    }
    conversation = communicationModel.createConversation(
      [userId, recipientId],
      category
    );
    conversationId = conversation.id;
    logger.info('Conversation created', {
      conversationId,
      participants: conversation.participants,
      category: conversation.category,
    });
  }
  const message = communicationModel.addMessage(
    conversationId,
    userId,
    content,
    attachments
  );
  logger.info('Message sent', {
    messageId: message.id,
    conversationId,
    senderId: userId,
    attachments: attachments.length,
  });
  return { conversationId, message };
}

async function getConversationMessages(conversationId) {
  return communicationModel.getMessagesByConversation(conversationId);
}

async function listTemplates() {
  return communicationModel.listTemplates();
}

async function sendTemplateMessage(userId, { conversationId, templateId }) {
  const template = communicationModel.findTemplate(templateId);
  if (!template) {
    throw new Error('Template not found');
  }
  const conversation = communicationModel.getConversation(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  const message = communicationModel.addMessage(
    conversationId,
    userId,
    template.content
  );
  logger.info('Template message sent', {
    conversationId,
    templateId,
    messageId: message.id,
  });
  return { conversationId, message };
}

async function scheduleMeeting(userId, { participants, scheduledFor, topic }) {
  if (!participants.includes(userId)) {
    participants.push(userId);
  }
  const meeting = communicationModel.scheduleMeeting(
    participants,
    scheduledFor,
    topic
  );
  logger.info('Meeting scheduled', { meetingId: meeting.id, organizerId: userId });
  return meeting;
}

async function getMeeting(meetingId) {
  return communicationModel.findMeetingById(meetingId);
}

async function scheduleCall(userId, { participants, scheduledFor, topic }) {
  if (!participants.includes(userId)) {
    participants.push(userId);
  }
  const call = communicationModel.scheduleCall(participants, scheduledFor, topic);
  logger.info('Call scheduled', { callId: call.id, organizerId: userId });
  return call;
}

async function getCall(callId) {
  return communicationModel.findCallById(callId);
}

function getConversation(conversationId) {
  return communicationModel.getConversation(conversationId);
}

async function listConversations(userId, category) {
  return communicationModel.listConversationsByUser(userId, category);
}

module.exports = {
  sendMessage,
  getConversationMessages,
  listTemplates,
  sendTemplateMessage,
  scheduleMeeting,
  getMeeting,
  scheduleCall,
  getCall,
  getConversation,
  listConversations,
};
