const Joi = require('joi');

const scheduleInterviewSchema = Joi.object({
  candidateEmail: Joi.string().email().required(),
  scheduledFor: Joi.date().iso().required(),
});

const interviewIdParamSchema = Joi.object({
  interviewId: Joi.string().uuid().required(),
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('scheduled', 'completed', 'cancelled').required(),
});

const noteSchema = Joi.object({
  text: Joi.string().max(1000).required(),
});

module.exports = {
  scheduleInterviewSchema,
  interviewIdParamSchema,
  statusUpdateSchema,
  noteSchema,
};
