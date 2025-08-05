const Joi = require('joi');

const logSchema = Joi.object({
  freelancerId: Joi.string().required(),
  jobId: Joi.string().required(),
  hours: Joi.number().positive().required(),
  date: Joi.date().optional(),
  notes: Joi.string().max(255).allow('').optional(),
});

module.exports = {
  logSchema,
};
