const Joi = require('joi');

const postSchema = Joi.object({
  content: Joi.string().min(1).max(500).required(),
  category: Joi.string().valid('employment', 'freelancing', 'education', 'networking', 'local', 'general').optional(),
});

const categoryQuerySchema = Joi.object({
  category: Joi.string().valid('employment', 'freelancing', 'education', 'networking', 'local', 'general').optional(),
});

module.exports = { postSchema, categoryQuerySchema };
