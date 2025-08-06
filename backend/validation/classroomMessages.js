const Joi = require('joi');

const classroomIdParamSchema = Joi.object({
  classroomId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const messageSchema = Joi.object({
  userId: Joi.string().required(),
  content: Joi.string().min(1).max(1000).required(),
});

module.exports = { classroomIdParamSchema, messageSchema };
