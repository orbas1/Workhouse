const { sendRateChangeNotification, listNotifications } = require('../services/notificationService');

/**
 * Controller to handle commission rate change notifications.
 */
async function notifyRateChange(req, res) {
  const { affiliateId, oldRate, newRate } = req.body;
  try {
    const notification = await sendRateChangeNotification(affiliateId, oldRate, newRate);
    res.status(201).json({ message: 'Notification sent', notification });
  } catch (err) {
    console.error('Failed to send rate change notification', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}

function getNotificationsHandler(req, res) {
  try {
    const { affiliateId } = req.params;
    const notifications = listNotifications(affiliateId);
    res.json(notifications);
  } catch (err) {
    console.error('Failed to fetch notifications', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
}

module.exports = {
  notifyRateChange,
  getNotificationsHandler,
};
