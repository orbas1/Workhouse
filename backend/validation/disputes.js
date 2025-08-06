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
const createDisputeSchema = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().allow(''),
  resolutionRequest: Joi.string().allow(''),
  disputeeId: Joi.string().required(),
  attachments: Joi.array().items(Joi.string()).default([])
});

const respondDisputeSchema = Joi.object({
  counterArgument: Joi.string().required(),
  resolution: Joi.string().valid('accept','reject','modify').required(),
  attachments: Joi.array().items(Joi.string()).default([])
});

const disputeIdParamSchema = Joi.object({
  disputeId: Joi.string().required()
});

module.exports = {
  createDisputeSchema,
  respondDisputeSchema,
  disputeIdParamSchema,
};
