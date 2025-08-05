const Joi = require('joi');

const trendingTopicsQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
});

const curateFeedSchema = Joi.object({
  interests: Joi.array().items(Joi.string()).default([]),
  interactions: Joi.array().items(Joi.string()).default([]),
  feedback: Joi.array().items(Joi.string()).default([]),
});

module.exports = {
  trendingTopicsQuerySchema,
  curateFeedSchema,
};
