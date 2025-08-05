const Joi = require('joi');

const groupIdParamSchema = Joi.object({
  groupId: Joi.string().required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const postSchema = Joi.object({
  content: Joi.string().max(1000).required(),
});

const liveStudySchema = Joi.object({
  topic: Joi.string().max(255).required(),
  scheduledFor: Joi.date().iso().required(),
  description: Joi.string().max(1000).allow(null, ''),
});

const mentorshipApplicationSchema = Joi.object({
  message: Joi.string().max(500).allow('', null),
});

module.exports = {
  groupIdParamSchema,
  userIdParamSchema,
  postSchema,
  liveStudySchema,
  mentorshipApplicationSchema,
};
