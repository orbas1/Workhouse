const Joi = require('joi');

const availabilitySchema = Joi.object({
  from: Joi.date().required(),
  to: Joi.date().optional(),
  hoursPerWeek: Joi.number().integer().min(1).max(168).optional(),
});

const volunteerCreateSchema = Joi.object({
  skills: Joi.array().items(Joi.string()).min(1).required(),
  interests: Joi.array().items(Joi.string()).default([]),
  availability: availabilitySchema.required(),
});

const volunteerUpdateSchema = Joi.object({
  skills: Joi.array().items(Joi.string()).optional(),
  interests: Joi.array().items(Joi.string()).optional(),
  availability: availabilitySchema.optional(),
}).min(1);

module.exports = {
  volunteerCreateSchema,
  volunteerUpdateSchema,
};
