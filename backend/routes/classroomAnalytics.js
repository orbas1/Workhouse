const express = require('express');
const {
  getEngagementHandler,
  getCompletionHandler,
} = require('../controllers/classroomAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { classroomIdParamSchema } = require('../validation/classroomAnalytics');

const router = express.Router();

router.get(
  '/engagement/:classroomId',
  auth,
  authorize(['admin', 'educator']),
  validate(classroomIdParamSchema, 'params'),
  getEngagementHandler
);

router.get(
  '/completion/:classroomId',
  auth,
  authorize(['admin', 'educator']),
  validate(classroomIdParamSchema, 'params'),
  getCompletionHandler
);

module.exports = router;

