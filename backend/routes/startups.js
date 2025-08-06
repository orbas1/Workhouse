const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { startupProfileSchema } = require('../validation/startupProfile');
const { getProfile, updateProfile } = require('../controllers/startupProfile');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, validate(startupProfileSchema), updateProfile);

module.exports = router;
