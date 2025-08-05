const Joi = require('joi');

const gigSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().max(50).required(),
  tags: Joi.array().items(Joi.string().max(30)).default([]),
  price: Joi.number().positive().required(),
  status: Joi.string().valid('active', 'paused', 'inactive').default('active'),
});

module.exports = { gigSchema };
