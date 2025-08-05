const {
  submitProject,
  getProject,
  startCollaborativeProject,
  submitExternalProject,
} = require('../services/project');
const logger = require('../utils/logger');

async function submitProjectHandler(req, res) {
  const { pathId } = req.params;
  const userId = req.user?.username;
  try {
    const project = await submitProject(pathId, userId, req.body);
    res.status(201).json(project);
  } catch (err) {
    logger.error('Failed to submit project', { error: err.message, pathId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getProjectHandler(req, res) {
  res.json(req.project);
}

async function startCollaborativeProjectHandler(req, res) {
  const { pathId } = req.params;
  const userId = req.user?.username;
  try {
    const project = await startCollaborativeProject(pathId, userId, req.body);
    res.status(201).json(project);
  } catch (err) {
    logger.error('Failed to start collaborative project', { error: err.message, pathId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function submitExternalProjectHandler(req, res) {
  const { userId } = req.params;
  if (req.user?.username !== userId) {
    logger.error('User ID mismatch on external project submission', { userId, authUser: req.user?.username });
    return res.status(403).json({ error: 'Cannot submit project for another user' });
  }
  try {
    const project = await submitExternalProject(userId, req.body);
    res.status(201).json(project);
  } catch (err) {
    logger.error('Failed to submit external project', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitProjectHandler,
  getProjectHandler,
  startCollaborativeProjectHandler,
  submitExternalProjectHandler,
};
