const { randomUUID } = require('crypto');

const volunteerFeedbacks = [];
const organizationFeedbacks = [];

function addVolunteerFeedback({ volunteerId, opportunityId, rating, comment }) {
  const record = {
    id: randomUUID(),
    volunteerId,
    opportunityId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  volunteerFeedbacks.push(record);
  return record;
}

function addOrganizationFeedback({ organizationId, volunteerId, opportunityId, rating, comment }) {
  const record = {
    id: randomUUID(),
    organizationId,
    volunteerId,
    opportunityId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  organizationFeedbacks.push(record);
  return record;
}

function getVolunteerFeedbackByOpportunity(opportunityId) {
  return volunteerFeedbacks.filter((f) => f.opportunityId === opportunityId);
}

function getOrganizationFeedbackByOpportunity(opportunityId) {
  return organizationFeedbacks.filter((f) => f.opportunityId === opportunityId);
}

module.exports = {
  addVolunteerFeedback,
  addOrganizationFeedback,
  getVolunteerFeedbackByOpportunity,
  getOrganizationFeedbackByOpportunity,
};
