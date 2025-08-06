const express = require('express');
const auth = require('../middleware/auth');
const {
  listNotifications,
  getSettingsHandler,
  updateSettingsHandler,
} = require('../controllers/userNotifications');

const router = express.Router();

router.get('/', auth, listNotifications);
router.get('/settings', auth, getSettingsHandler);
router.put('/settings', auth, updateSettingsHandler);

module.exports = router;
