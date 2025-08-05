const model = require('../models/classroomMessages');
const logger = require('../utils/logger');

async function postMessage(classroomId, userId, content) {
  const message = model.addMessage(classroomId, userId, content);
  logger.info('Classroom message created', { classroomId, userId });
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
