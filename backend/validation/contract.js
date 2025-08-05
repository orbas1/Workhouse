const Joi = require('joi');

const createContractSchema = Joi.object({
  clientId: Joi.string().required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  budget: Joi.number().precision(2).positive().optional(),
  timeline: Joi.string().max(255).optional(),
});

const updateContractSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().max(1000),
  budget: Joi.number().precision(2).positive(),
  timeline: Joi.string().max(255),
  status: Joi.string().valid('open', 'active', 'terminated', 'completed'),
}).min(1);

const submitWorkSchema = Joi.object({
  freelancerId: Joi.string().required(),
  workUrl: Joi.string().uri().required(),
  notes: Joi.string().allow('').optional(),
});

const approveWorkSchema = Joi.object({
  submissionId: Joi.string().required(),
});

const terminateContractSchema = Joi.object({
  reason: Joi.string().min(3).max(500).required(),
});

const submitInvoiceSchema = Joi.object({
  freelancerId: Joi.string().required(),
  amount: Joi.number().precision(2).positive().required(),
  description: Joi.string().allow('').optional(),
});

module.exports = {
  createContractSchema,
  updateContractSchema,
  submitWorkSchema,
  approveWorkSchema,
  terminateContractSchema,
  submitInvoiceSchema,
};

