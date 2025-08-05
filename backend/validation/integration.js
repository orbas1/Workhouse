const Joi = require('joi');

const lmsSchema = Joi.object({
  courseId: Joi.string().required(),
  progress: Joi.number().min(0).max(100).required(),
  description: Joi.string().max(500).optional(),
  completedAt: Joi.date().iso().optional(),
});

const mentorshipSchema = Joi.object({
  mentorId: Joi.string().required(),
  feedback: Joi.string().min(3).max(1000).required(),
  rating: Joi.number().integer().min(1).max(5).optional(),
  date: Joi.date().iso().optional(),
});

const jobApplicationSchema = Joi.object({
  company: Joi.string().required(),
  position: Joi.string().required(),
  status: Joi.string()
    .valid('applied', 'interview', 'offer', 'hired', 'rejected')
    .required(),
  appliedAt: Joi.date().iso().optional(),
});

const projectSchema = Joi.object({
  projectId: Joi.string().required(),
  title: Joi.string().required(),
  completedAt: Joi.date().iso().required(),
});

const certificationSchema = Joi.object({
  name: Joi.string().required(),
  institution: Joi.string().required(),
  obtainedAt: Joi.date().iso().required(),
});

module.exports = {
  lmsSchema,
  mentorshipSchema,
  jobApplicationSchema,
  projectSchema,
  certificationSchema,
};
