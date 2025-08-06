const { randomUUID } = require('crypto');

// Simple in-memory store for user notifications
const notifications = [];

function addNotification({ userId, message }) {
  const notification = {
    id: randomUUID(),
    userId,
    message,
    read: false,
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

module.exports = {
  addNotification,
  getNotificationsByUser,
  markNotificationRead,
  notifications,
};
