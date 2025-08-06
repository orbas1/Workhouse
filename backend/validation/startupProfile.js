const Joi = require('joi');

const startupProfileSchema = Joi.object({
  businessName: Joi.string().required(),
  tagline: Joi.string().allow(''),
  category: Joi.string().allow(''),
  location: Joi.string().allow(''),
  goals: Joi.string().allow(''),
  logoUrl: Joi.string().uri().allow(''),
  pitchDeckUrl: Joi.string().uri().allow(''),
  introVideoUrl: Joi.string().uri().allow(''),
  fundingLinks: Joi.array().items(Joi.string().uri()).default([]),
  mentorshipNeeds: Joi.string().allow(''),
  businessPlanUrl: Joi.string().uri().allow(''),
  planVisibility: Joi.string().valid('public', 'private', 'invite').default('public'),
});

module.exports = { startupProfileSchema };
