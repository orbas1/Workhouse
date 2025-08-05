const Joi = require('joi');

const classroomIdParamSchema = Joi.object({
  classroomId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  classroomIdParamSchema,
};

