const Joi = require('joi');

const successStorySchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const storyIdParamSchema = Joi.object({
  storyId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  successStorySchema,
  storyIdParamSchema,
};
