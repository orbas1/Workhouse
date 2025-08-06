const express = require('express');
const { listFlags, createFlag, resolveFlag } = require('../controllers/moderation');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/flags', auth, authorize('moderator', 'admin'), listFlags);
router.post('/flags', auth, createFlag);
router.put('/flags/:id/resolve', auth, authorize('moderator', 'admin'), resolveFlag);

module.exports = router;
