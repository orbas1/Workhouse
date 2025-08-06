const express = require('express');
const { adminDashboardHandler } = require('../controllers/adminDashboard');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// GET /admin/dashboard
router.get('/dashboard', auth, requireAdmin, adminDashboardHandler);

module.exports = router;
