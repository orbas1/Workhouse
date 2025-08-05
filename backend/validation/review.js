const Joi = require('joi');

const profileIdParamSchema = Joi.object({
  profileId: Joi.string().uuid().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

const reviewIdParamSchema = Joi.object({
  reviewId: Joi.string().uuid().required(),
});

const responseSchema = Joi.object({
  response: Joi.string().max(1000).required(),
});

const disputeSchema = Joi.object({
  reason: Joi.string().max(1000).required(),
});

module.exports = {
  profileIdParamSchema,
  reviewSchema,
  reviewIdParamSchema,
  responseSchema,
  disputeSchema,
};
