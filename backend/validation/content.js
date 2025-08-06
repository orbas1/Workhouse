const Joi = require('joi');

const createContentSchema = Joi.object({
  type: Joi.string().valid('podcast', 'webinar').required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
});

module.exports = { createContentSchema };
