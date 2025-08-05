const Joi = require('joi');

const matchRequestSchema = Joi.object({
  jobs: Joi.array().items(Joi.string().uuid()).optional(),
  criteria: Joi.object({
    skillsWeight: Joi.number().min(0).max(1),
    availabilityWeight: Joi.number().min(0).max(1),
    performanceWeight: Joi.number().min(0).max(1),
  }).optional(),
});

module.exports = {
  matchRequestSchema,
};
