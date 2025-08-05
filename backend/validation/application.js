const Joi = require('joi');

const applicationCreationSchema = Joi.object({
  opportunityId: Joi.string().guid({ version: 'uuidv4' }).required(),
  message: Joi.string().min(10).max(2000).required(),
});

const applicationIdParamSchema = Joi.object({
  applicationId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const opportunityIdParamSchema = Joi.object({
  opportunityId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});

module.exports = {
  applicationCreationSchema,
  applicationIdParamSchema,
  opportunityIdParamSchema,
  statusUpdateSchema,
};
