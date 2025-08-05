const express = require('express');
const auth = require('../middleware/auth');
const { billingHandler, analyticsHandler, libraryHandler } = require('../controllers/ads');

const router = express.Router();

router.get('/billing', auth, billingHandler);
router.get('/analytics', auth, analyticsHandler);
router.get('/library', auth, libraryHandler);

module.exports = router;
