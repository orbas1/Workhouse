const projectService = require('../services/projectManagement');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  const { projectId } = req.params;
  const project = await projectService.getProject(projectId);
  if (!project) {
    logger.error('Workspace project not found', { projectId });
    return res.status(404).json({ error: 'Project not found' });
  }
  req.project = project;
  next();
};
