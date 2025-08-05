const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(500).allow('', null),
});

const preferencesSchema = Joi.object({
  topics: Joi.array().items(Joi.string()).default([]),
  goals: Joi.string().max(500).allow('', null),
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

