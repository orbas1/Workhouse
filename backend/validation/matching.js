const Joi = require('joi');

const uuid = Joi.string().uuid();

const findMatchesSchema = Joi.object({
  investorId: uuid.required(),
  entrepreneurId: uuid.required(),
  stage: Joi.string().required(),
  score: Joi.number().min(0).max(1).optional(),
});

const preferencesSchema = Joi.object({
  industries: Joi.array().items(Joi.string()).optional(),
  stages: Joi.array().items(Joi.string()).optional(),
  minInvestment: Joi.number().integer().min(0).optional(),
  maxInvestment: Joi.number().integer().min(0).optional(),
}).min(1);

const feedbackSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comments: Joi.string().allow('', null),
});

const profileIdParamSchema = Joi.object({
  profileId: uuid.required(),
});

const matchIdParamSchema = Joi.object({
  matchId: uuid.required(),
});

const stageParamSchema = Joi.object({
  stage: Joi.string().required(),
});

module.exports = {
  findMatchesSchema,
  preferencesSchema,
  feedbackSchema,
  profileIdParamSchema,
  matchIdParamSchema,
  stageParamSchema,
};
