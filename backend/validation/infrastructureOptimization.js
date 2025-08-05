const Joi = require('joi');

const loadPredictionQuerySchema = Joi.object({
  service: Joi.string().required(),
  timeframe: Joi.string().valid('1h', '24h', '7d').default('1h'),
});

const incidentPredictionQuerySchema = Joi.object({
  service: Joi.string().required(),
});

module.exports = {
  loadPredictionQuerySchema,
  incidentPredictionQuerySchema,
};
