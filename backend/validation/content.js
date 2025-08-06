const Joi = require('joi');

const baseFields = {
  type: Joi.string().valid('podcast', 'webinar').required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()).default([]),
  categories: Joi.array().items(Joi.string()).default([]),
  duration: Joi.number().integer().min(0),
  coverImage: Joi.string().uri().allow(null, ''),
  promoVideo: Joi.string().uri().allow(null, ''),
  audioUrl: Joi.string().uri().allow(null, ''),
  slidesUrl: Joi.string().uri().allow(null, ''),
  publishAt: Joi.date().iso().allow(null),
  visibility: Joi.string().valid('public', 'private').default('public'),
  price: Joi.number().min(0).default(0),
  status: Joi.string().valid('draft', 'published').default('draft'),
};

const createContentSchema = Joi.object(baseFields);

const updateContentSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().min(10),
  tags: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.string()),
  duration: Joi.number().integer().min(0),
  coverImage: Joi.string().uri().allow(null, ''),
  promoVideo: Joi.string().uri().allow(null, ''),
  audioUrl: Joi.string().uri().allow(null, ''),
  slidesUrl: Joi.string().uri().allow(null, ''),
  publishAt: Joi.date().iso().allow(null),
  visibility: Joi.string().valid('public', 'private'),
  price: Joi.number().min(0),
  status: Joi.string().valid('draft', 'published'),
});

module.exports = { createContentSchema, updateContentSchema };
