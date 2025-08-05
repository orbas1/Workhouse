const Joi = require('joi');

const goalIdParamSchema = Joi.object({
  goalId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const milestoneIdParamSchema = Joi.object({
  milestoneId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const createGoalSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  dueDate: Joi.date().iso().optional(),
});

const updateGoalSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().max(1000),
  dueDate: Joi.date().iso(),
  status: Joi.string().valid('pending', 'in_progress', 'completed', 'archived'),
}).min(1);

const createMilestoneSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  dueDate: Joi.date().iso().optional(),
});

const updateMilestoneSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().max(1000),
  dueDate: Joi.date().iso(),
  status: Joi.string().valid('pending', 'in_progress', 'completed', 'archived'),
}).min(1);

const shareGoalSchema = Joi.object({
  recipientId: Joi.string().required(),
  message: Joi.string().max(500).optional(),
});

module.exports = {
  goalIdParamSchema,
  milestoneIdParamSchema,
  userIdParamSchema,
  createGoalSchema,
  updateGoalSchema,
  createMilestoneSchema,
  updateMilestoneSchema,
  shareGoalSchema,
};
