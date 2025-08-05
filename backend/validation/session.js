const Joi = require('joi');

const scheduleSessionSchema = Joi.object({
  mentorId: Joi.number().integer().required(),
  menteeId: Joi.number().integer().required(),
  scheduledFor: Joi.date().iso().required(),
});

const agendaSchema = Joi.object({
  agenda: Joi.string().min(1).required(),
});

const noteSchema = Joi.object({
  note: Joi.string().min(1).required(),
});

const rescheduleSchema = Joi.object({
  newTime: Joi.date().iso().required(),
});

const materialsRequestSchema = Joi.object({
  materials: Joi.array().items(Joi.string().min(1)).min(1).required(),
});

module.exports = {
  scheduleSessionSchema,
  agendaSchema,
  noteSchema,
  rescheduleSchema,
  materialsRequestSchema,
};
