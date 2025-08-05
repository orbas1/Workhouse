const Joi = require('joi');

const createGroupSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).allow('', null),
  members: Joi.array().items(Joi.string()).default([]),
});

const groupIdParamSchema = Joi.object({
  groupId: Joi.string().required(),
});

const addMemberSchema = Joi.object({
  memberId: Joi.string().required(),
});

const groupMemberParamsSchema = Joi.object({
  groupId: Joi.string().required(),
  memberId: Joi.string().required(),
});

module.exports = {
  createGroupSchema,
  groupIdParamSchema,
  addMemberSchema,
  groupMemberParamsSchema,
};
