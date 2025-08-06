const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(500).allow('', null),
});

const preferencesSchema = Joi.object({
  topics: Joi.array().items(Joi.string()).default([]),
  goals: Joi.string().max(500).allow('', null),
  field: Joi.string().allow('', null),
  isPaid: Joi.boolean().optional(),
  employmentType: Joi.string().valid('freelance', 'employment').optional(),
  offering: Joi.string().allow('', null),
  looking: Joi.boolean().optional(),
  autoNotify: Joi.boolean().optional(),
});

const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  method: Joi.string().max(50).required(),
});

const profileUpdateSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email(),
  bio: Joi.string().max(500).allow('', null),
}).min(1);

module.exports = {
  registerSchema,
  preferencesSchema,
  paymentSchema,
  profileUpdateSchema,
};

