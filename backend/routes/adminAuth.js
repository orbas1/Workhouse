const express = require('express');
const { adminLoginHandler } = require('../controllers/adminAuth');
const validateRequest = require('../middleware/validateRequest');
const { loginSchema } = require('../validation/auth');

const router = express.Router();

// POST /admin/login
router.post('/login', validateRequest(loginSchema), adminLoginHandler);

module.exports = router;
