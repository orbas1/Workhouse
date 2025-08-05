const express = require('express');
const {
  getDashboardHandler,
  getAlertsHandler,
  createCustomAlertHandler,
  getTimelineHandler,
} = require('../controllers/progressTracking');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const ensureProgressAccess = require('../middleware/progress');
const { userIdParamSchema, customAlertSchema } = require('../validation/progressTracking');

const router = express.Router();

router.get('/dashboard/:userId', auth, validate(userIdParamSchema, 'params'), ensureProgressAccess, getDashboardHandler);
router.get('/alerts/:userId', auth, validate(userIdParamSchema, 'params'), ensureProgressAccess, getAlertsHandler);
router.post('/custom-alerts/create', auth, validate(customAlertSchema), ensureProgressAccess, createCustomAlertHandler);
router.get('/timeline/:userId', auth, validate(userIdParamSchema, 'params'), ensureProgressAccess, getTimelineHandler);

module.exports = router;
