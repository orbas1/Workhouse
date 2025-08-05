const express = require('express');
const { insightsHandler, recommendationsHandler } = require('../controllers/aiAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { insightsParamsSchema, recommendationsParamsSchema } = require('../validation/aiAnalytics');

const router = express.Router();

router.get('/insights/:domain', auth, authorize('admin', 'analyst'), validate(insightsParamsSchema, 'params'), insightsHandler);
router.get('/recommendations/:userId', auth, authorize('admin', 'manager', 'user'), validate(recommendationsParamsSchema, 'params'), recommendationsHandler);

module.exports = router;
