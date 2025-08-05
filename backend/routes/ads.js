const express = require('express');
const router = express.Router();
const controller = require('../controllers/ads');

router.get('/', controller.getAds);
router.get('/preferences', controller.getPreferences);
router.post('/preferences', controller.updatePreferences);

module.exports = router;
