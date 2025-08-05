const Joi = require('joi');

const trackProgressSchema = Joi.object({
  userId: Joi.string().required(),
  courseId: Joi.string().required(),
  activity: Joi.string().allow('', null),
  progress: Joi.number().min(0).max(100).required(),
  details: Joi.string().allow('', null),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const courseUserParamSchema = Joi.object({
  courseId: Joi.string().required(),
  userId: Joi.string().required(),
});

const learningGoalSchema = Joi.object({
  goal: Joi.string().max(500).required(),
  targetDate: Joi.date().optional(),
});

module.exports = {
  trackProgressSchema,
  userIdParamSchema,
  courseUserParamSchema,
  learningGoalSchema,
};
