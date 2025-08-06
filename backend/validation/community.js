const Joi = require('joi');

const createDiscussionSchema = Joi.object({
  communityId: Joi.string().guid({ version: 'uuidv4' }).required(),
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().max(5000).required(),
  category: Joi.string().min(3).max(100).required(),
});

const listDiscussionQuerySchema = Joi.object({
  category: Joi.string().min(3).max(100).optional(),
  communityId: Joi.string().guid({ version: 'uuidv4' }).optional(),
});

const createCommentSchema = Joi.object({
  discussionId: Joi.string().guid({ version: 'uuidv4' }).required(),
  content: Joi.string().max(3000).required(),
  parentId: Joi.string().guid({ version: 'uuidv4' }).optional(),
});

const discussionIdParamSchema = Joi.object({
  discussionId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const commentIdParamSchema = Joi.object({
  commentId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  createDiscussionSchema,
  listDiscussionQuerySchema,
  createCommentSchema,
  discussionIdParamSchema,
  commentIdParamSchema,
};
