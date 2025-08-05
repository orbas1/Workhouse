const Joi = require('joi');

const recordSchema = Joi.object({
  eventId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('debit', 'credit').required(),
  description: Joi.string().max(255).optional(),
});

const refundSchema = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  reason: Joi.string().max(255).optional(),
});

module.exports = {
  recordSchema,
  refundSchema,
};
