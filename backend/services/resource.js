const resourceModel = require('../models/resource');
const logger = require('../utils/logger');

async function listServices(filters = {}) {
  return resourceModel.listServices(filters);
}

async function getServiceById(id) {
  return resourceModel.getServiceById(id);
}

async function requestService(userId, data) {
  const { serviceId, description } = data;
  const request = resourceModel.createServiceRequest(userId, serviceId, description);
  logger.info('Service requested', { requestId: request.id, userId, serviceId });
  return request;
}

async function getResourcesByType(type) {
  const items = resourceModel.getResourcesByType(type);
  logger.info('Resources retrieved', { type, count: items.length });
  return items;
}

async function getLegalResources(region) {
  const items = resourceModel.getLegalResourcesByRegion(region);
  logger.info('Legal resources retrieved', { region, count: items.length });
  return items;
}

async function subscribeFundingAlerts({ profileId, preferences }) {
  const subscription = resourceModel.subscribeFunding(profileId, preferences);
  logger.info('Funding alert subscription created', { profileId });
  return subscription;
}

async function getFundingAlerts(profileId) {
  const alerts = resourceModel.getFundingAlerts(profileId);
  logger.info('Funding alerts retrieved', { profileId, count: alerts.length });
  return alerts;
}

async function applyMentorship(data) {
  const { applicantId, mentorId, message } = data;
  const application = resourceModel.applyMentorship(applicantId, mentorId, message);
  logger.info('Mentorship application submitted', {
    applicationId: application.id,
    applicantId,
    mentorId,
  });
  return application;
}

async function listMentors() {
  return resourceModel.listMentors();
}

module.exports = {
  listServices,
  getServiceById,
  requestService,
  getResourcesByType,
  getLegalResources,
  subscribeFundingAlerts,
  getFundingAlerts,
  applyMentorship,
  listMentors,
};
