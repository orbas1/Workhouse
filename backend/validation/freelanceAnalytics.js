const Joi = require('joi');

const dateRangeSchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
}).custom((value, helpers) => {
  if (value.startDate && value.endDate && value.startDate > value.endDate) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'date range validation');

const jobParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const freelancerParamSchema = Joi.object({
  freelancerId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = { dateRangeSchema, jobParamSchema, freelancerParamSchema };
