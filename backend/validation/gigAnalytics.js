const Joi = require('joi');

const jobParamSchema = Joi.object({
  jobId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = { jobParamSchema };
