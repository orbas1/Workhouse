const Joi = require('joi');

const agencyIdParamSchema = Joi.object({
  agencyId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  agencyIdParamSchema,
};
