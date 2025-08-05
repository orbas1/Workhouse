const Joi = require('joi');

const episodeIdParamSchema = Joi.object({
  episodeId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const podcastIdParamSchema = Joi.object({
  podcastId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const seriesIdParamSchema = Joi.object({
  seriesId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const dateRangeSchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
});

module.exports = {
  episodeIdParamSchema,
  podcastIdParamSchema,
  seriesIdParamSchema,
  dateRangeSchema,
};
