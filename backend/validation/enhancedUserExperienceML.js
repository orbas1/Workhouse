const Joi = require('joi');

const recommendationSchema = Joi.object({
  userId: Joi.string().required(),
  preferences: Joi.object({
    interests: Joi.array().items(Joi.string()).optional(),
  }).optional(),
});

module.exports = {
  recommendationSchema,
};

