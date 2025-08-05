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

async function updateApplicationStatus(applicationId, status) {
  const updated = applicationModel.updateApplicationStatus(applicationId, status);
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

module.exports = {
  applyForOpportunity,
  listApplicationsForUser,
  listApplicationsForOpportunity,
  updateApplicationStatus,
  getApplicationById,
};
