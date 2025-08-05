const model = require('../models/projectManagement');
const logger = require('../utils/logger');

async function createProject(data) {
  const project = model.createProject(data);
  logger.info('Workspace project created', { projectId: project.id });
  return project;
}

async function getProject(projectId) {
  return model.getProjectById(projectId);
}

async function updateProject(projectId, data) {
  const project = model.updateProject(projectId, data);
  if (!project) throw new Error('Project not found');
  logger.info('Workspace project updated', { projectId });
  return project;
}

async function deleteProject(projectId) {
  const deleted = model.deleteProject(projectId);
  if (!deleted) throw new Error('Project not found');
  logger.info('Workspace project deleted', { projectId });
}

async function createTask(data) {
  const task = model.createTask(data);
  logger.info('Task created', { taskId: task.id, projectId: data.projectId });
  return task;
}

async function getTask(taskId) {
  return model.getTaskById(taskId);
}

async function updateTask(taskId, data) {
  const task = model.updateTask(taskId, data);
  if (!task) throw new Error('Task not found');
  logger.info('Task updated', { taskId });
  return task;
}

async function deleteTask(taskId) {
  const deleted = model.deleteTask(taskId);
  if (!deleted) throw new Error('Task not found');
  logger.info('Task deleted', { taskId });
}

async function assignTask(taskId, assignee) {
  const task = model.assignTask(taskId, assignee);
  if (!task) throw new Error('Task not found');
  logger.info('Task assigned', { taskId, assignee });
  return task;
}

async function listTasksByAssignee(assignee) {
  return model.listTasksByAssignee(assignee);
}

async function suggestTasks(projectId) {
  // Basic placeholder suggestion
  logger.info('AI task suggestion requested', { projectId });
  return [
    { title: 'Define project scope', dueDate: new Date().toISOString() },
    { title: 'Assemble team', dueDate: new Date().toISOString() },
  ];
}

async function suggestBudget(projectId) {
  logger.info('AI budget suggestion requested', { projectId });
  return { projectId, suggestedBudget: 10000 };
}

async function suggestObjectives(projectId) {
  logger.info('AI objectives suggestion requested', { projectId });
  return [
    { objective: 'Launch MVP', targetDate: new Date().toISOString() },
  ];
}

async function hireEmployee(data) {
  const hire = model.hireEmployee(data);
  logger.info('Employee hired to workspace project', { projectId: data.projectId, userId: data.userId });
  return hire;
}

async function listEmployees(projectId) {
  return model.listEmployees(projectId);
}

async function postFeed(data) {
  const feed = model.postFeed(data);
  logger.info('Workspace feed posted', { projectId: data.projectId, feedId: feed.id });
  return feed;
}

async function getFeed(feedId) {
  return model.getFeedById(feedId);
}

async function sendAiMessage(projectId, message) {
  logger.info('AI messaging requested', { projectId });
  return { projectId, message: `AI: ${message}` };
}

async function createGanttChart(data) {
  const chart = model.createGanttChart(data);
  logger.info('Gantt chart created', { chartId: chart.id, projectId: data.projectId });
  return chart;
}

async function getGanttChart(chartId) {
  return model.getGanttChartById(chartId);
}

async function scheduleEvent(data) {
  const event = model.scheduleEvent(data);
  logger.info('Calendar event scheduled', { eventId: event.id, projectId: data.projectId });
  return event;
}

async function trackBudget(data) {
  const entry = model.trackBudget(data);
  logger.info('Budget entry tracked', { entryId: entry.id, projectId: data.projectId });
  return entry;
}

async function trackObjectives(data) {
  const entry = model.trackObjective(data);
  logger.info('Objective tracked', { entryId: entry.id, projectId: data.projectId });
  return entry;
}

async function submitReport(data) {
  const report = model.submitReport(data);
  logger.info('Report submitted', { reportId: report.id, projectId: data.projectId });
  return report;
}

async function getReports(projectId) {
  return model.getReportsByProject(projectId);
}

async function uploadFile(data) {
  const file = model.uploadFile(data);
  logger.info('File uploaded to workspace', { fileId: file.id, projectId: data.projectId });
  return file;
}

async function getFile(fileId) {
  return model.getFileById(fileId);
}

async function setupWorkflow(data) {
  const workflow = model.setupWorkflow(data);
  logger.info('Workflow setup', { workflowId: workflow.id, projectId: data.projectId });
  return workflow;
}

async function getSpreadsheet(projectId) {
  const sheet = model.getSpreadsheet(projectId);
  if (!sheet) {
    const url = `https://example.com/spreadsheet/${projectId}`;
    model.storeSpreadsheet(projectId, url);
    return { projectId, url };
  }
  return sheet;
}

async function createTextDocument(data) {
  const doc = model.createText(data);
  logger.info('Text document created', { documentId: doc.id, projectId: data.projectId });
  return doc;
}

module.exports = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  listTasksByAssignee,
  suggestTasks,
  suggestBudget,
  suggestObjectives,
  hireEmployee,
  listEmployees,
  postFeed,
  getFeed,
  sendAiMessage,
  createGanttChart,
  getGanttChart,
  scheduleEvent,
  trackBudget,
  trackObjectives,
  submitReport,
  getReports,
  uploadFile,
  getFile,
  setupWorkflow,
  getSpreadsheet,
  createTextDocument,
};
