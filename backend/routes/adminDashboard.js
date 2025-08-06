const express = require('express');
const { adminDashboardHandler } = require('../controllers/adminDashboard');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// GET /admin/dashboard
router.get('/dashboard', auth, authorize('admin', 'moderator', 'support'), adminDashboardHandler);

module.exports = router;
