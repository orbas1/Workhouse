const express = require('express');
const auth = require('../middleware/auth');
const {
  listNotifications,
  getSettingsHandler,
  updateSettingsHandler,
  updateNotificationHandler,
  deleteNotificationHandler,
} = require('../controllers/userNotifications');

const router = express.Router();

router.get('/', auth, listNotifications);
router.get('/settings', auth, getSettingsHandler);
router.put('/settings', auth, updateSettingsHandler);
router.patch('/:id', auth, updateNotificationHandler);
router.delete('/:id', auth, deleteNotificationHandler);

module.exports = router;
