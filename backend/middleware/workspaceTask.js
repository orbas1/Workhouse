const projectService = require('../services/projectManagement');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await projectService.getTask(taskId);
  if (!task) {
    logger.error('Workspace task not found', { taskId });
    return res.status(404).json({ error: 'Task not found' });
  }
  req.task = task;
  next();
};
