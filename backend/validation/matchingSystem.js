const Joi = require('joi');

const runMatchingSchema = Joi.object({
  participants: Joi.array().items(Joi.string().uuid()).min(2).required(),
});

const setPreferencesSchema = Joi.object({
  interests: Joi.array().items(Joi.string()).default([]),
  goals: Joi.array().items(Joi.string()).default([]),
  availability: Joi.string().optional(),
});

const feedbackSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comments: Joi.string().max(1000).allow('', null),
});

module.exports = {
  runMatchingSchema,
  setPreferencesSchema,
  feedbackSchema,
};

