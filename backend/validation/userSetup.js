const Joi = require('joi');

const userIdParamSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

const financialMediaSchema = Joi.object({
  paymentMethod: Joi.string().creditCard().required(),
  taxId: Joi.string().optional(),
  vatNumber: Joi.string().optional(),
  profilePicture: Joi.string().base64().optional(),
  bio: Joi.string().allow('').max(250).optional(),
  introVideo: Joi.string().base64().optional(),
  portfolioLinks: Joi.array().items(Joi.string().uri()).optional(),
  title: Joi.string().max(100).optional(),
}).min(1);

module.exports = {
  userIdParamSchema,
  financialMediaSchema,
};
