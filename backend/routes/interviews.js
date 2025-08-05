const express = require('express');
const {
  scheduleInterviewHandler,
  getUserInterviewsHandler,
  getEmployerInterviewsHandler,
  updateInterviewStatusHandler,
} = require('../controllers/interview');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const {
  scheduleInterviewSchema,
  interviewIdParamSchema,
  statusUpdateSchema,
} = require('../validation/interview');

const router = express.Router();

// Schedule a new interview (employer)
router.post('/', auth, requireRole('employer', 'admin'), validate(scheduleInterviewSchema), scheduleInterviewHandler);

// Get interviews for logged in applicant
router.get('/user', auth, getUserInterviewsHandler);

// Get interviews for employer
router.get('/employer', auth, requireRole('employer', 'admin'), getEmployerInterviewsHandler);

// Update interview status
router.put(
  '/:interviewId/status',
  auth,
  validate(interviewIdParamSchema, 'params'),
  validate(statusUpdateSchema),
  updateInterviewStatusHandler
);

module.exports = router;
