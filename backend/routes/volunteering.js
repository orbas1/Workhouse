const express = require('express');
const { getDashboardHandler } = require('../controllers/volunteering');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, getDashboardHandler);

module.exports = router;

