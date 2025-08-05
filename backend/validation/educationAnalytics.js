const Joi = require('joi');

const courseIdParam = Joi.object({
  courseId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const userIdParam = Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = { courseIdParam, userIdParam };
