const Joi = require('joi');

const addClientSchema = Joi.object({
  agencyId: Joi.string().uuid().required(),
  companyName: Joi.string().min(1).max(255).required(),
  contactName: Joi.string().min(1).max(100).optional(),
  contactEmail: Joi.string().email().optional(),
  contactPhone: Joi.string().optional(),
  preferences: Joi.object().optional(),
});

const updateClientSchema = Joi.object({
  companyName: Joi.string().min(1).max(255),
  contactName: Joi.string().min(1).max(100),
  contactEmail: Joi.string().email(),
  contactPhone: Joi.string(),
  preferences: Joi.object(),
}).min(1);

const clientIdParamSchema = Joi.object({
  clientId: Joi.string().uuid().required(),
});

const agencyIdParamSchema = Joi.object({
  agencyId: Joi.string().uuid().required(),
});

module.exports = {
  addClientSchema,
  updateClientSchema,
  clientIdParamSchema,
  agencyIdParamSchema,
};
