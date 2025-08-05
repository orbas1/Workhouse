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
  fullName: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
});

const menteeProfileSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  bio: Joi.string().allow('').optional(),
  goals: Joi.string().required(),
  interests: Joi.array().items(Joi.string()).optional(),
  preferences: Joi.object().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  fullName: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
});

const updateProfileSchema = Joi.object({
  bio: Joi.string(),
  preferences: Joi.object(),
  skills: Joi.array().items(Joi.string()),
  fullName: Joi.string(),
  title: Joi.string(),
  location: Joi.string(),
  avatarUrl: Joi.string().uri(),
}).min(1);

const portfolioItemSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().optional(),
  link: Joi.string().uri().optional(),
});

const skillsSchema = Joi.object({
  skills: Joi.array().items(Joi.string().min(1)).min(1).required(),
});

// Stage 82 Investor-Entrepreneur Profile Schemas
const profileIdParamSchema = Joi.object({
  profileId: Joi.string().uuid().required(),
});

const createProfileSchema = Joi.object({
  bio: Joi.string().allow('').optional(),
  fullName: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
  geographicPreferences: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().optional(),
  }).optional(),
});

const updateInvestorProfileSchema = Joi.object({
  bio: Joi.string().optional(),
  fullName: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
  geographicPreferences: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().optional(),
  }).optional(),
}).min(1);

const continuousVerificationSchema = Joi.object({
  enabled: Joi.boolean().required(),
});

const geographicPreferenceSchema = Joi.object({
  country: Joi.string().required(),
  city: Joi.string().optional(),
});

module.exports = {
  userIdParamSchema,
  mentorProfileSchema,
  menteeProfileSchema,
  updateProfileSchema,
  portfolioItemSchema,
  skillsSchema,
  profileIdParamSchema,
  createProfileSchema,
  updateInvestorProfileSchema,
  continuousVerificationSchema,
  geographicPreferenceSchema,
};
