const express = require('express');
const { registerHandler, loginHandler, resetPasswordHandler, meHandler } = require('../controllers/auth');

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/reset-password', resetPasswordHandler);
router.get('/me', meHandler);

module.exports = router;
