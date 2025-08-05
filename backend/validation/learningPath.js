const Joi = require('joi');

const pathIdParamSchema = Joi.object({
  pathId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const createPathSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  courses: Joi.array().items(Joi.string()).default([]),
});

const updatePathSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().max(1000),
  courses: Joi.array().items(Joi.string()),
  rating: Joi.number().integer().min(0).max(5),
}).min(1);

const sharePathSchema = Joi.object({
  recipientId: Joi.string().required(),
  message: Joi.string().max(500).optional(),
});

module.exports = {
  pathIdParamSchema,
  userIdParamSchema,
  createPathSchema,
  updatePathSchema,
  sharePathSchema,
};
