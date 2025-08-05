const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  website: Joi.string().uri().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  website: Joi.string().uri(),
  status: Joi.string().valid('active', 'inactive'),
}).min(1);

const agreementSchema = Joi.object({
  affiliateId: Joi.string().required(),
  agreementVersion: Joi.number().integer().min(1).required(),
});

module.exports = {
  registerSchema,
  updateSchema,
  agreementSchema,
};
