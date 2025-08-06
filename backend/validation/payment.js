const Joi = require('joi');

const paymentItem = Joi.object({
  employeeId: Joi.string().required(),
  jobId: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

const distributeSchema = Joi.object({
  payments: Joi.array().items(paymentItem).min(1).required(),
});

const adjustSchema = Joi.object({
  paymentId: Joi.string().required(),
  newAmount: Joi.number().positive().required(),
  reason: Joi.string().max(255).optional(),
});

const initiateSchema = Joi.object({
  amount: Joi.number().positive().required(),
  method: Joi.string().valid('card', 'bank').required(),
});

module.exports = {
  distributeSchema,
  adjustSchema,
  initiateSchema,
};
