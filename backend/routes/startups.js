const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { startupProfileSchema } = require('../validation/startupProfile');
const { getProfile, updateProfile } = require('../controllers/startupProfile');
const { getEngagement } = require('../controllers/startupAnalytics');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, validate(startupProfileSchema), updateProfile);
router.get('/analytics', auth, getEngagement);

module.exports = router;
