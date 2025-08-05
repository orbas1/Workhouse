const feedbackModel = require('../models/volunteerFeedback');
const logger = require('../utils/logger');

async function submitVolunteerFeedback(data) {
  const record = feedbackModel.addVolunteerFeedback(data);
  logger.info('Volunteer feedback submitted', {
    volunteerId: data.volunteerId,
    opportunityId: data.opportunityId,
  });
  return record;
}

async function submitOrganizationFeedback(data) {
  const record = feedbackModel.addOrganizationFeedback(data);
  logger.info('Organization feedback submitted', {
    organizationId: data.organizationId,
    opportunityId: data.opportunityId,
  });
  return record;
}

function getFeedbackForOpportunity(opportunityId) {
  const volunteerFeedbacks = feedbackModel.getVolunteerFeedbackByOpportunity(opportunityId);
  const organizationFeedbacks = feedbackModel.getOrganizationFeedbackByOpportunity(opportunityId);

  const average = (arr) => (arr.length ? arr.reduce((sum, f) => sum + f.rating, 0) / arr.length : 0);

  logger.info('Aggregated feedback for opportunity', { opportunityId });

  return {
    opportunityId,
    volunteerFeedback: {
      count: volunteerFeedbacks.length,
      averageRating: average(volunteerFeedbacks),
      comments: volunteerFeedbacks.map((f) => f.comment).filter(Boolean),
    },
    organizationFeedback: {
      count: organizationFeedbacks.length,
      averageRating: average(organizationFeedbacks),
      comments: organizationFeedbacks.map((f) => f.comment).filter(Boolean),
    },
  };
}

module.exports = {
  submitVolunteerFeedback,
  submitOrganizationFeedback,
  getFeedbackForOpportunity,
};
