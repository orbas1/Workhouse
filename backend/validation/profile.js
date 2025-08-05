const Joi = require('joi');

const userIdParamSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

const mentorProfileSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  bio: Joi.string().allow('').optional(),
  expertise: Joi.string().required(),
  yearsExperience: Joi.number().integer().min(0).required(),
  preferences: Joi.object().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
});

const menteeProfileSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  bio: Joi.string().allow('').optional(),
  goals: Joi.string().required(),
  interests: Joi.array().items(Joi.string()).optional(),
  preferences: Joi.object().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
});

const updateProfileSchema = Joi.object({
  bio: Joi.string(),
  preferences: Joi.object(),
  skills: Joi.array().items(Joi.string()),
}).min(1);

const portfolioItemSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().optional(),
  link: Joi.string().uri().optional(),
});

const skillsSchema = Joi.object({
  skills: Joi.array().items(Joi.string().min(1)).min(1).required(),
});

module.exports = {
  userIdParamSchema,
  mentorProfileSchema,
  menteeProfileSchema,
  updateProfileSchema,
  portfolioItemSchema,
  skillsSchema,
};
