const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('super_admin','admin','support','professional','user').default('user'),
  fullName: Joi.string().max(255).allow('', null),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().max(20).allow('', null),
  location: Joi.string().max(255).allow('', null),
  bio: Joi.string().max(1000).allow('', null),
  expertise: Joi.string().max(255).allow('', null),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema, resetPasswordSchema };
