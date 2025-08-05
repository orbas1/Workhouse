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
