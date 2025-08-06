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

const visibilitySchema = Joi.object({
  portfolio: Joi.boolean(),
  reviews: Joi.boolean(),
  activity: Joi.boolean(),
});

const themeSchema = Joi.object({
  color: Joi.string(),
  bannerUrl: Joi.string().uri().allow(''),
  font: Joi.string(),
});

const contactSchema = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string(),
  title: Joi.string(),
  bio: Joi.string(),
  contact: contactSchema,
  preferences: Joi.object(),
  skills: Joi.array().items(Joi.string()),
  visibility: visibilitySchema,
  theme: themeSchema,
  fullName: Joi.string(),
  location: Joi.string(),
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
  name: Joi.string().optional(),
  title: Joi.string().optional(),
  bio: Joi.string().allow('').optional(),
  contact: contactSchema.optional(),
  fullName: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
  geographicPreferences: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().optional(),
  }).optional(),
  visibility: visibilitySchema.optional(),
  theme: themeSchema.optional(),
});

const updateInvestorProfileSchema = Joi.object({
  name: Joi.string().optional(),
  title: Joi.string().optional(),
  bio: Joi.string().optional(),
  contact: contactSchema.optional(),
  fullName: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
  geographicPreferences: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().optional(),
  }).optional(),
  visibility: visibilitySchema.optional(),
  theme: themeSchema.optional(),
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
