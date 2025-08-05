const express = require('express');
const {
  submitReviewHandler,
  getReviewsHandler,
  respondToReviewHandler,
  featureReviewHandler,
  reviewAnalyticsHandler,
  disputeReviewHandler,
} = require('../controllers/review');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const preventSelfReview = require('../middleware/preventSelfReview');
const {
  profileIdParamSchema,
  reviewSchema,
  reviewIdParamSchema,
  responseSchema,
  disputeSchema,
} = require('../validation/review');

const router = express.Router();

router.post(
  '/:profileId',
  auth,
  validate(profileIdParamSchema, 'params'),
  preventSelfReview,
  validate(reviewSchema),
  submitReviewHandler,
);

router.get(
  '/:profileId',
  auth,
  validate(profileIdParamSchema, 'params'),
  getReviewsHandler,
);

router.post(
  '/respond/:reviewId',
  auth,
  validate(reviewIdParamSchema, 'params'),
  validate(responseSchema),
  respondToReviewHandler,
);

router.put(
  '/feature/:reviewId',
  auth,
  validate(reviewIdParamSchema, 'params'),
  featureReviewHandler,
);

router.get(
  '/analytics/:profileId',
  auth,
  validate(profileIdParamSchema, 'params'),
  reviewAnalyticsHandler,
);

router.post(
  '/dispute/:reviewId',
  auth,
  validate(reviewIdParamSchema, 'params'),
  validate(disputeSchema),
  disputeReviewHandler,
);

module.exports = router;
