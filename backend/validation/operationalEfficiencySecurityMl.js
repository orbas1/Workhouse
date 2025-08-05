const Joi = require('joi');

const dateRangeQuerySchema = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
});

module.exports = { dateRangeQuerySchema };
