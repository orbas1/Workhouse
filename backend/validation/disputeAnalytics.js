const Joi = require('joi');

const categoryQuerySchema = Joi.object({
  category: Joi.string().min(2).max(50).optional(),
});

const disputeIdParamSchema = Joi.object({
  disputeId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  categoryQuerySchema,
  disputeIdParamSchema,
};
