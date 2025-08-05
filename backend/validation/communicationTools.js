const Joi = require('joi');

const videoStartSchema = Joi.object({
  participants: Joi.array().items(Joi.string()).min(1).required(),
  language: Joi.string().default('en'),
});

const contactExchangeSchema = Joi.object({
  userId: Joi.string().required(),
  contactInfo: Joi.string().required(),
});

const languageRoomSchema = Joi.object({
  language: Joi.string().required(),
});

const translateSchema = Joi.object({
  message: Joi.string().required(),
  targetLanguage: Joi.string().required(),
});

module.exports = {
  videoStartSchema,
  contactExchangeSchema,
  languageRoomSchema,
  translateSchema,
};
