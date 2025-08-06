const Joi = require('joi');

const searchFreelancersSchema = Joi.object({
  query: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  minRate: Joi.number().min(0).optional(),
  maxRate: Joi.number().min(0).optional(),
  minExperience: Joi.number().min(0).optional(),
});

module.exports = { searchFreelancersSchema };
