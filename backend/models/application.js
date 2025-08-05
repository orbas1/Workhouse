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
    createdAt: now,
    updatedAt: now,
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

function updateApplicationStatus(id, status) {
  const application = applications.get(id);
  if (!application) return null;
  application.status = status;
  application.updatedAt = new Date();
  applications.set(id, application);
  return application;
}

module.exports = {
  createApplication,
  getApplicationById,
  getApplicationsByUser,
  getApplicationsByOpportunity,
  updateApplicationStatus,
};
