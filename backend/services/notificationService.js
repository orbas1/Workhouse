const { createNotification, getNotificationsByAffiliate } = require('../models/notification');

/**
 * Send a notification to an affiliate about a commission rate change.
 * @param {string} affiliateId - Identifier of the affiliate.
 * @param {number} oldRate - Previous commission rate percentage.
 * @param {number} newRate - New commission rate percentage.
 * @returns {object} Newly created notification object.
 */
async function sendRateChangeNotification(affiliateId, oldRate, newRate) {
  const message = `Commission rate changed from ${oldRate}% to ${newRate}%.`;
  const notification = createNotification({ affiliateId, message });
  console.log(`Notification sent to affiliate ${affiliateId}: ${message}`);
  return notification;
}

module.exports = {
  sendRateChangeNotification,
  listNotifications: getNotificationsByAffiliate,
};
