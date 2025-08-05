const Joi = require('joi');

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const skillIdParamSchema = Joi.object({
  skillId: Joi.string().required(),
});

const achievementSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().allow('', null),
  achievedAt: Joi.date().optional(),
});

const customAlertSchema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().max(255).required(),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').required(),
});

const skillSchema = Joi.object({
  name: Joi.string().max(100).required(),
  level: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
});

const skillUpdateSchema = Joi.object({
  name: Joi.string().max(100),
  level: Joi.string().valid('beginner', 'intermediate', 'advanced'),
}).min(1);

module.exports = {
  userIdParamSchema,
  skillIdParamSchema,
  achievementSchema,
  customAlertSchema,
  skillSchema,
  skillUpdateSchema,
};
