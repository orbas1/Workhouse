const Joi = require('joi');

const agencyIdParamSchema = Joi.object({
  agencyId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const analyticsQuerySchema = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
}).with('startDate', 'endDate').with('endDate', 'startDate');

module.exports = {
  agencyIdParamSchema,
  analyticsQuerySchema,
};
