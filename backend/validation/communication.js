const Joi = require('joi');

const attachmentSchema = Joi.object({
  type: Joi.string().max(50).required(),
  url: Joi.string().uri().required(),
});

const messageSchema = Joi.object({
  conversationId: Joi.string().guid({ version: 'uuidv4' }).optional(),
  recipientId: Joi.string().when('conversationId', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),
  content: Joi.string().max(1000).required(),
  attachments: Joi.array().items(attachmentSchema).optional(),
  category: Joi.string().max(50).optional(),
});

const conversationIdParamSchema = Joi.object({
  conversationId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const templateMessageSchema = Joi.object({
  conversationId: Joi.string().guid({ version: 'uuidv4' }).required(),
  templateId: Joi.string().required(),
});

const scheduleMeetingSchema = Joi.object({
  participants: Joi.array().items(Joi.string()).min(2).required(),
  scheduledFor: Joi.date().iso().required(),
  topic: Joi.string().max(255).optional(),
});

const meetingIdParamSchema = Joi.object({
  meetingId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const scheduleCallSchema = Joi.object({
  participants: Joi.array().items(Joi.string()).min(2).required(),
  scheduledFor: Joi.date().iso().required(),
  topic: Joi.string().max(255).optional(),
});

const callIdParamSchema = Joi.object({
  callId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const conversationsListSchema = Joi.object({
  category: Joi.string().max(50).optional(),
});

module.exports = {
  messageSchema,
  conversationIdParamSchema,
  templateMessageSchema,
  scheduleMeetingSchema,
  meetingIdParamSchema,
  scheduleCallSchema,
  callIdParamSchema,
  conversationsListSchema,
};
