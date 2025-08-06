const { randomUUID } = require('crypto');

// Simple in-memory store for user notifications
const notifications = [];

function addNotification({ userId, message, conversationId = null }) {
  const notification = {
    id: randomUUID(),
    userId,
    conversationId,
    message,
    read: false,
    archived: false,
    muted: false,
    starred: false,
    createdAt: new Date(),
  };
  notifications.push(notification);
  return notification;
}

function getNotificationsByUser(userId) {
  return notifications.filter((n) => n.userId === userId);
}

function markNotificationRead(notificationId, userId) {
  const notification = notifications.find(
    (n) => n.id === notificationId && n.userId === userId
  );
  if (notification) {
    notification.read = true;
  }
  return notification;
}

function updateNotification(userId, notificationId, updates) {
  const notification = notifications.find(
    (n) => n.id === notificationId && n.userId === userId
  );
  if (notification) {
    Object.assign(notification, updates);
  }
  return notification;
}

function deleteNotification(userId, notificationId) {
  const index = notifications.findIndex(
    (n) => n.id === notificationId && n.userId === userId
  );
  if (index !== -1) {
    return notifications.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  addNotification,
  getNotificationsByUser,
  markNotificationRead,
  updateNotification,
  deleteNotification,
  notifications,
};
