const Joi = require('joi');

const userIdParamSchema = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const dateRangeQuerySchema = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
}).with('startDate', 'endDate');

const behaviorPatternAnalysisSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
});

const behaviorPredictionSchema = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
  timeframe: Joi.string().valid('7d', '30d', '90d').required(),
});

const behaviorSegmentationSchema = Joi.object({
  segmentBy: Joi.string().valid('behavior', 'demographics', 'activity').required(),
  thresholds: Joi.object().optional(),
});

module.exports = {
  userIdParamSchema,
  dateRangeQuerySchema,
  behaviorPatternAnalysisSchema,
  behaviorPredictionSchema,
  behaviorSegmentationSchema,
};

