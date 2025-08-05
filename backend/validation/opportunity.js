const Joi = require('joi');

const opportunityIdParamSchema = Joi.object({
  opportunityId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const opportunityQuerySchema = Joi.object({
  location: Joi.string().optional(),
  remote: Joi.boolean().optional(),
  commitmentTime: Joi.string().optional(),
  urgency: Joi.string().valid('low', 'medium', 'high').optional(),
  category: Joi.string().optional(),
  duration: Joi.string().optional(),
  experienceLevel: Joi.string().optional(),
  status: Joi.string().valid('open', 'closed').optional(),
  keyword: Joi.string().optional(),
  compensationMin: Joi.number().optional(),
  compensationMax: Joi.number().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

const createOpportunitySchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  location: Joi.string().allow('').optional(),
  remote: Joi.boolean().optional(),
  commitmentTime: Joi.string().allow('').optional(),
  urgency: Joi.string().valid('low', 'medium', 'high').optional(),
  requirements: Joi.string().allow('').optional(),
  multimedia: Joi.array().items(Joi.string().uri()).optional(),
  isFeatured: Joi.boolean().optional(),
  category: Joi.string().allow('').optional(),
  duration: Joi.string().allow('').optional(),
  compensation: Joi.number().optional(),
  experienceLevel: Joi.string().allow('').optional(),
  status: Joi.string().valid('open', 'closed').optional(),
});

const updateOpportunitySchema = createOpportunitySchema.fork(
  [
    'title',
    'description',
    'location',
    'remote',
    'commitmentTime',
    'urgency',
    'requirements',
    'multimedia',
    'isFeatured',
    'category',
    'duration',
    'compensation',
    'experienceLevel',
    'status',
  ],
  (schema) => schema.optional()
);

module.exports = {
  opportunityIdParamSchema,
  opportunityQuerySchema,
  createOpportunitySchema,
  updateOpportunitySchema,
};
