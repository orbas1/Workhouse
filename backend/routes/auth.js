const express = require('express');
const { registerHandler, loginHandler, meHandler } = require('../controllers/auth');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validation/auth');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerHandler);
router.post('/login', validateRequest(loginSchema), loginHandler);
router.get('/me', meHandler);

module.exports = router;
