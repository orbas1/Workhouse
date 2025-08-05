const Joi = require('joi');

const agencyIdParamSchema = Joi.object({
  agencyId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const analyticsQuerySchema = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
}).with('startDate', 'endDate').with('endDate', 'startDate');

const anomalySchema = Joi.object({
  metrics: Joi.array().items(Joi.number()).min(1).required(),
  threshold: Joi.number().positive().default(2),
});

const feedbackSchema = Joi.object({
  contentId: Joi.string().guid({ version: 'uuidv4' }).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow('').max(1000),
});

const pathIdParamSchema = Joi.object({
  pathId: Joi.string().required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

module.exports = {
  agencyIdParamSchema,
  analyticsQuerySchema,
  anomalySchema,
  feedbackSchema,
  pathIdParamSchema,
  userIdParamSchema,
};

