const { sendRateChangeNotification } = require('../services/notificationService');

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

module.exports = {
  notifyRateChange,
};
