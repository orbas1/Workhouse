const Joi = require('joi');

const notificationSchema = Joi.object({
  jobUpdates: Joi.boolean(),
  messages: Joi.boolean(),
});

const updateSettingsSchema = Joi.object({
  fullName: Joi.string().allow(''),
  email: Joi.string().email(),
  phone: Joi.string().allow(''),
  profileVisibility: Joi.string().valid('public', 'private', 'restricted'),
  language: Joi.string().allow(''),
  region: Joi.string().allow(''),
  notifications: notificationSchema,
});

module.exports = { updateSettingsSchema };
