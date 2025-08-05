const express = require('express');
const {
  optimizeUserExperienceHandler,
  getEngagementHeatmapHandler,
  generateContentRecommendationsHandler,
} = require('../controllers/enhancedUserExperienceML');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { ensureSelfOrAdmin } = require('../middleware/enhancedUserExperienceML');
const { recommendationSchema } = require('../validation/enhancedUserExperienceML');

const router = express.Router();

router.get('/user-experience/optimization', auth, authorize('admin', 'analyst', 'user'), optimizeUserExperienceHandler);
router.get('/engagement/heatmap', auth, authorize('admin', 'analyst'), getEngagementHeatmapHandler);
router.post(
  '/content/recommendations/generate',
  auth,
  authorize('admin', 'user'),
  ensureSelfOrAdmin,
  validate(recommendationSchema),
  generateContentRecommendationsHandler
);

module.exports = router;

