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

const customForecastSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  revenue: Joi.number().positive().required(),
  expenses: Joi.number().positive().required(),
  growthRate: Joi.number().min(0).optional(),
}).custom((value, helpers) => {
  if (value.startDate > value.endDate) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'custom forecast validation');

module.exports = { dateRangeSchema, customForecastSchema };
