const Joi = require('joi');

const milestoneSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  dueDate: Joi.date().iso().required(),
  amount: Joi.number().precision(2).positive().required(),
});

const deliverableSchema = Joi.object({
  description: Joi.string().max(1000).required(),
});

const createContractSchema = Joi.object({
  clientId: Joi.string().required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  paymentType: Joi.string().valid('fixed', 'hourly').required(),
  budget: Joi.number().precision(2).positive().optional(),
  hourlyRate: Joi.number().precision(2).positive().optional(),
  expectedHours: Joi.number().precision(2).positive().optional(),
  timeline: Joi.string().max(255).optional(),
  milestones: Joi.array().items(milestoneSchema).optional(),
  deliverables: Joi.array().items(deliverableSchema).optional(),
});

const updateContractSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().max(1000),
  paymentType: Joi.string().valid('fixed', 'hourly'),
  budget: Joi.number().precision(2).positive(),
  hourlyRate: Joi.number().precision(2).positive(),
  expectedHours: Joi.number().precision(2).positive(),
  timeline: Joi.string().max(255),
  milestones: Joi.array().items(milestoneSchema),
  deliverables: Joi.array().items(deliverableSchema),
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

