const Joi = require('joi');

const policyUpdateSchema = Joi.object({
  version: Joi.number().integer().min(1).required(),
  policy: Joi.string().min(20).required(),
});

const privacySettingsSchema = Joi.object({
  marketingEmails: Joi.boolean(),
  dataSharing: Joi.boolean(),
  personalizedAds: Joi.boolean(),
}).min(1);

module.exports = {
  policyUpdateSchema,
  privacySettingsSchema,
};
