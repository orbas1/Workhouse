const express = require('express');
const {
  createLearningPathHandler,
  updateLearningPathHandler,
  getLearningPathHandler,
  buildLearningPathHandler,
  shareLearningPathHandler,
  getPopularLearningPathsHandler,
  getLearningPathRecommendationsHandler,
} = require('../controllers/learningPath');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const pathMiddleware = require('../middleware/learningPath');
const {
  pathIdParamSchema,
  userIdParamSchema,
  createPathSchema,
  updatePathSchema,
  sharePathSchema,
} = require('../validation/learningPath');

const router = express.Router();

router.post('/create', auth, validate(createPathSchema), createLearningPathHandler);
router.post('/build', auth, validate(createPathSchema), buildLearningPathHandler);
router.post(
  '/share/:pathId',
  auth,
  validate(pathIdParamSchema, 'params'),
  pathMiddleware,
  validate(sharePathSchema),
  shareLearningPathHandler
);
router.get('/popular', auth, getPopularLearningPathsHandler);
router.get(
  '/recommendations/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  getLearningPathRecommendationsHandler
);
router.put(
  '/update/:pathId',
  auth,
  validate(pathIdParamSchema, 'params'),
  pathMiddleware,
  validate(updatePathSchema),
  updateLearningPathHandler
);
router.get(
  '/:pathId',
  auth,
  validate(pathIdParamSchema, 'params'),
  pathMiddleware,
  getLearningPathHandler
);

module.exports = router;
