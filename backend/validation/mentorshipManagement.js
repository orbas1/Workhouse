const Joi = require('joi');

const createInitiativeSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(2000).allow('').optional(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional(),
});

module.exports = {
  createInitiativeSchema,
};
