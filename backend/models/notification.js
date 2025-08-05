const { randomUUID } = require('crypto');

// In-memory storage for notifications. In a real application this would be a database table.
const notifications = [];

function createNotification({ affiliateId, message }) {
  const notification = {
    id: randomUUID(),
    affiliateId,
    message,
    read: false,
    createdAt: new Date(),
  };
  notifications.push(notification);
  return notification;
}

function getNotificationsByAffiliate(affiliateId) {
  return notifications.filter(n => n.affiliateId === affiliateId);
}

function markAsRead(notificationId) {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
  return notification;
}

module.exports = {
  createNotification,
  getNotificationsByAffiliate,
  markAsRead,
  notifications,
};
