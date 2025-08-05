const Joi = require('joi');

const bookSessionSchema = Joi.object({
  sessionDate: Joi.date().iso().required(),
});

const adviceRequestSchema = Joi.object({
  topic: Joi.string().min(3).max(255).required(),
  details: Joi.string().max(2000).allow('').optional(),
});

const projectFeedbackSchema = Joi.object({
  expertId: Joi.string().guid({ version: 'uuidv4' }).required(),
  notes: Joi.string().max(2000).allow('').optional(),
});

module.exports = {
  bookSessionSchema,
  adviceRequestSchema,
  projectFeedbackSchema,
};
