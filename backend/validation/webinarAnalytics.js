const Joi = require('joi');

const webinarIdParamSchema = Joi.object({
  webinarId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const behaviorAnalysisSchema = Joi.object({
  data: Joi.array().items(Joi.object()).min(1).required(),
});

const behaviorPredictionSchema = Joi.object({
  history: Joi.array().items(Joi.object()).min(1).required(),
});

const behaviorSegmentationSchema = Joi.object({
  attributes: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = {
  webinarIdParamSchema,
  userIdParamSchema,
  behaviorAnalysisSchema,
  behaviorPredictionSchema,
  behaviorSegmentationSchema,
};
