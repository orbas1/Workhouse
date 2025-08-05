const Joi = require('joi');

const userIdParamSchema = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const projectIdParamSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const addPortfolioItemSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).allow('').optional(),
  url: Joi.string().uri().optional(),
  technologies: Joi.array().items(Joi.string()).optional(),
  details: Joi.object().optional(),
});

const exportPortfolioSchema = Joi.object({
  format: Joi.string().valid('pdf', 'json', 'html').default('json'),
  destination: Joi.string().uri().optional(),
});

const addProjectDetailSchema = Joi.object({
  details: Joi.object().required(),
});

module.exports = {
  userIdParamSchema,
  projectIdParamSchema,
  addPortfolioItemSchema,
  exportPortfolioSchema,
  addProjectDetailSchema,
};
