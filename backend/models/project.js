const { randomUUID } = require('crypto');

const projects = new Map();

function createProject({ pathId = null, userId, title, description = '', link = '', collaborators = [], external = false }) {
  const id = randomUUID();
  const now = new Date();
  const project = {
    id,
    pathId,
    userId,
    title,
    description,
    link,
    collaborators,
    external,
    feedback: [],
    createdAt: now,
    updatedAt: now,
  };
  projects.set(id, project);
  return project;
}

function getProjectById(projectId) {
  return projects.get(projectId);
}

function addFeedback(projectId, { reviewerId, comment }) {
  const project = projects.get(projectId);
  if (!project) return null;
  const feedback = { reviewerId, comment, createdAt: new Date() };
  project.feedback.push(feedback);
  project.updatedAt = new Date();
  return feedback;
}

module.exports = {
  createProject,
  getProjectById,
  addFeedback,
};
