const Joi = require('joi');

const goalIdParamSchema = Joi.object({
  goalId: Joi.string().required(),
});

const goalFeedbackSchema = Joi.object({
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

const goalAdjustmentSchema = Joi.object({
  adjustment: Joi.string().max(1000).required(),
});

const moduleFeedbackSchema = Joi.object({
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

module.exports = {
  goalIdParamSchema,
  goalFeedbackSchema,
  goalAdjustmentSchema,
  moduleFeedbackSchema,
};
