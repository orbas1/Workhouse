const analyticsModel = require('../models/analytics');
const applicationModel = require('../models/application');
const volunteerFeedbackModel = require('../models/volunteerFeedback');
const opportunityModel = require('../models/opportunity');

function getVolunteerStats(volunteerId) {
  const engagement = analyticsModel
    .getVolunteerEngagement()
    .filter((r) => r.volunteerId === volunteerId);
  const totalHours = engagement.reduce((sum, r) => sum + r.hours, 0);
  const activeApplications = applicationModel
    .getApplicationsByUser(volunteerId)
    .filter((a) => a.status === 'pending').length;
  const feedbacks = volunteerFeedbackModel.getOrganizationFeedbackByVolunteer
    ? volunteerFeedbackModel.getOrganizationFeedbackByVolunteer(volunteerId)
    : [];
  const feedbackScore = feedbacks.length
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
    : 0;
  return { totalHours, activeApplications, feedbackScore };
}

function getEmployerStats(organizationId) {
  const ops = opportunityModel
    .list()
    .filter((o) => o.organizationId === organizationId);
  const applications = ops.flatMap((o) =>
    applicationModel.getApplicationsByOpportunity(o.id)
  );
  const totalVolunteers = new Set(applications.map((a) => a.userId)).size;
  const activeOpportunities = ops.length;
  const pendingApplications = applications.filter(
    (a) => a.status === 'pending'
  ).length;
  return { totalVolunteers, activeOpportunities, pendingApplications };
}

module.exports = {
  getVolunteerStats,
  getEmployerStats,
};

