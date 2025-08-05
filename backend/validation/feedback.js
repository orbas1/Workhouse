const Joi = require('joi');

const clientFeedbackSchema = Joi.object({
  agencyId: Joi.string().required(),
  clientId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

const employeeFeedbackSchema = Joi.object({
  agencyId: Joi.string().required(),
  employeeId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

module.exports = {
  clientFeedbackSchema,
  employeeFeedbackSchema,
};
