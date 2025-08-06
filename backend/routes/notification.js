const express = require('express');
const router = express.Router();
const { notifyRateChange, getNotificationsHandler } = require('../controllers/notificationController');
const authenticate = require('../middleware/auth');
const { validateRateChange } = require('../validators/notificationValidator');

// POST /affiliates/notifications/rate-changes
router.post('/rate-changes', authenticate, validateRateChange, notifyRateChange);
router.get('/:affiliateId', authenticate, getNotificationsHandler);

module.exports = router;
