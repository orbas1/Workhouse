const Joi = require('joi');

const scheduleSessionSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(1000).optional(),
  scheduledAt: Joi.date().iso().required(),
});

const attendanceSchema = Joi.object({
  userId: Joi.string().required(),
});

const resourceQuerySchema = Joi.object({
  tags: Joi.string().optional(), // comma-separated list of tags
});

const resourceReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).optional(),
});

const completionSchema = Joi.object({
  resourceId: Joi.string().required(),
  certificationName: Joi.string().max(255).required(),
  provider: Joi.string().max(255).optional(),
  externalId: Joi.string().max(255).optional(),
});

module.exports = {
  scheduleSessionSchema,
  attendanceSchema,
  resourceQuerySchema,
  resourceReviewSchema,
  completionSchema,
};
