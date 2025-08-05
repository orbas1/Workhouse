const Joi = require('joi');

const groupSessionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  scheduledAt: Joi.date().iso().required(),
});

const liveQaSchema = Joi.object({
  topic: Joi.string().required(),
  scheduledAt: Joi.date().iso().required(),
});

const recommendResourceSchema = Joi.object({
  resource: Joi.string().required(),
});

const assignResourceSchema = Joi.object({
  resource: Joi.string().required(),
});

const confidentialitySetupSchema = Joi.object({
  text: Joi.string().required(),
});

const confidentialityConfirmSchema = Joi.object({
  sessionId: Joi.string().required(),
});

module.exports = {
  groupSessionSchema,
  liveQaSchema,
  recommendResourceSchema,
  assignResourceSchema,
  confidentialitySetupSchema,
  confidentialityConfirmSchema,
};

