const express = require('express');
const auth = require('../middleware/auth');
const { getOverviewHandler } = require('../controllers/stats');

const router = express.Router();

router.get('/overview', auth, getOverviewHandler);

module.exports = router;
