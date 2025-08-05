const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional(),
  fullName: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).required(),
  location: Joi.string().max(255).required(),
  bio: Joi.string().max(1000).required(),
  expertise: Joi.string().max(255).allow('', null),
  recaptchaToken: Joi.string().required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
