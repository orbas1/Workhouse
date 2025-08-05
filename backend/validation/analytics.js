const Joi = require('joi');

const anomalySchema = Joi.object({
  metrics: Joi.array().items(Joi.number()).min(1).required(),
  threshold: Joi.number().positive().default(2),
});

const feedbackSchema = Joi.object({
  contentId: Joi.string().guid({ version: 'uuidv4' }).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow('').max(1000),
});

module.exports = {
  anomalySchema,
  feedbackSchema,
};
