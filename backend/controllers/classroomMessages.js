const { postMessage, listMessages } = require('../services/classroomMessages');

async function createMessage(req, res) {
  try {
    const { classroomId } = req.params;
    const { userId, content } = req.body;
    const message = await postMessage(classroomId, userId, content);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}

async function getMessagesHandler(req, res) {
  try {
    const { classroomId } = req.params;
    const messages = await listMessages(classroomId);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

module.exports = {
  createMessage,
  getMessagesHandler,
};
