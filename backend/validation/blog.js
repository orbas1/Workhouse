const Joi = require('joi');

const categoryQuerySchema = Joi.object({
  category: Joi.string().max(50).optional()
});

const postIdParamSchema = Joi.object({
  id: Joi.string().required()
});

module.exports = { categoryQuerySchema, postIdParamSchema };
