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

const postIdParamSchema = Joi.object({
  postId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  dateRangeSchema,
  postIdParamSchema,
};
