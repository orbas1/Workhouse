const Joi = require('joi');

const eventSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow('', null),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
  courseId: Joi.string().required(),
  type: Joi.string().valid('class', 'assignment', 'exam', 'event').required(),
});

module.exports = { eventSchema };
