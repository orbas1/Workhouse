const express = require('express');
const { simDashboardHandler } = require('../controllers/simDashboard');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, simDashboardHandler);

module.exports = router;
