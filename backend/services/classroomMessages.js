const model = require('../models/classroomMessages');
const logger = require('../utils/logger');
const pusher = require('../utils/pusher');

async function postMessage(classroomId, userId, content) {
  const message = model.addMessage(classroomId, userId, content);
  logger.info('Classroom message created', { classroomId, userId });
  if (pusher) {
    try {
      await pusher.trigger(`classroom-${classroomId}`, 'new-message', message);
    } catch (err) {
      logger.error('Pusher trigger failed', { error: err.message });
    }
  }
  return message;
}

async function listMessages(classroomId) {
  const messages = model.getMessages(classroomId);
  logger.info('Classroom messages retrieved', { classroomId, count: messages.length });
  return messages;
}

module.exports = {
  postMessage,
  listMessages,
};
