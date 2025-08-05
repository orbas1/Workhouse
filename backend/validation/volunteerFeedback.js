const Joi = require('joi');

const volunteerFeedbackSchema = Joi.object({
  volunteerId: Joi.string().required(),
  opportunityId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

const organizationFeedbackSchema = Joi.object({
  organizationId: Joi.string().required(),
  volunteerId: Joi.string().required(),
  opportunityId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('', null),
});

const opportunityIdParamSchema = Joi.object({
  opportunityId: Joi.string().required(),
});

module.exports = {
  volunteerFeedbackSchema,
  organizationFeedbackSchema,
  opportunityIdParamSchema,
};
