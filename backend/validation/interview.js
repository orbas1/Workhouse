const Joi = require('joi');

const scheduleInterviewSchema = Joi.object({
  applicationId: Joi.string().uuid().required(),
  applicantId: Joi.string().uuid().required(),
  interviewDate: Joi.date().iso().required(),
});

const interviewIdParamSchema = Joi.object({
  interviewId: Joi.string().uuid().required(),
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('scheduled', 'completed', 'cancelled').required(),
});

module.exports = {
  scheduleInterviewSchema,
  interviewIdParamSchema,
  statusUpdateSchema,
};
