const express = require('express');
const {
  scheduleSessionHandler,
  listSessionsHandler,
  recordAttendanceHandler,
} = require('../controllers/training');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  scheduleSessionSchema,
  attendanceSchema,
} = require('../validation/training');

const router = express.Router();

router.post('/sessions', auth, validate(scheduleSessionSchema), scheduleSessionHandler);
router.get('/sessions', auth, listSessionsHandler);
router.post('/attendance/:sessionId', auth, validate(attendanceSchema), recordAttendanceHandler);

module.exports = router;
