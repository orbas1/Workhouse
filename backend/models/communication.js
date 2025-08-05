const { randomUUID } = require('crypto');

const conversations = new Map();
const messages = new Map();
const templates = new Map([
  ['welcome', { id: 'welcome', content: 'Welcome to the platform!' }],
  [
    'follow_up',
    { id: 'follow_up', content: 'Following up on our last discussion.' },
  ],
]);
const meetings = new Map();
const calls = new Map();

function createConversation(participants) {
  const id = randomUUID();
  const conversation = { id, participants, messages: [], createdAt: new Date() };
  conversations.set(id, conversation);
  return conversation;
}

function getConversation(conversationId) {
  return conversations.get(conversationId);
}

function addMessage(conversationId, senderId, content) {
  const id = randomUUID();
  const message = {
    id,
    conversationId,
    senderId,
    content,
    createdAt: new Date(),
  };
  messages.set(id, message);
  const conversation = conversations.get(conversationId);
  if (conversation) {
    conversation.messages.push(id);
  }
  return message;
}

function getMessagesByConversation(conversationId) {
  const conversation = conversations.get(conversationId);
  if (!conversation) return [];
  return conversation.messages.map((id) => messages.get(id));
}

function listTemplates() {
  return Array.from(templates.values());
}

function findTemplate(templateId) {
  return templates.get(templateId);
}

function scheduleMeeting(participants, scheduledFor, topic) {
  const id = randomUUID();
  const meeting = {
    id,
    participants,
    scheduledFor: new Date(scheduledFor),
    topic,
    createdAt: new Date(),
  };
  meetings.set(id, meeting);
  return meeting;
}

function findMeetingById(meetingId) {
  return meetings.get(meetingId);
}

function scheduleCall(participants, scheduledFor, topic) {
  const id = randomUUID();
  const call = {
    id,
    participants,
    scheduledFor: new Date(scheduledFor),
    topic,
    createdAt: new Date(),
  };
  calls.set(id, call);
  return call;
}

function findCallById(callId) {
  return calls.get(callId);
}

module.exports = {
  createConversation,
  getConversation,
  addMessage,
  getMessagesByConversation,
  listTemplates,
  findTemplate,
  scheduleMeeting,
  findMeetingById,
  scheduleCall,
  findCallById,
};

