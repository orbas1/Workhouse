const Joi = require('joi');

const jobIdParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const assignmentParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
  employeeId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  jobIdParamSchema,
  assignmentParamSchema,
const createJobSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  budget: Joi.number().positive().optional(),
  deadline: Joi.date().iso().optional(),
});

const updateJobSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().min(10),
  budget: Joi.number().positive(),
  deadline: Joi.date().iso(),
  status: Joi.string().valid('open', 'closed'),
}).min(1);

module.exports = {
  createJobSchema,
  updateJobSchema,
};
