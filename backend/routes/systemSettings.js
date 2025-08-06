const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSystemSettings,
  updateSystemSettings,
} = require('../controllers/systemSettings');

router.get('/system-settings', auth, getSystemSettings);
router.put('/system-settings', auth, updateSystemSettings);

module.exports = router;
