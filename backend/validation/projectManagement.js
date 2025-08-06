const Joi = require('joi');

const projectIdParamSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const taskIdParamSchema = Joi.object({
  taskId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const feedIdParamSchema = Joi.object({
  feedId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const chartIdParamSchema = Joi.object({
  chartId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const fileIdParamSchema = Joi.object({
  fileId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).allow('', null),
  ownerId: Joi.string().required(),
  budget: Joi.number().positive().optional(),
});

const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  description: Joi.string().max(1000).allow('', null),
  status: Joi.string().valid('active', 'archived', 'completed'),
  budget: Joi.number().positive(),
});

const createTaskSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  ownerId: Joi.string().required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).allow('', null),
  category: Joi.string().max(100).optional(),
  location: Joi.string().max(255).optional(),
  budget: Joi.number().positive().optional(),
  dueDate: Joi.date().iso().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().max(1000).allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
  category: Joi.string().max(100),
  location: Joi.string().max(255),
  budget: Joi.number().positive(),
  dueDate: Joi.date().iso(),
});

const assignTaskSchema = Joi.object({
  taskId: Joi.string().guid({ version: 'uuidv4' }).required(),
  assignee: Joi.string().required(),
});

const taskQuerySchema = Joi.object({
  search: Joi.string().allow('', null),
  category: Joi.string().max(100),
  location: Joi.string().max(255),
  minBudget: Joi.number().positive(),
  maxBudget: Joi.number().positive(),
  deadline: Joi.date().iso(),
  sort: Joi.string().valid('closest', 'highest', 'newest'),

const listTasksQuerySchema = Joi.object({
  assignee: Joi.string().required(),
});

const aiProjectSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const taskListSchema = Joi.object({
  ownerId: Joi.string().guid({ version: 'uuidv4' }).optional(),
  assignee: Joi.string().optional(),
});

const hireSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  userId: Joi.string().required(),
  role: Joi.string().required(),
});

const feedPostSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  userId: Joi.string().required(),
  message: Joi.string().max(1000).required(),
});

const aiMessageSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  message: Joi.string().max(1000).required(),
});

const ganttChartSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  tasks: Joi.array().items(
    Joi.object({
      taskId: Joi.string().guid({ version: 'uuidv4' }).required(),
      start: Joi.date().iso().required(),
      end: Joi.date().iso().required(),
    })
  ).required(),
});

const scheduleSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  title: Joi.string().required(),
  date: Joi.date().iso().required(),
});

const budgetTrackSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().allow('', null),
});

const objectivesTrackSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  objective: Joi.string().required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
});

const reportSubmitSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  content: Joi.string().required(),
});

const fileUploadSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  filename: Joi.string().required(),
  url: Joi.string().uri().required(),
});

const workflowSetupSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  steps: Joi.array().items(Joi.string().required()).required(),
});

const textWriterSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  title: Joi.string().allow('', null),
  content: Joi.string().required(),
});

module.exports = {
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
  taskQuerySchema,
  listTasksQuerySchema,
  taskListSchema,
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
};
