const Joi = require('joi');

const createCourseSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('', null),
  categoryId: Joi.string().uuid().required(),
  instructorId: Joi.string().uuid().required(),
  type: Joi.string().valid('course', 'workshop', 'skillLab').required(),
});

const updateCourseSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  description: Joi.string().allow('', null),
  categoryId: Joi.string().uuid(),
  instructorId: Joi.string().uuid(),
  type: Joi.string().valid('course', 'workshop', 'skillLab'),
}).min(1);

const feedbackSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow('', null),
});

const courseIdParamSchema = Joi.object({
  courseId: Joi.string().uuid().required(),
});

const categoryIdParamSchema = Joi.object({
  categoryId: Joi.string().uuid().required(),
});

const instructorIdParamSchema = Joi.object({
  instructorId: Joi.string().uuid().required(),
});

const moduleSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  content: Joi.string().allow('', null),
});

const moduleIdParamSchema = Joi.object({
  moduleId: Joi.string().uuid().required(),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
  feedbackSchema,
  courseIdParamSchema,
  categoryIdParamSchema,
  instructorIdParamSchema,
  moduleSchema,
  moduleIdParamSchema,
};
