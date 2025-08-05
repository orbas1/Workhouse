const express = require('express');
const router = express.Router();
const { notifyRateChange } = require('../controllers/notificationController');
const authenticate = require('../middleware/auth');
const { validateRateChange } = require('../validators/notificationValidator');

// POST /affiliates/notifications/rate-changes
router.post('/rate-changes', authenticate, validateRateChange, notifyRateChange);

module.exports = router;
