const {
  getNotificationsByUser,
  updateNotification,
  deleteNotification,
} = require('../models/userNotifications');
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

async function updateNotificationHandler(req, res) {
  try {
    const notification = updateNotification(
      req.user.id,
      req.params.id,
      req.body
    );
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    logger.error('Updating notification failed', {
      error: err.message,
      userId: req.user.id,
    });
    res.status(500).json({ error: 'Failed to update notification' });
  }
}

async function deleteNotificationHandler(req, res) {
  try {
    const deleted = deleteNotification(req.user.id, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json({ success: true });
  } catch (err) {
    logger.error('Deleting notification failed', {
      error: err.message,
      userId: req.user.id,
    });
    res.status(500).json({ error: 'Failed to delete notification' });
  }
}

module.exports = {
  listNotifications,
  getSettingsHandler,
  updateSettingsHandler,
   updateNotificationHandler,
   deleteNotificationHandler,
};
