const express = require('express');
const { registerHandler, loginHandler, meHandler } = require('../controllers/auth');

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/me', meHandler);

module.exports = router;
