const express = require('express');
const {
  scheduleSessionHandler,
  listSessionsHandler,
  recordAttendanceHandler,
  getResourcesHandler,
  reviewResourceHandler,
  completeTrainingHandler,
} = require('../controllers/training');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  scheduleSessionSchema,
  attendanceSchema,
  resourceQuerySchema,
  resourceReviewSchema,
  completionSchema,
} = require('../validation/training');

const router = express.Router();

router.post('/sessions', auth, validate(scheduleSessionSchema), scheduleSessionHandler);
router.get('/sessions', auth, listSessionsHandler);
router.post('/attendance/:sessionId', auth, validate(attendanceSchema), recordAttendanceHandler);
router.get('/resources', auth, validate(resourceQuerySchema, 'query'), getResourcesHandler);
router.post('/resources/:resourceId/review', auth, validate(resourceReviewSchema), reviewResourceHandler);
router.post('/complete', auth, validate(completionSchema), completeTrainingHandler);

module.exports = router;
