const {
  applyForOpportunity,
  listApplicationsForUser,
  listApplicationsForOpportunity,
  updateApplicationStatus,
  getApplicationById,
  deleteApplication,
  listCompletedApplicationsForUser,
} = require('../services/application');
const logger = require('../utils/logger');

async function createApplicationHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const application = await applyForOpportunity(userId, req.body);
    res.status(201).json(application);
  } catch (err) {
    logger.error('Failed to submit application', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getUserApplicationsHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const applications = await listApplicationsForUser(userId);
    res.json(applications);
  } catch (err) {
    logger.error('Failed to fetch user applications', { error: err.message, userId });
    res.status(500).json({ error: 'Unable to fetch applications' });
  }
}

async function getOpportunityApplicationsHandler(req, res) {
  const { opportunityId } = req.params;
  try {
    const applications = await listApplicationsForOpportunity(opportunityId);
    res.json(applications);
  } catch (err) {
    logger.error('Failed to fetch opportunity applications', { error: err.message, opportunityId });
    res.status(500).json({ error: 'Unable to fetch applications' });
  }
}

async function updateApplicationStatusHandler(req, res) {
  const { applicationId } = req.params;
  const { status, certificateUrl } = req.body;
  try {
    const updated = await updateApplicationStatus(applicationId, status, certificateUrl);
    if (!updated) {
      logger.error('Application not found for status update', { applicationId });
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update application status', { error: err.message, applicationId });
    res.status(400).json({ error: err.message });
  }
}

async function deleteApplicationHandler(req, res) {
  const { applicationId } = req.params;
  try {
    const removed = await deleteApplication(applicationId);
    if (!removed) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete application', { error: err.message, applicationId });
    res.status(500).json({ error: 'Unable to delete application' });
  }
}

async function getCompletedApplicationsHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const applications = await listCompletedApplicationsForUser(userId);
    res.json(applications);
  } catch (err) {
    logger.error('Failed to fetch completed applications', { error: err.message, userId });
    res.status(500).json({ error: 'Unable to fetch applications' });
  }
}

module.exports = {
  createApplicationHandler,
  getUserApplicationsHandler,
  getOpportunityApplicationsHandler,
  updateApplicationStatusHandler,
  deleteApplicationHandler,
  getCompletedApplicationsHandler,
};
