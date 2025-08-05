const Joi = require('joi');

const scheduleSessionSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(1000).optional(),
  scheduledAt: Joi.date().iso().required(),
});

const attendanceSchema = Joi.object({
  userId: Joi.string().required(),
});

module.exports = {
  scheduleSessionSchema,
  attendanceSchema,
};
