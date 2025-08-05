const express = require('express');
const {
  registerHandler,
  blockchainRegisterHandler,
  loginHandler,
  blockchainLoginHandler,
  logoutHandler,
  refreshTokenHandler,
  mfaSetupHandler,
  mfaVerifyHandler,
  mfaDisableHandler,
  recoveryInitiateHandler,
  recoveryVerifyHandler,
  passwordResetHandler,
  sessionsListHandler,
  sessionDeleteHandler,
  logsHandler,
  userLogsHandler,
  blockchainTxVerifyHandler,
  blockchainEncryptHandler,
  blockchainDecryptHandler,
  intrusionSettingsHandler,
  incidentReportHandler,
  incidentResolveHandler,
  policyUpdateHandler,
  privacySettingsGetHandler,
  privacySettingsUpdateHandler,
  rateLimitConfigHandler,
  endpointEncryptionConfigHandler,
  threatAnalysisHandler,
  complianceReportHandler,
  auditInitHandler,
  auditResultsHandler,
} = require('../controllers/security');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { securityLogger, rateLimiter } = require('../middleware/security');
const {
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
} = require('../validation/security');

const router = express.Router();

router.use(rateLimiter);
router.use(securityLogger);

router.post('/auth/login', validate(loginSchema), loginHandler);
router.post('/auth/blockchain-login', validate(blockchainLoginSchema), blockchainLoginHandler);
router.post('/auth/register', validate(registerSchema), registerHandler);
router.post('/auth/blockchain-register', validate(blockchainRegisterSchema), blockchainRegisterHandler);
router.post('/auth/logout', auth, validate(logoutSchema), logoutHandler);
router.post('/auth/refresh-token', validate(refreshTokenSchema), refreshTokenHandler);

router.post('/mfa/setup', auth, mfaSetupHandler);
router.post('/mfa/verify', auth, validate(mfaVerifySchema), mfaVerifyHandler);
router.post('/mfa/disable', auth, mfaDisableHandler);

router.post('/account/recovery-initiate', validate(recoveryInitiateSchema), recoveryInitiateHandler);
router.post('/account/recovery-verify', validate(recoveryVerifySchema), recoveryVerifyHandler);
router.post('/account/password-reset', validate(passwordResetSchema), passwordResetHandler);

router.get('/sessions', auth, sessionsListHandler);
router.delete('/sessions/:sessionId', auth, sessionDeleteHandler);

router.get('/logs', auth, logsHandler);
router.get('/logs/:userId', auth, userLogsHandler);

router.post('/blockchain/transaction-verify', auth, validate(blockchainTxSchema), blockchainTxVerifyHandler);
router.post('/blockchain/data-encrypt', auth, validate(blockchainEncryptSchema), blockchainEncryptHandler);
router.get('/blockchain/data-decrypt/:dataId', auth, blockchainDecryptHandler);

router.get('/intrusion/detection-settings', auth, intrusionSettingsHandler);
router.post('/intrusion/report-incident', auth, validate(incidentReportSchema), incidentReportHandler);
router.post('/intrusion/resolve-incident', auth, validate(incidentResolveSchema), incidentResolveHandler);

router.post('/data/protection-policy-update', auth, validate(policyUpdateSchema), policyUpdateHandler);
// Separate privacy settings routes to avoid duplicate paths
router.get('/data/privacy-settings/view', auth, privacySettingsGetHandler);
router.put(
  '/data/privacy-settings/update',
  auth,
  validate(privacyUpdateSchema),
  privacySettingsUpdateHandler
);

router.post('/api/rate-limiting', auth, validate(rateLimitSchema), rateLimitConfigHandler);
router.post('/api/endpoint-encryption', auth, validate(endpointEncryptionSchema), endpointEncryptionConfigHandler);
router.get('/api/threat-analysis', auth, threatAnalysisHandler);

router.get('/compliance/report', auth, complianceReportHandler);
router.post('/compliance/audit-initiate', auth, validate(auditInitSchema), auditInitHandler);
router.get('/compliance/audit-results', auth, auditResultsHandler);

module.exports = router;
