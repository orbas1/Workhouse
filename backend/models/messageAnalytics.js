const { randomUUID } = require('crypto');

// Mock message data for analytics
const messages = [
  {
    id: randomUUID(),
    senderId: 'user-1',
    receiverId: 'user-2',
    sentAt: new Date('2024-03-01T10:00:00Z'),
    respondedAt: new Date('2024-03-01T10:02:00Z'),
  },
  {
    id: randomUUID(),
    senderId: 'user-2',
    receiverId: 'user-1',
    sentAt: new Date('2024-03-01T11:00:00Z'),
    respondedAt: new Date('2024-03-01T11:05:00Z'),
  },
  {
    id: randomUUID(),
    senderId: 'user-3',
    receiverId: 'user-1',
    sentAt: new Date('2024-03-02T09:00:00Z'),
    respondedAt: null,
  },
];

function filterByDate(data, startDate, endDate) {
  return data.filter(item => {
    const date = new Date(item.sentAt);
    if (startDate && date < new Date(startDate)) return false;
    if (endDate && date > new Date(endDate)) return false;
    return true;
  });
}

function getMessages(range = {}) {
  return filterByDate(messages, range.startDate, range.endDate);
}

function getMessagesByUser(userId, range = {}) {
  return getMessages(range).filter(
    m => m.senderId === userId || m.receiverId === userId
  );
}

function getResponseTimeRecords(range = {}) {
  return getMessages(range).filter(m => m.respondedAt);
}

module.exports = {
  getMessages,
  getMessagesByUser,
  getResponseTimeRecords,
};
