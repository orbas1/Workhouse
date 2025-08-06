const express = require('express');
const {
  getDashboardHandler,
  getAlertsHandler,
  createCustomAlertHandler,
  getTimelineHandler,
  getTasksHandler,
  addTaskHandler,
} = require('../controllers/progressTracking');
const {
  trackProgressHandler,
  getUserProgressHandler,
  getCourseProgressHandler,
  getDetailedProgressHandler,
  setLearningGoalHandler,
  getLearningGoalsHandler,
} = require('../controllers/userProgress');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const ensureProgressAccess = require('../middleware/progress');
const ensureUserProgressAccess = require('../middleware/userProgress');
const { userIdParamSchema: trackingUserIdParamSchema, customAlertSchema } = require('../validation/progressTracking');
const { taskSchema } = require('../validation/progressTracking');
const {
  trackProgressSchema,
  userIdParamSchema,
  courseUserParamSchema,
  learningGoalSchema,
} = require('../validation/userProgress');

const router = express.Router();

// Progress tracking routes
router.get('/dashboard/:userId', auth, validate(trackingUserIdParamSchema, 'params'), ensureProgressAccess, getDashboardHandler);
router.get('/alerts/:userId', auth, validate(trackingUserIdParamSchema, 'params'), ensureProgressAccess, getAlertsHandler);
router.post('/custom-alerts/create', auth, validate(customAlertSchema), ensureProgressAccess, createCustomAlertHandler);
router.get('/timeline/:userId', auth, validate(trackingUserIdParamSchema, 'params'), ensureProgressAccess, getTimelineHandler);
router.get('/tasks/:userId', auth, validate(trackingUserIdParamSchema, 'params'), ensureProgressAccess, getTasksHandler);
router.post('/tasks/create', auth, validate(taskSchema), ensureProgressAccess, addTaskHandler);

// User progress routes
router.post('/track', auth, validate(trackProgressSchema), ensureUserProgressAccess, trackProgressHandler);
router.get('/:userId', auth, validate(userIdParamSchema, 'params'), ensureUserProgressAccess, getUserProgressHandler);
router.get('/course/:courseId/user/:userId', auth, validate(courseUserParamSchema, 'params'), ensureUserProgressAccess, getCourseProgressHandler);
router.get('/detail/:userId/course/:courseId', auth, validate(courseUserParamSchema, 'params'), ensureUserProgressAccess, getDetailedProgressHandler);
router.post('/goals/:userId', auth, validate(userIdParamSchema, 'params'), ensureUserProgressAccess, validate(learningGoalSchema), setLearningGoalHandler);
router.get('/goals/:userId', auth, validate(userIdParamSchema, 'params'), ensureUserProgressAccess, getLearningGoalsHandler);

module.exports = router;
