const Joi = require('joi');

const campaignIdParamSchema = Joi.object({
  campaignId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const createCampaignSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  goalType: Joi.string().valid('hours', 'volunteers').required(),
  goalTarget: Joi.number().integer().positive().required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
});

const listCampaignsQuerySchema = Joi.object({
  status: Joi.string().valid('ongoing', 'completed').optional(),
});

module.exports = {
  campaignIdParamSchema,
  createCampaignSchema,
  listCampaignsQuerySchema,
};
