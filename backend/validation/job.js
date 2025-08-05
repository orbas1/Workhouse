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
};
