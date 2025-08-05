const Joi = require('joi');

const retentionQuerySchema = Joi.object({
  days: Joi.number().integer().min(1).max(365).default(30),
});

const marketTrendsQuerySchema = Joi.object({
  industry: Joi.string().optional(),
  horizon: Joi.number().integer().min(1).max(365).default(30),
});

module.exports = {
  retentionQuerySchema,
  marketTrendsQuerySchema,
};
