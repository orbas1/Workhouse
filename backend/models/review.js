const { randomUUID } = require('crypto');

// In-memory store for reviews
// Each review: { id, profileId, reviewerId, rating, comment, response, isFeatured, status, createdAt, updatedAt }
const reviews = [];

function createReview({ profileId, reviewerId, rating, comment }) {
  const review = {
    id: randomUUID(),
    profileId,
    reviewerId,
    rating,
    comment: comment || '',
    response: null,
    isFeatured: false,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  reviews.push(review);
  return review;
}

function getReviewsByProfile(profileId, filter) {
  let result = reviews.filter((r) => r.profileId === profileId);
  if (filter === 'positive') {
    result = result.filter((r) => r.rating >= 4);
  } else if (filter === 'negative') {
    result = result.filter((r) => r.rating <= 2);
  }
  return result;
}

function findReviewById(id) {
  return reviews.find((r) => r.id === id);
}

function addResponse(id, response) {
  const review = findReviewById(id);
  if (!review) return null;
  review.response = response;
  review.updatedAt = new Date();
  return review;
}

function featureReview(id) {
  const review = findReviewById(id);
  if (!review) return null;
  review.isFeatured = true;
  review.updatedAt = new Date();
  return review;
}

function disputeReview(id, reason, userId) {
  const review = findReviewById(id);
  if (!review) return null;
  review.status = 'disputed';
  review.dispute = { reason, raisedBy: userId, raisedAt: new Date() };
  review.updatedAt = new Date();
  return review;
}

function getAnalytics(profileId) {
  const profileReviews = reviews.filter((r) => r.profileId === profileId);
  const total = profileReviews.length;
  const average = total
    ? profileReviews.reduce((sum, r) => sum + r.rating, 0) / total
    : 0;
  const distribution = profileReviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1;
    return acc;
  }, {});
  return { total, average, distribution };
}

module.exports = {
  reviews,
  createReview,
  getReviewsByProfile,
  findReviewById,
  addResponse,
  featureReview,
  disputeReview,
  getAnalytics,
};

