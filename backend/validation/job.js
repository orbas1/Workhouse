const Joi = require('joi');

const jobIdParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const assignmentParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
  employeeId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

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

const applicationProgressParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
  appId: Joi.string().guid({ version: 'uuidv4' }).required(),
}).unknown(true);

const applicationProgressSchema = Joi.object({
  stage: Joi.number().integer().min(0).max(6),
  notes: Joi.string().allow('', null),
  feedback: Joi.string().allow('', null),
}).min(1);

module.exports = {
  jobIdParamSchema,
  assignmentParamSchema,
  createJobSchema,
  updateJobSchema,
  applicationProgressSchema,
  applicationProgressParamSchema,
};
