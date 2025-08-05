const Joi = require('joi');

const generateSchema = Joi.object({
  prompt: Joi.string().min(1).required(),
  maxTokens: Joi.number().integer().min(1).max(2048).optional(),
});

const contactSchema = Joi.object({
  model: Joi.string().required(),
  input: Joi.string().min(1).required(),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  generateSchema,
  contactSchema,
  idParamSchema,
};
