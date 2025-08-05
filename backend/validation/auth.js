const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(1).required(),
  phone: Joi.string().allow('').optional(),
  location: Joi.string().allow('').optional(),
  bio: Joi.string().allow('').optional(),
  expertise: Joi.string().allow('').optional(),
  recaptchaToken: Joi.string().required()
});

module.exports = { registerSchema };
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional(),
  fullName: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).required(),
  location: Joi.string().max(255).required(),
  bio: Joi.string().max(1000).required(),
  expertise: Joi.string().max(255).allow('', null)
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
