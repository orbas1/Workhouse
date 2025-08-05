const Joi = require('joi');

const createConnectionSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().max(100).required(),
  company: Joi.string().max(100).allow('', null).default(''),
  status: Joi.string()
    .valid('active', 'pending', 'reengage', 'archived')
    .default('active'),
  notes: Joi.string().allow('').default(''),
});

const updateConnectionSchema = Joi.object({
  status: Joi.string().valid('active', 'pending', 'reengage', 'archived'),
  notes: Joi.string().allow(''),
  lastInteraction: Joi.date(),
});

module.exports = { createConnectionSchema, updateConnectionSchema };
