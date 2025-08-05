const {
  submitReview,
  getReviews,
  respondToReview,
  featureReview,
  reviewAnalytics,
  disputeReview,
} = require('../services/review');
const logger = require('../utils/logger');

async function submitReviewHandler(req, res) {
  const { profileId } = req.params;
  try {
    const review = await submitReview(profileId, req.user.id, req.body);
    res.status(201).json(review);
  } catch (err) {
    logger.error('Failed to submit review', { error: err.message, profileId, reviewerId: req.user.id });
    res.status(400).json({ error: err.message });
  }
}

async function getReviewsHandler(req, res) {
  const { profileId } = req.params;
  const { filter } = req.query;
  try {
    const reviews = await getReviews(profileId, filter);
    res.json(reviews);
  } catch (err) {
    logger.error('Failed to get reviews', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function respondToReviewHandler(req, res) {
  const { reviewId } = req.params;
  try {
    const review = await respondToReview(reviewId, req.user.id, req.body.response);
    res.json(review);
  } catch (err) {
    logger.error('Failed to respond to review', { error: err.message, reviewId });
    res.status(400).json({ error: err.message });
  }
}

async function featureReviewHandler(req, res) {
  const { reviewId } = req.params;
  try {
    const review = await featureReview(reviewId, req.user.id);
    res.json(review);
  } catch (err) {
    logger.error('Failed to feature review', { error: err.message, reviewId });
    res.status(400).json({ error: err.message });
  }
}

async function reviewAnalyticsHandler(req, res) {
  const { profileId } = req.params;
  try {
    const analytics = await reviewAnalytics(profileId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to compute review analytics', { error: err.message, profileId });
    res.status(400).json({ error: err.message });
  }
}

async function disputeReviewHandler(req, res) {
  const { reviewId } = req.params;
  const { reason } = req.body;
  try {
    const review = await disputeReview(reviewId, req.user.id, reason);
    res.json(review);
  } catch (err) {
    logger.error('Failed to dispute review', { error: err.message, reviewId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitReviewHandler,
  getReviewsHandler,
  respondToReviewHandler,
  featureReviewHandler,
  reviewAnalyticsHandler,
  disputeReviewHandler,
};
