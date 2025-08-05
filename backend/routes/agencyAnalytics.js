const express = require('express');
const { getAgencyAnalyticsHandler } = require('../controllers/agencyAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { agencyIdParamSchema } = require('../validation/agencyAnalytics');

const router = express.Router();

router.get('/:agencyId', auth, authorize(['admin', 'agency-manager']), validate(agencyIdParamSchema, 'params'), getAgencyAnalyticsHandler);

module.exports = router;
