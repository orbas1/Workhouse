const Joi = require('joi');

const eventIdParamSchema = Joi.object({
  eventId: Joi.string().required(),
});

module.exports = {
  eventIdParamSchema,
};
