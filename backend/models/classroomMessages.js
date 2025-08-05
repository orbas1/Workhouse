const { randomUUID } = require('crypto');

// In-memory store mapping classroomId to array of messages
const messageStore = new Map();

function addMessage(classroomId, userId, content) {
  const message = {
    id: randomUUID(),
    classroomId,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };
  if (!messageStore.has(classroomId)) {
    messageStore.set(classroomId, []);
  }
  messageStore.get(classroomId).push(message);
  return message;
}

function getMessages(classroomId) {
  return messageStore.get(classroomId) || [];
}

module.exports = {
  addMessage,
  getMessages,
};
