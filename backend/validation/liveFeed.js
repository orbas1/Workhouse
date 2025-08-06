const Joi = require('joi');

const categories = [
  'employment',
  'freelancing',
  'education',
  'networking',
  'local',
  'general',
  'gig',
  'contract',
  'profile',
  'course',
  'webinar',
  'class',
  'podcast',
  'task',
  'tasks',
];

const postSchema = Joi.object({
  content: Joi.string().min(1).max(500).required(),
  category: Joi.string().valid(...categories).optional(),
});

const categoryQuerySchema = Joi.object({
  category: Joi.string().valid(...categories).optional(),
});

const postIdParamSchema = Joi.object({
  postId: Joi.string().required(),
});

const commentSchema = Joi.object({
  content: Joi.string().min(1).max(250).required(),
});

const reportSchema = Joi.object({
  reason: Joi.string().max(250).optional(),
});

module.exports = {
  postSchema,
  categoryQuerySchema,
  postIdParamSchema,
  commentSchema,
  reportSchema,
};
