const Joi = require('joi');

// Schema for submitting session feedback
const sessionFeedbackSchema = Joi.object({
  mentorId: Joi.number().integer().required(),
  menteeId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comments: Joi.string().allow('', null),
});

// Schema for adding detailed session feedback
const sessionDetailSchema = Joi.object({
  detail: Joi.string().min(1).required(),
  submittedBy: Joi.string().required(),
});

// Schema for mentor rewards
const mentorRewardSchema = Joi.object({
  points: Joi.number().integer().min(1).required(),
  note: Joi.string().allow('', null),
});

// Schema for mentee goal progress reports
const goalProgressSchema = Joi.object({
  goal: Joi.string().required(),
  progress: Joi.string().required(),
});

// Parameter validation schemas
const sessionIdParam = Joi.object({
  sessionId: Joi.number().integer().required(),
});

const menteeIdParam = Joi.object({
  menteeId: Joi.number().integer().required(),
});

const mentorIdParam = Joi.object({
  mentorId: Joi.number().integer().required(),
});

const userIdParam = Joi.object({
  userId: Joi.number().integer().required(),
});

module.exports = {
  sessionFeedbackSchema,
  sessionDetailSchema,
  mentorRewardSchema,
  goalProgressSchema,
  sessionIdParam,
  menteeIdParam,
  mentorIdParam,
  userIdParam,
};
