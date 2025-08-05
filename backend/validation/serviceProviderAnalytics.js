const Joi = require('joi');

const pricingUpdateSchema = Joi.object({
  price: Joi.number().positive().required(),
});

const availabilitySchema = Joi.object({
  date: Joi.date().iso().required(),
  slots: Joi.array()
    .items(Joi.object({ start: Joi.string().required(), end: Joi.string().required() }))
    .min(1)
    .required(),
});

const bookingSchema = Joi.object({
  providerId: Joi.string().required(),
  serviceId: Joi.string().required(),
  date: Joi.date().iso().required(),
});

const portfolioSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().max(1024).required(),
  mediaUrl: Joi.string().uri().optional(),
});

const testimonialSchema = Joi.object({
  providerId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1024).optional(),
});

const customizationSchema = Joi.object({
  details: Joi.string().max(2048).required(),
});

const chatInitSchema = Joi.object({
  providerId: Joi.string().required(),
  message: Joi.string().max(1024).required(),
});

module.exports = {
  pricingUpdateSchema,
  availabilitySchema,
  bookingSchema,
  portfolioSchema,
  testimonialSchema,
  customizationSchema,
  chatInitSchema,
};
