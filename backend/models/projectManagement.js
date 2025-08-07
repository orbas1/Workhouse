const { randomUUID } = require('crypto');

// In-memory stores
const projects = new Map();
const tasks = new Map();
const employees = new Map();
const feeds = new Map();
const ganttCharts = new Map();
const calendarEvents = new Map();
const budgetEntries = new Map();
const objectiveEntries = new Map();
const reports = new Map();
const files = new Map();
const workflows = new Map();
const spreadsheets = new Map();
const textDocs = new Map();

function createProject({ name, description = '', ownerId, budget = 0 }) {
  const id = randomUUID();
  const now = new Date();
  const project = {
    id,
    name,
    description,
    ownerId,
    budget,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };
  projects.set(id, project);
  return project;
}

function getProjectById(projectId) {
  return projects.get(projectId);
}

function updateProject(projectId, data) {
  const project = projects.get(projectId);
  if (!project) return null;
  Object.assign(project, data, { updatedAt: new Date() });
  projects.set(projectId, project);
  return project;
}

function deleteProject(projectId) {
  return projects.delete(projectId);
}
function listProjects(ownerId) {
  return Array.from(projects.values()).filter((p) => !ownerId || p.ownerId === ownerId);
}


function createTask({
  projectId,
  title,
  description = '',
  category = null,
  location = null,
  budget = null,
  dueDate = null,
  ownerId,
}) {
  const id = randomUUID();
  const now = new Date();
  const task = {
    id,
    projectId,
    title,
    description,
    category,
    location,
    budget,
    dueDate,
    status: 'pending',
    assignee: null,
    ownerId,
    createdAt: now,
    updatedAt: now,
  };
  tasks.set(id, task);
  return task;
}

function getTaskById(taskId) {
  return tasks.get(taskId);
}
function listTasksByProject(projectId) {
  return Array.from(tasks.values()).filter((t) => t.projectId === projectId);
}

function updateTask(taskId, data) {
  const task = tasks.get(taskId);
  if (!task) return null;
  Object.assign(task, data, { updatedAt: new Date() });
  tasks.set(taskId, task);
  return task;
}

function deleteTask(taskId) {
  return tasks.delete(taskId);
}

function assignTask(taskId, assignee) {
  const task = tasks.get(taskId);
  if (!task) return null;
  task.assignee = assignee;
  task.updatedAt = new Date();
  tasks.set(taskId, task);
  return task;
}

function listTasks(filters = {}) {
  let result = Array.from(tasks.values());
  const {
    ownerId,
    assignee,
    search,
    category,
    location,
    minBudget,
    maxBudget,
    deadline,
    sort,
  } = filters;

  if (ownerId) {
    result = result.filter((t) => t.ownerId === ownerId);
  }
  if (assignee) {
    result = result.filter((t) => t.assignee === assignee);
  }

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(s) ||
        (t.description && t.description.toLowerCase().includes(s))
    );
  }
  if (category) {
    result = result.filter((t) => t.category === category);
  }
  if (location) {
    result = result.filter((t) => t.location === location);
  }
  if (minBudget !== undefined) {
    result = result.filter((t) => typeof t.budget === 'number' && t.budget >= Number(minBudget));
  }
  if (maxBudget !== undefined) {
    result = result.filter((t) => typeof t.budget === 'number' && t.budget <= Number(maxBudget));
  }
  if (deadline) {
    const d = new Date(deadline);
    result = result.filter((t) => t.dueDate && new Date(t.dueDate) <= d);
  }
  if (sort) {
    switch (sort) {
      case 'highest':
        result.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'closest':
        result.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
        break;
      default:
        break;
    }
  }
  return result;
}

function listTasksByAssignee(assignee) {
  return Array.from(tasks.values()).filter((task) => task.assignee === assignee);
}

function hireEmployee({ projectId, userId, role }) {
  const id = randomUUID();
  const hire = { id, projectId, userId, role, hiredAt: new Date() };
  employees.set(id, hire);
  return hire;
}

function listEmployees(projectId) {
  return Array.from(employees.values()).filter((e) => e.projectId === projectId);
}

function postFeed({ projectId, userId, message }) {
  const id = randomUUID();
  const feed = { id, projectId, userId, message, createdAt: new Date() };
  feeds.set(id, feed);
  return feed;
}

function getFeedById(feedId) {
  return feeds.get(feedId);
}

function createGanttChart({ projectId, tasks: chartTasks }) {
  const id = randomUUID();
  const chart = { id, projectId, tasks: chartTasks, createdAt: new Date() };
  ganttCharts.set(id, chart);
  return chart;
}

function getGanttChartById(chartId) {
  return ganttCharts.get(chartId);
}

function scheduleEvent({ projectId, title, date }) {
  const id = randomUUID();
  const event = { id, projectId, title, date, createdAt: new Date() };
  calendarEvents.set(id, event);
  return event;
}

function getEventById(eventId) {
  return calendarEvents.get(eventId);
}

function listEvents() {
  return Array.from(calendarEvents.values());
}

function listEventsByProject(projectId) {
  return Array.from(calendarEvents.values()).filter((e) => e.projectId === projectId);
}

function updateEvent(eventId, data) {
  const event = calendarEvents.get(eventId);
  if (!event) return null;
  Object.assign(event, data, { updatedAt: new Date() });
  calendarEvents.set(eventId, event);
  return event;
}

function deleteEvent(eventId) {
  return calendarEvents.delete(eventId);
}

function trackBudget({ projectId, amount, description }) {
  const id = randomUUID();
  const entry = { id, projectId, amount, description, createdAt: new Date() };
  budgetEntries.set(id, entry);
  return entry;
}

function trackObjective({ projectId, objective, status }) {
  const id = randomUUID();
  const entry = { id, projectId, objective, status, createdAt: new Date() };
  objectiveEntries.set(id, entry);
  return entry;
}

function submitReport({ projectId, content }) {
  const id = randomUUID();
  const report = { id, projectId, content, submittedAt: new Date() };
  reports.set(id, report);
  return report;
}

function getReportsByProject(projectId) {
  return Array.from(reports.values()).filter((r) => r.projectId === projectId);
}

function uploadFile({ projectId, filename, url }) {
  const id = randomUUID();
  const file = { id, projectId, filename, url, uploadedAt: new Date() };
  files.set(id, file);
  return file;
}

function getFileById(fileId) {
  return files.get(fileId);
}

function listFilesByProject(projectId) {
  return Array.from(files.values()).filter((f) => f.projectId === projectId);
}

function setupWorkflow({ projectId, steps }) {
  const id = randomUUID();
  const workflow = { id, projectId, steps, createdAt: new Date() };
  workflows.set(id, workflow);
  return workflow;
}

function listWorkflowsByProject(projectId) {
  return Array.from(workflows.values()).filter((w) => w.projectId === projectId);
}

function storeSpreadsheet(projectId, url) {
  spreadsheets.set(projectId, { projectId, url });
}

function getSpreadsheet(projectId) {
  return spreadsheets.get(projectId);
}

function createText({ projectId, title = '', content }) {
  const id = randomUUID();
  const doc = { id, projectId, title, content, createdAt: new Date() };
  textDocs.set(id, doc);
  return doc;
}

function listProjects() {
  return Array.from(projects.values());
}

function getBudgetSummary(projectId) {
  const project = projects.get(projectId) || {};
  const allocatedBudget = project.budget || 0;
  const entries = Array.from(budgetEntries.values()).filter((e) => e.projectId === projectId);
  const totalSpent = entries.reduce((sum, e) => sum + e.amount, 0);
  return {
    allocatedBudget,
    totalSpent,
    remainingBudget: allocatedBudget - totalSpent,
  };
}

module.exports = {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  listProjects,
  createTask,
  getTaskById,
  listTasks,
  listTasksByProject,
  updateTask,
  deleteTask,
  assignTask,
  listTasksByAssignee,
  hireEmployee,
  listEmployees,
  postFeed,
  getFeedById,
  createGanttChart,
  getGanttChartById,
  scheduleEvent,
  getEventById,
  listEvents,
  listEventsByProject,
  updateEvent,
  deleteEvent,
  trackBudget,
  trackObjective,
  submitReport,
  getReportsByProject,
  uploadFile,
  getFileById,
  listFilesByProject,
  setupWorkflow,
  listWorkflowsByProject,
  storeSpreadsheet,
  getSpreadsheet,
  createText,
  getBudgetSummary,
};
