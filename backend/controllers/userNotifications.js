const { getNotificationsByUser } = require('../models/userNotifications');
const { getSettings, updateSettings } = require('../models/notificationSettings');
const logger = require('../utils/logger');

async function listNotifications(req, res) {
  try {
    const notifications = getNotificationsByUser(req.user.id);
    res.json({ notifications });
  } catch (err) {
    logger.error('Fetching notifications failed', { error: err.message, userId: req.user.id });
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
}

async function getSettingsHandler(req, res) {
  try {
    const settings = getSettings(req.user.id);
    res.json(settings);
  } catch (err) {
    logger.error('Fetching notification settings failed', { error: err.message, userId: req.user.id });
    res.status(500).json({ error: 'Failed to fetch notification settings' });
  }
}

async function updateSettingsHandler(req, res) {
  try {
    const settings = updateSettings(req.user.id, req.body);
    res.json(settings);
  } catch (err) {
    logger.error('Updating notification settings failed', { error: err.message, userId: req.user.id });
    res.status(500).json({ error: 'Failed to update notification settings' });
  }
}

module.exports = {
  listNotifications,
  getSettingsHandler,
  updateSettingsHandler,
};
