const Joi = require('joi');

const insightsParamsSchema = Joi.object({
  domain: Joi.string().valid('employment', 'freelance', 'education').required(),
});

const recommendationsParamsSchema = Joi.object({
  userId: Joi.string().required(),
});

module.exports = {
  insightsParamsSchema,
  recommendationsParamsSchema,
};
