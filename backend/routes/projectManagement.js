const express = require('express');
const {
  createProjectHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
  createTaskHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  assignTaskHandler,
  listTasksHandler,
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
  setupWorkflowHandler,
  getSpreadsheetHandler,
  createTextDocumentHandler,
} = require('../controllers/projectManagement');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const projectExists = require('../middleware/workspaceProject');
const taskExists = require('../middleware/workspaceTask');
const {
  projectIdParamSchema,
  taskIdParamSchema,
  feedIdParamSchema,
  chartIdParamSchema,
  fileIdParamSchema,
  createProjectSchema,
  updateProjectSchema,
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
  listTasksQuerySchema,
  aiProjectSchema,
  hireSchema,
  feedPostSchema,
  aiMessageSchema,
  ganttChartSchema,
  scheduleSchema,
  budgetTrackSchema,
  objectivesTrackSchema,
  reportSubmitSchema,
  fileUploadSchema,
  workflowSetupSchema,
  textWriterSchema,
} = require('../validation/projectManagement');

const router = express.Router();

// Project routes
router.post('/projects/create', auth, validate(createProjectSchema), createProjectHandler);
router.get('/projects/:projectId', auth, validate(projectIdParamSchema, 'params'), projectExists, getProjectHandler);
router.put('/projects/update/:projectId', auth, validate(projectIdParamSchema, 'params'), validate(updateProjectSchema), projectExists, updateProjectHandler);
router.delete('/projects/delete/:projectId', auth, validate(projectIdParamSchema, 'params'), projectExists, deleteProjectHandler);

// Task routes
router.post('/tasks/create', auth, validate(createTaskSchema), createTaskHandler);
router.get('/tasks/:taskId', auth, validate(taskIdParamSchema, 'params'), taskExists, getTaskHandler);
router.put('/tasks/update/:taskId', auth, validate(taskIdParamSchema, 'params'), validate(updateTaskSchema), taskExists, updateTaskHandler);
router.delete('/tasks/delete/:taskId', auth, validate(taskIdParamSchema, 'params'), taskExists, deleteTaskHandler);
router.post('/tasks/assign', auth, validate(assignTaskSchema), assignTaskHandler);
router.get('/tasks', auth, validate(listTasksQuerySchema, 'query'), listTasksHandler);

// AI routes
router.post('/ai/tasks/suggest', auth, validate(aiProjectSchema), suggestTasksHandler);
router.post('/ai/budget/suggest', auth, validate(aiProjectSchema), suggestBudgetHandler);
router.post('/ai/objectives/suggest', auth, validate(aiProjectSchema), suggestObjectivesHandler);
router.post('/ai/messaging', auth, validate(aiMessageSchema), aiMessagingHandler);

// Employment
router.post('/employment/hire', auth, validate(hireSchema), hireEmployeeHandler);
router.get('/employment/list', auth, validate(aiProjectSchema, 'query'), listEmployeesHandler);

// Feed
router.post('/feed/post', auth, validate(feedPostSchema), postFeedHandler);
router.get('/feed/:feedId', auth, validate(feedIdParamSchema, 'params'), getFeedHandler);

// Gantt & Scheduling
router.post('/gantt-chart/create', auth, validate(ganttChartSchema), createGanttChartHandler);
router.get('/gantt-chart/:chartId', auth, validate(chartIdParamSchema, 'params'), getGanttChartHandler);
router.post('/calendar/schedule', auth, validate(scheduleSchema), scheduleEventHandler);

// Tracking
router.post('/budget/track', auth, validate(budgetTrackSchema), trackBudgetHandler);
router.post('/objectives/track', auth, validate(objectivesTrackSchema), trackObjectivesHandler);

// Reporting
router.post('/reports/submit', auth, validate(reportSubmitSchema), submitReportHandler);
router.get('/reports/:projectId', auth, validate(projectIdParamSchema, 'params'), projectExists, getReportsHandler);

// Files & workflows
router.post('/files/upload', auth, validate(fileUploadSchema), uploadFileHandler);
router.get('/files/:fileId', auth, validate(fileIdParamSchema, 'params'), getFileHandler);
router.post('/workflows/setup', auth, validate(workflowSetupSchema), setupWorkflowHandler);

// Miscellaneous
router.get('/spreadsheets/:projectId', auth, validate(projectIdParamSchema, 'params'), projectExists, getSpreadsheetHandler);
router.post('/text-writer/create', auth, validate(textWriterSchema), createTextDocumentHandler);

module.exports = router;
