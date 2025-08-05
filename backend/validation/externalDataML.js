const Joi = require('joi');

const metricSchema = Joi.object({
  metric: Joi.string().max(255).required(),
  value: Joi.number().required(),
});

const analyzeExternalDataSchema = Joi.object({
  sourceType: Joi.string().max(50).required(),
  sourceName: Joi.string().max(255).required(),
  data: Joi.array().items(metricSchema).min(1).required(),
});

const createReportSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().allow('').max(1000),
  metrics: Joi.array().items(metricSchema).min(1).required(),
});

const updateReportSchema = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string().allow('').max(1000),
  metrics: Joi.array().items(metricSchema).min(1),
}).min(1);

const reportIdParamSchema = Joi.object({
  reportId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  analyzeExternalDataSchema,
  createReportSchema,
  updateReportSchema,
  reportIdParamSchema,
};
