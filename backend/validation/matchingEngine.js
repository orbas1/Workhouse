const Joi = require('joi');

const runMatchingSchema = Joi.object({
  userId: Joi.string().uuid().optional(),
});

const searchSchema = Joi.object({
  role: Joi.string().valid('mentor', 'mentee').optional(),
  skills: Joi.array().items(Joi.string()).optional(),
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

