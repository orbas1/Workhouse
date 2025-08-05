const Joi = require('joi');

const gigSearchSchema = Joi.object({
  q: Joi.string().allow('', null),
  category: Joi.string().max(50).allow('', null),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  minRating: Joi.number().min(0).max(5).optional(),
});

module.exports = { gigSearchSchema };
