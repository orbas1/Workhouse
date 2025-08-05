const Joi = require('joi');

const forecastSchema = Joi.object({
  months: Joi.number().integer().min(1).max(60).required(),
  projectedContracts: Joi.array()
    .items(Joi.object({ value: Joi.number().positive().required() }))
    .default([]),
  projectedExpenses: Joi.array()
    .items(Joi.object({ amount: Joi.number().positive().required() }))
    .default([]),
});

module.exports = { forecastSchema };
