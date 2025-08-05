const Joi = require('joi');

const workspaceIdParamSchema = Joi.object({
  workspaceId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  workspaceIdParamSchema,
};
