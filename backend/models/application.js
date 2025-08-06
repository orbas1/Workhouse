const { randomUUID } = require('crypto');

// In-memory storage for volunteer applications
const applications = new Map();

function createApplication({ opportunityId, userId, message }) {
  const id = randomUUID();
  const now = new Date();
  const application = {
    id,
    opportunityId,
    userId,
    message,
    status: 'pending',
    certificateUrl: null,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };
  applications.set(id, application);
  return application;
}

function getApplicationById(id) {
  return applications.get(id);
}

function getApplicationsByUser(userId) {
  return Array.from(applications.values()).filter(app => app.userId === userId);
}

function getApplicationsByOpportunity(opportunityId) {
  return Array.from(applications.values()).filter(app => app.opportunityId === opportunityId);
}

function updateApplicationStatus(id, status, certificateUrl) {
  const application = applications.get(id);
  if (!application) return null;
  application.status = status;
  application.updatedAt = new Date();
  if (status === 'completed') {
    application.completedAt = new Date();
    if (certificateUrl) application.certificateUrl = certificateUrl;
  }
  applications.set(id, application);
  return application;
}

function deleteApplication(id) {
  return applications.delete(id);
}

function getCompletedApplicationsByUser(userId) {
  return Array.from(applications.values()).filter(
    (app) => app.userId === userId && app.status === 'completed'
  );
}

module.exports = {
  createApplication,
  getApplicationById,
  getApplicationsByUser,
  getApplicationsByOpportunity,
  updateApplicationStatus,
  deleteApplication,
  getCompletedApplicationsByUser,
};
