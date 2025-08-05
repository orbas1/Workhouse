const logger = require('../utils/logger');
const model = require('../models/messageAnalytics');

async function getActivityOverview(range) {
  const msgs = model.getMessages(range);
  const totalMessages = msgs.length;
  const userSet = new Set();
  msgs.forEach(m => {
    userSet.add(m.senderId);
    userSet.add(m.receiverId);
  });
  const activeUsers = userSet.size;
  const avgMessagesPerUser = activeUsers ? totalMessages / activeUsers : 0;
  logger.info('Computed message activity overview', {
    totalMessages,
    activeUsers,
  });
  return { totalMessages, activeUsers, avgMessagesPerUser };
}

async function getUserMessagesAnalytics(userId, range) {
  const messages = model.getMessagesByUser(userId, range);
  logger.info('Retrieved user message analytics', { userId, count: messages.length });
  return { userId, totalMessages: messages.length, messages };
}

async function getResponseTimesAnalytics(range) {
  const records = model.getResponseTimeRecords(range);
  const responseTimes = records.map(r => new Date(r.respondedAt) - new Date(r.sentAt));
  const averageResponseTimeMs = responseTimes.length
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    : 0;
  logger.info('Calculated response time analytics', { samples: responseTimes.length });
  return { averageResponseTimeMs };
}

module.exports = {
  getActivityOverview,
  getUserMessagesAnalytics,
  getResponseTimesAnalytics,
};
