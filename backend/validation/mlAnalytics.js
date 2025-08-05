const Joi = require('joi');

const recommendationsParamsSchema = Joi.object({
  userId: Joi.string().required(),
});

const insightsParamsSchema = Joi.object({
  domain: Joi.string().required(),
});

const customQueryBodySchema = Joi.object({
  query: Joi.string().required(),
  parameters: Joi.object().optional(),
});

const userBehaviorParamsSchema = Joi.object({
  userId: Joi.string().required(),
});

const sentimentParamsSchema = Joi.object({
  domain: Joi.string().required(),
});

module.exports = {
  recommendationsParamsSchema,
  insightsParamsSchema,
  customQueryBodySchema,
  userBehaviorParamsSchema,
  sentimentParamsSchema,
};

