const Joi = require('joi');

const runMatchingSchema = Joi.object({
  userId: Joi.string().uuid().optional(),
});

const searchSchema = Joi.object({
  role: Joi.string().valid('mentor', 'mentee', 'startup', 'investor').optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  industry: Joi.string().max(100).optional(),
  location: Joi.string().max(100).optional(),
  fundingStage: Joi.string().max(50).optional(),
  expertise: Joi.string().max(100).optional(),
});

const inviteSchema = Joi.object({
  message: Joi.string().max(500).allow(null, '').optional(),
});

const trialSessionSchema = Joi.object({
  mentorId: Joi.string().uuid().required(),
  menteeId: Joi.string().uuid().required(),
  scheduledAt: Joi.date().iso().required(),
});

const respondSchema = Joi.object({
  status: Joi.string().valid('accepted', 'declined').required(),
});

module.exports = {
  runMatchingSchema,
  searchSchema,
  inviteSchema,
  trialSessionSchema,
  respondSchema,
};

