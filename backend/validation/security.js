const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const blockchainLoginSchema = Joi.object({
  walletAddress: Joi.string().required(),
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const blockchainRegisterSchema = Joi.object({
  walletAddress: Joi.string().required(),
});

const logoutSchema = Joi.object({
  sessionId: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
  token: Joi.string().required(),
});

const mfaVerifySchema = Joi.object({
  token: Joi.string().required(),
});

const recoveryInitiateSchema = Joi.object({
  username: Joi.string().required(),
});

const recoveryVerifySchema = Joi.object({
  username: Joi.string().required(),
  token: Joi.string().required(),
});

const passwordResetSchema = Joi.object({
  username: Joi.string().required(),
  token: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const blockchainTxSchema = Joi.object({
  txId: Joi.string().required(),
});

const blockchainEncryptSchema = Joi.object({
  data: Joi.string().required(),
});

const incidentReportSchema = Joi.object({
  description: Joi.string().required(),
});

const incidentResolveSchema = Joi.object({
  incidentId: Joi.string().required(),
});

const policyUpdateSchema = Joi.object({
  policy: Joi.string().required(),
});

const privacyUpdateSchema = Joi.object({
  settings: Joi.object().required(),
});

const rateLimitSchema = Joi.object({
  limit: Joi.number().integer().min(1).required(),
});

const endpointEncryptionSchema = Joi.object({
  enabled: Joi.boolean().required(),
});

const auditInitSchema = Joi.object({
  description: Joi.string().required(),
});

module.exports = {
  loginSchema,
  blockchainLoginSchema,
  registerSchema,
  blockchainRegisterSchema,
  logoutSchema,
  refreshTokenSchema,
  mfaVerifySchema,
  recoveryInitiateSchema,
  recoveryVerifySchema,
  passwordResetSchema,
  blockchainTxSchema,
  blockchainEncryptSchema,
  incidentReportSchema,
  incidentResolveSchema,
  policyUpdateSchema,
  privacyUpdateSchema,
  rateLimitSchema,
  endpointEncryptionSchema,
  auditInitSchema,
};
