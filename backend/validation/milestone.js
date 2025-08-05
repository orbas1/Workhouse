const Joi = require('joi');

const pathIdParamSchema = Joi.object({
  pathId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const milestoneIdParamSchema = Joi.object({
  milestoneId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const createMilestoneSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  dueDate: Joi.date().iso().optional(),
});

const rewardSchema = Joi.object({
  reward: Joi.string().min(1).max(255).required(),
});

module.exports = {
  pathIdParamSchema,
  milestoneIdParamSchema,
  userIdParamSchema,
  createMilestoneSchema,
  rewardSchema,
};
