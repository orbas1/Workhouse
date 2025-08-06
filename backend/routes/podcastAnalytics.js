const express = require('express');
const {
  overviewHandler,
  episodeAnalyticsHandler,
  demographicsHandler,
  engagementHandler,
  seriesOverviewHandler,
  episodeDetailsHandler,
  creatorSeriesHandler,
} = require('../controllers/podcastAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const ownership = require('../middleware/podcastOwnership');
const {
  episodeIdParamSchema,
  podcastIdParamSchema,
  seriesIdParamSchema,
  dateRangeSchema,
} = require('../validation/podcastAnalytics');

const router = express.Router();

// Administrative analytics endpoints
router.get(
  '/overview',
  auth,
  authorize('admin', 'content-manager'),
  validate(dateRangeSchema, 'query'),
  overviewHandler
);

router.get(
  '/episode/:episodeId',
  auth,
  authorize('admin', 'content-manager'),
  validate(episodeIdParamSchema, 'params'),
  episodeAnalyticsHandler
);

router.get(
  '/demographics/:podcastId',
  auth,
  authorize('admin', 'content-manager'),
  validate(podcastIdParamSchema, 'params'),
  demographicsHandler
);

router.get(
  '/engagement/:podcastId',
  auth,
  authorize('admin', 'content-manager'),
  validate(podcastIdParamSchema, 'params'),
  engagementHandler
);

// Creator-specific analytics endpoints
router.get(
  '/series/:seriesId/overview',
  auth,
  authorize('admin', 'content-manager', 'creator'),
  validate(seriesIdParamSchema, 'params'),
  ownership,
  seriesOverviewHandler
);

router.get(
  '/episodes/:episodeId/details',
  auth,
  authorize('admin', 'content-manager', 'creator'),
  validate(episodeIdParamSchema, 'params'),
  ownership,
  episodeDetailsHandler
);

router.get(
  '/creator/series',
  auth,
  authorize('creator'),
  creatorSeriesHandler
);

module.exports = router;
