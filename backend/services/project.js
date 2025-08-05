const projectModel = require('../models/project');
const logger = require('../utils/logger');

async function submitProject(pathId, userId, data) {
  const project = projectModel.createProject({ pathId, userId, ...data });
  logger.info('Project submitted', { projectId: project.id, pathId, userId });
  return project;
}

async function getProject(projectId) {
  return projectModel.getProjectById(projectId);
}

async function startCollaborativeProject(pathId, userId, data) {
  const project = projectModel.createProject({ pathId, userId, collaborators: data.collaborators, ...data });
  logger.info('Collaborative project started', {
    projectId: project.id,
    pathId,
    userId,
    collaborators: data.collaborators.length,
  });
  return project;
}

async function submitExternalProject(userId, data) {
  const project = projectModel.createProject({ pathId: null, userId, external: true, ...data });
  logger.info('External project submitted', { projectId: project.id, userId });
  return project;
}

module.exports = {
  submitProject,
  getProject,
  startCollaborativeProject,
  submitExternalProject,
};
