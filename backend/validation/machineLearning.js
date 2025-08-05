const Joi = require('joi');

const modelTrainingUpdateSchema = Joi.object({
  modelName: Joi.string().required(),
  data: Joi.array().items(Joi.object()).min(1).required(),
});

const modelPerformanceQuerySchema = Joi.object({
  modelName: Joi.string().required(),
});

const metricParamSchema = Joi.object({
  metric: Joi.string().required(),
});

const metricDomainParamSchema = Joi.object({
  metric: Joi.string().required(),
  domain: Joi.string().required(),
});

const compareDomainBodySchema = Joi.object({
  compareWith: Joi.array().items(Joi.string()).min(1).required(),
});

const customTrendSchema = Joi.object({
  metric: Joi.string().required(),
  domain: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
});

module.exports = {
  modelTrainingUpdateSchema,
  modelPerformanceQuerySchema,
  metricParamSchema,
  metricDomainParamSchema,
  compareDomainBodySchema,
  customTrendSchema,
};
