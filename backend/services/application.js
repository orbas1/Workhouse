const applicationModel = require('../models/application');
const logger = require('../utils/logger');

async function applyForOpportunity(userId, { opportunityId, message }) {
  const application = applicationModel.createApplication({ opportunityId, userId, message });
  logger.info('Application submitted', { applicationId: application.id, opportunityId, userId });
  return application;
}

async function listApplicationsForUser(userId) {
  return applicationModel.getApplicationsByUser(userId);
}

async function listApplicationsForOpportunity(opportunityId) {
  return applicationModel.getApplicationsByOpportunity(opportunityId);
}

async function updateApplicationStatus(applicationId, status, certificateUrl) {
  const updated = applicationModel.updateApplicationStatus(applicationId, status, certificateUrl);
  if (!updated) {
    logger.error('Attempted to update non-existent application', { applicationId });
    return null;
  }
  logger.info('Application status updated', { applicationId, status });
  return updated;
}

async function getApplicationById(applicationId) {
  return applicationModel.getApplicationById(applicationId);
}

async function deleteApplication(applicationId) {
  const removed = applicationModel.deleteApplication(applicationId);
  if (removed) {
    logger.info('Application withdrawn', { applicationId });
  } else {
    logger.error('Attempted to withdraw non-existent application', { applicationId });
  }
  return removed;
}

async function listCompletedApplicationsForUser(userId) {
  return applicationModel.getCompletedApplicationsByUser(userId);
}

module.exports = {
  applyForOpportunity,
  listApplicationsForUser,
  listApplicationsForOpportunity,
  updateApplicationStatus,
  getApplicationById,
  deleteApplication,
  listCompletedApplicationsForUser,
};
