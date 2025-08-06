const express = require('express');
const auth = require('../middleware/auth');
const { getExperienceDashboard } = require('../controllers/experienceDashboard');

const router = express.Router();

// GET /experience/dashboard - fetch combined experience dashboard data
router.get('/dashboard', auth, getExperienceDashboard);

module.exports = router;
