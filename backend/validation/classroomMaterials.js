const Joi = require('joi');

const classroomIdParamSchema = Joi.object({
  classroomId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const materialSchema = Joi.object({
  type: Joi.string().valid('ppt', 'video', 'storage').required(),
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
});

module.exports = { classroomIdParamSchema, materialSchema };
