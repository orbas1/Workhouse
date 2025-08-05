const Joi = require('joi');

const courseIdParamSchema = Joi.object({
  courseId: Joi.string().required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const submitAssessmentSchema = Joi.object({
  userId: Joi.string().required(),
  responses: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().required(),
        answer: Joi.string().allow('', null),
      })
    )
    .min(1)
    .required(),
});

const autoGradeSchema = Joi.object({
  userId: Joi.string().required(),
});

const certificateIssueSchema = Joi.object({
  courseId: Joi.string().required(),
  title: Joi.string().max(255).required(),
});

const feedbackParamSchema = Joi.object({
  userId: Joi.string().required(),
  courseId: Joi.string().required(),
});

module.exports = {
  courseIdParamSchema,
  userIdParamSchema,
  submitAssessmentSchema,
  autoGradeSchema,
  certificateIssueSchema,
  feedbackParamSchema,
};

