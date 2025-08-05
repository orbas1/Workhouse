const Joi = require('joi');

const serviceRequestSchema = Joi.object({
  serviceId: Joi.string().required(),
  description: Joi.string().max(1000).optional(),
});

const resourceTypeParamSchema = Joi.object({
  resourceType: Joi.string().required(),
});

const regionParamSchema = Joi.object({
  region: Joi.string().required(),
});

const fundingSubscribeSchema = Joi.object({
  profileId: Joi.string().required(),
  preferences: Joi.array().items(Joi.string()).default([]),
});

const profileIdParamSchema = Joi.object({
  profileId: Joi.string().required(),
});

const mentorshipApplicationSchema = Joi.object({
  applicantId: Joi.string().required(),
  mentorId: Joi.string().required(),
  message: Joi.string().max(1000).optional(),
});

module.exports = {
  serviceRequestSchema,
  resourceTypeParamSchema,
  regionParamSchema,
  fundingSubscribeSchema,
  profileIdParamSchema,
  mentorshipApplicationSchema,
};
