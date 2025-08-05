const Joi = require('joi');

const engagementScoresQuerySchema = Joi.object({
  communityId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const questionAnsweringSchema = Joi.object({
  communityId: Joi.string().guid({ version: 'uuidv4' }).required(),
  question: Joi.string().min(3).max(1000).required(),
});

module.exports = {
  engagementScoresQuerySchema,
  questionAnsweringSchema,
};
