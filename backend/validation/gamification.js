const Joi = require('joi');

const courseIdParamSchema = Joi.object({
  courseId: Joi.string().required(),
});

const claimRewardSchema = Joi.object({
  userId: Joi.string().required(),
  rewardId: Joi.string().required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const earnBadgeSchema = Joi.object({
  badgeId: Joi.string().required(),
});

module.exports = {
  courseIdParamSchema,
  claimRewardSchema,
  userIdParamSchema,
  earnBadgeSchema,
};
