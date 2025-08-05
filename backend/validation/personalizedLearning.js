const Joi = require('joi');

const adaptiveContentParamsSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

const assessmentEvaluationSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  assessmentId: Joi.string().required(),
  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().required(),
        correctAnswer: Joi.any().required(),
        userAnswer: Joi.any().required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = {
  adaptiveContentParamsSchema,
  assessmentEvaluationSchema,
};
