const Joi = require('joi');

const fraudDetectionQuerySchema = Joi.object({
  userId: Joi.string().optional(),
  transactionId: Joi.string().optional(),
});

const privacyComplianceQuerySchema = Joi.object({
  region: Joi.string().optional(),
});

module.exports = {
  fraudDetectionQuerySchema,
  privacyComplianceQuerySchema,
};

