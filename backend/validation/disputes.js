const Joi = require('joi');

const disputeIdParamSchema = Joi.object({
  disputeId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const messageSchema = Joi.object({
  message: Joi.string().max(1000).required(),
});

module.exports = {
  disputeIdParamSchema,
  messageSchema,
};
