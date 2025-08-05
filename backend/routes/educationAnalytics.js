const express = require('express');
const {
  getCoursesOverviewHandler,
  getCourseAnalyticsHandler,
  getUserEngagementHandler,
} = require('../controllers/educationAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { courseIdParam, userIdParam } = require('../validation/educationAnalytics');

const router = express.Router();

router.get(
  '/courses/overview',
  auth,
  authorize('admin', 'instructor'),
  getCoursesOverviewHandler
);

router.get(
  '/courses/:courseId',
  auth,
  authorize('admin', 'instructor'),
  validate(courseIdParam, 'params'),
  getCourseAnalyticsHandler
);

router.get(
  '/user-engagement/:userId',
  auth,
  authorize('admin', 'instructor', 'user'),
  validate(userIdParam, 'params'),
  getUserEngagementHandler
);

module.exports = router;
