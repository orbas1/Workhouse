const Joi = require('joi');

const scheduleInterviewSchema = Joi.object({
  interviewerId: Joi.number().required(),
  candidateId: Joi.number().required(),
  scheduledFor: Joi.date().iso().required(),
});

const noteSchema = Joi.object({
  text: Joi.string().max(1000).required(),
});

module.exports = {
  scheduleInterviewSchema,
  noteSchema,
};
