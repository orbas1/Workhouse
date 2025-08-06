const service = require('../services/projectManagement');
const logger = require('../utils/logger');

async function createProjectHandler(req, res) {
  try {
    const project = await service.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    logger.error('Failed to create project', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listProjectsHandler(req, res) {
  try {
    const projects = await service.listProjects(req.user.id);
    res.json(projects);
  } catch (err) {
    logger.error('Failed to list projects', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getProjectHandler(req, res) {
  const { projectId } = req.params;
  try {
    const project = await service.getProject(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    logger.error('Failed to get project', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function updateProjectHandler(req, res) {
  const { projectId } = req.params;
  try {
    const project = await service.updateProject(projectId, req.body);
    res.json(project);
  } catch (err) {
    logger.error('Failed to update project', { error: err.message, projectId });
    res.status(404).json({ error: err.message });
  }
}

async function deleteProjectHandler(req, res) {
  const { projectId } = req.params;
  try {
    await service.deleteProject(projectId);
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete project', { error: err.message, projectId });
    res.status(404).json({ error: err.message });
  }
}

async function createTaskHandler(req, res) {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    logger.error('Failed to create task', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listTasksHandler(req, res) {
  try {
    const tasks = await service.listTasks(req.query);
    res.json(tasks);
  } catch (err) {
    logger.error('Failed to list tasks', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getTaskHandler(req, res) {
  const { taskId } = req.params;
  try {
    const task = await service.getTask(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    logger.error('Failed to get task', { error: err.message, taskId });
    res.status(500).json({ error: err.message });
  }
}

async function listTasksHandler(req, res) {
  const { projectId } = req.params;
  try {
    const tasks = await service.listTasks(projectId);
    res.json(tasks);
  } catch (err) {
    logger.error('Failed to list tasks', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function updateTaskHandler(req, res) {
  const { taskId } = req.params;
  try {
    const task = await service.updateTask(taskId, req.body);
    res.json(task);
  } catch (err) {
    logger.error('Failed to update task', { error: err.message, taskId });
    res.status(404).json({ error: err.message });
  }
}

async function deleteTaskHandler(req, res) {
  const { taskId } = req.params;
  try {
    await service.deleteTask(taskId);
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete task', { error: err.message, taskId });
    res.status(404).json({ error: err.message });
  }
}

async function assignTaskHandler(req, res) {
  const { taskId, assignee } = req.body;
  try {
    const task = await service.assignTask(taskId, assignee);
    res.json(task);
  } catch (err) {
    logger.error('Failed to assign task', { error: err.message, taskId, assignee });
    res.status(404).json({ error: err.message });
  }
}

async function suggestTasksHandler(req, res) {
  const { projectId } = req.body;
  try {
    const suggestions = await service.suggestTasks(projectId);
    res.json(suggestions);
  } catch (err) {
    logger.error('Failed to suggest tasks', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function suggestBudgetHandler(req, res) {
  const { projectId } = req.body;
  try {
    const suggestion = await service.suggestBudget(projectId);
    res.json(suggestion);
  } catch (err) {
    logger.error('Failed to suggest budget', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function suggestObjectivesHandler(req, res) {
  const { projectId } = req.body;
  try {
    const objectives = await service.suggestObjectives(projectId);
    res.json(objectives);
  } catch (err) {
    logger.error('Failed to suggest objectives', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function hireEmployeeHandler(req, res) {
  try {
    const hire = await service.hireEmployee(req.body);
    res.status(201).json(hire);
  } catch (err) {
    logger.error('Failed to hire employee', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listEmployeesHandler(req, res) {
  const { projectId } = req.query;
  try {
    const employees = await service.listEmployees(projectId);
    res.json(employees);
  } catch (err) {
    logger.error('Failed to list employees', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function postFeedHandler(req, res) {
  try {
    const feed = await service.postFeed(req.body);
    res.status(201).json(feed);
  } catch (err) {
    logger.error('Failed to post feed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getFeedHandler(req, res) {
  const { feedId } = req.params;
  try {
    const feed = await service.getFeed(feedId);
    if (!feed) return res.status(404).json({ error: 'Feed not found' });
    res.json(feed);
  } catch (err) {
    logger.error('Failed to get feed', { error: err.message, feedId });
    res.status(500).json({ error: err.message });
  }
}

async function aiMessagingHandler(req, res) {
  const { projectId, message } = req.body;
  try {
    const response = await service.sendAiMessage(projectId, message);
    res.json(response);
  } catch (err) {
    logger.error('Failed to send AI message', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function createGanttChartHandler(req, res) {
  try {
    const chart = await service.createGanttChart(req.body);
    res.status(201).json(chart);
  } catch (err) {
    logger.error('Failed to create Gantt chart', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getGanttChartHandler(req, res) {
  const { chartId } = req.params;
  try {
    const chart = await service.getGanttChart(chartId);
    if (!chart) return res.status(404).json({ error: 'Chart not found' });
    res.json(chart);
  } catch (err) {
    logger.error('Failed to get Gantt chart', { error: err.message, chartId });
    res.status(500).json({ error: err.message });
  }
}

async function scheduleEventHandler(req, res) {
  try {
    const event = await service.scheduleEvent(req.body);
    res.status(201).json(event);
  } catch (err) {
    logger.error('Failed to schedule event', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function trackBudgetHandler(req, res) {
  try {
    const entry = await service.trackBudget(req.body);
    res.status(201).json(entry);
  } catch (err) {
    logger.error('Failed to track budget', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function trackObjectivesHandler(req, res) {
  try {
    const entry = await service.trackObjectives(req.body);
    res.status(201).json(entry);
  } catch (err) {
    logger.error('Failed to track objectives', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function submitReportHandler(req, res) {
  try {
    const report = await service.submitReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    logger.error('Failed to submit report', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getReportsHandler(req, res) {
  const { projectId } = req.params;
  try {
    const reports = await service.getReports(projectId);
    res.json(reports);
  } catch (err) {
    logger.error('Failed to get reports', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function uploadFileHandler(req, res) {
  try {
    const file = await service.uploadFile(req.body);
    res.status(201).json(file);
  } catch (err) {
    logger.error('Failed to upload file', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getFileHandler(req, res) {
  const { fileId } = req.params;
  try {
    const file = await service.getFile(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (err) {
    logger.error('Failed to get file', { error: err.message, fileId });
    res.status(500).json({ error: err.message });
  }
}

async function listFilesHandler(req, res) {
  const { projectId } = req.params;
  try {
    const files = await service.listFiles(projectId);
    res.json(files);
  } catch (err) {
    logger.error('Failed to list files', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function setupWorkflowHandler(req, res) {
  try {
    const workflow = await service.setupWorkflow(req.body);
    res.status(201).json(workflow);
  } catch (err) {
    logger.error('Failed to setup workflow', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listWorkflowsHandler(req, res) {
  const { projectId } = req.params;
  try {
    const workflows = await service.listWorkflows(projectId);
    res.json(workflows);
  } catch (err) {
    logger.error('Failed to list workflows', { error: err.message, projectId });
    res.status(400).json({ error: err.message });
  }
}

async function getSpreadsheetHandler(req, res) {
  const { projectId } = req.params;
  try {
    const sheet = await service.getSpreadsheet(projectId);
    res.json(sheet);
  } catch (err) {
    logger.error('Failed to get spreadsheet', { error: err.message, projectId });
    res.status(500).json({ error: err.message });
  }
}

async function createTextDocumentHandler(req, res) {
  try {
    const doc = await service.createTextDocument(req.body);
    res.status(201).json(doc);
  } catch (err) {
    logger.error('Failed to create text document', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createProjectHandler,
  listProjectsHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  createTaskHandler,
  listTasksHandler,
  getTaskHandler,
  listTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
  assignTaskHandler,
  suggestTasksHandler,
  suggestBudgetHandler,
  suggestObjectivesHandler,
  hireEmployeeHandler,
  listEmployeesHandler,
  postFeedHandler,
  getFeedHandler,
  aiMessagingHandler,
  createGanttChartHandler,
  getGanttChartHandler,
  scheduleEventHandler,
  trackBudgetHandler,
  trackObjectivesHandler,
  submitReportHandler,
  getReportsHandler,
  uploadFileHandler,
  getFileHandler,
  listFilesHandler,
  setupWorkflowHandler,
  listWorkflowsHandler,
  getSpreadsheetHandler,
  createTextDocumentHandler,
};
