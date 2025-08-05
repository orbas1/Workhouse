const Joi = require('joi');

const createEventSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  date: Joi.date().iso().required(),
  language: Joi.string().optional(),
  region: Joi.string().optional(),
  templateId: Joi.string().uuid().optional()
});

const updateEventSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('', null),
  date: Joi.date().iso().optional(),
  language: Joi.string().optional(),
  region: Joi.string().optional(),
  templateId: Joi.string().uuid().optional()
}).min(1);

const agendaSchema = Joi.object({
  rounds: Joi.number().integer().min(1).required(),
  breakMinutes: Joi.number().integer().min(0).required()
});

const paymentSchema = Joi.object({
  amount: Joi.number().precision(2).min(0).required(),
  currency: Joi.string().length(3).uppercase().required()
});

const feedbackSchema = Joi.object({
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow('', null)
});

module.exports = {
  createEventSchema,
  updateEventSchema,
  agendaSchema,
  paymentSchema,
  feedbackSchema
};
