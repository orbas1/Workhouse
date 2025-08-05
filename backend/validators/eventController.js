const Joi = require('joi');

const baseEventSchema = {
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  date: Joi.date().iso().required(),
};

const pitchEventSchema = Joi.object(baseEventSchema);
const networkingEventSchema = Joi.object(baseEventSchema);
const workshopEventSchema = Joi.object(baseEventSchema);

const livestreamSchema = Joi.object({
  streamUrl: Joi.string().uri().required(),
});

const questionSchema = Joi.object({
  question: Joi.string().min(1).required(),
});

module.exports = {
  pitchEventSchema,
  networkingEventSchema,
  workshopEventSchema,
  livestreamSchema,
  questionSchema,
};
