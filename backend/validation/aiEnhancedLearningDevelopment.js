const Joi = require('joi');

const learningOutcomeParamsSchema = Joi.object({
  courseId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const learningPathParamsSchema = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  learningOutcomeParamsSchema,
  learningPathParamsSchema,
};
