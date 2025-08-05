const reviewModel = require('../models/review');
const logger = require('../utils/logger');

async function submitReview(profileId, reviewerId, data) {
  const review = reviewModel.createReview({ profileId, reviewerId, ...data });
  logger.info('Review submitted', { reviewId: review.id, profileId, reviewerId });
  return review;
}

async function getReviews(profileId, filter) {
  const reviews = reviewModel.getReviewsByProfile(profileId, filter);
  logger.info('Reviews retrieved', { profileId, count: reviews.length, filter });
  return reviews;
}

async function respondToReview(reviewId, responderId, response) {
  const review = reviewModel.findReviewById(reviewId);
  if (!review) {
    logger.error('Review not found for response', { reviewId });
    throw new Error('Review not found');
  }
  if (review.profileId !== responderId) {
    logger.error('Unauthorized review response attempt', { reviewId, responderId });
    throw new Error('Not authorized to respond to this review');
  }
  reviewModel.addResponse(reviewId, response);
  logger.info('Responded to review', { reviewId, responderId });
  return review;
}

async function featureReview(reviewId, profileId) {
  const review = reviewModel.findReviewById(reviewId);
  if (!review) {
    logger.error('Review not found for feature', { reviewId });
    throw new Error('Review not found');
  }
  if (review.profileId !== profileId) {
    logger.error('Unauthorized feature attempt', { reviewId, profileId });
    throw new Error('Not authorized to feature this review');
  }
  reviewModel.featureReview(reviewId);
  logger.info('Review featured', { reviewId, profileId });
  return review;
}

async function reviewAnalytics(profileId) {
  const analytics = reviewModel.getAnalytics(profileId);
  logger.info('Review analytics computed', { profileId, ...analytics });
  return analytics;
}

async function disputeReview(reviewId, userId, reason) {
  const review = reviewModel.findReviewById(reviewId);
  if (!review) {
    logger.error('Review not found for dispute', { reviewId });
    throw new Error('Review not found');
  }
  reviewModel.disputeReview(reviewId, reason, userId);
  logger.info('Review disputed', { reviewId, userId });
  return review;
}

module.exports = {
  submitReview,
  getReviews,
  respondToReview,
  featureReview,
  reviewAnalytics,
  disputeReview,
};
