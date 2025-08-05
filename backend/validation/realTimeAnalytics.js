const Joi = require('joi');

const domainParamSchema = Joi.object({
  domain: Joi.string().min(1).required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const contentTypeParamSchema = Joi.object({
  contentType: Joi.string().min(1).required(),
});

const courseIdParamSchema = Joi.object({
  courseId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const reportIdParamSchema = Joi.object({
  reportId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const customReportSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  parameters: Joi.object().min(1).required(),
});

module.exports = {
  domainParamSchema,
  userIdParamSchema,
  contentTypeParamSchema,
  courseIdParamSchema,
  reportIdParamSchema,
  customReportSchema,
};
