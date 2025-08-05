const Joi = require('joi');

const pathIdParamSchema = Joi.object({
  pathId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const projectIdParamSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

const projectSubmissionSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  link: Joi.string().uri().optional(),
});

const collaborativeProjectSchema = projectSubmissionSchema.keys({
  collaborators: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = {
  pathIdParamSchema,
  projectIdParamSchema,
  userIdParamSchema,
  projectSubmissionSchema,
  collaborativeProjectSchema,
};
