const securityService = require('../services/security');
const logger = require('../utils/logger');

async function registerHandler(req, res) {
  try {
    const user = await securityService.register(req.body.username, req.body.password);
    res.status(201).json(user);
  } catch (err) {
    logger.error('Register failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function blockchainRegisterHandler(req, res) {
  try {
    const result = await securityService.registerBlockchain(req.body.walletAddress);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Blockchain register failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function loginHandler(req, res) {
  try {
    const result = await securityService.login(req.body.username, req.body.password);
    res.json(result);
  } catch (err) {
    logger.error('Login failed', { error: err.message });
    res.status(401).json({ error: err.message });
  }
}

async function blockchainLoginHandler(req, res) {
  try {
    const result = await securityService.blockchainLogin(req.body.walletAddress);
    res.json(result);
  } catch (err) {
    logger.error('Blockchain login failed', { error: err.message });
    res.status(401).json({ error: err.message });
  }
}

function logoutHandler(req, res) {
  try {
    securityService.logout(req.body.sessionId);
    res.status(204).send();
  } catch (err) {
    logger.error('Logout failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function refreshTokenHandler(req, res) {
  try {
    const result = securityService.refreshToken(req.body.token);
    res.json(result);
  } catch (err) {
    logger.error('Refresh token failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function mfaSetupHandler(req, res) {
  try {
    const result = securityService.setupMfa(req.user.username);
    res.json(result);
  } catch (err) {
    logger.error('MFA setup failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function mfaVerifyHandler(req, res) {
  try {
    const result = securityService.verifyMfa(req.user.username, req.body.token);
    res.json(result);
  } catch (err) {
    logger.error('MFA verify failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function mfaDisableHandler(req, res) {
  try {
    securityService.disableMfa(req.user.username);
    res.status(204).send();
  } catch (err) {
    logger.error('MFA disable failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function recoveryInitiateHandler(req, res) {
  try {
    const result = securityService.initiateRecovery(req.body.username);
    res.json(result);
  } catch (err) {
    logger.error('Recovery initiate failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function recoveryVerifyHandler(req, res) {
  try {
    const result = securityService.verifyRecovery(req.body.username, req.body.token);
    res.json(result);
  } catch (err) {
    logger.error('Recovery verify failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function passwordResetHandler(req, res) {
  try {
    const result = await securityService.resetPassword(req.body.username, req.body.token, req.body.newPassword);
    res.json(result);
  } catch (err) {
    logger.error('Password reset failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function sessionsListHandler(req, res) {
  try {
    const sessions = securityService.listSessions(req.user.username);
    res.json(sessions);
  } catch (err) {
    logger.error('List sessions failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function sessionDeleteHandler(req, res) {
  try {
    securityService.terminateSession(req.params.sessionId);
    res.status(204).send();
  } catch (err) {
    logger.error('Delete session failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function logsHandler(req, res) {
  try {
    const logs = securityService.getLogs();
    res.json(logs);
  } catch (err) {
    logger.error('Get logs failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function userLogsHandler(req, res) {
  try {
    const logs = securityService.getLogs(req.params.userId);
    res.json(logs);
  } catch (err) {
    logger.error('Get user logs failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function blockchainTxVerifyHandler(req, res) {
  try {
    const result = securityService.verifyBlockchainTransaction(req.body.txId);
    res.json(result);
  } catch (err) {
    logger.error('Blockchain tx verify failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function blockchainEncryptHandler(req, res) {
  try {
    const result = securityService.encryptBlockchainData(req.body.data);
    res.json(result);
  } catch (err) {
    logger.error('Blockchain encrypt failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function blockchainDecryptHandler(req, res) {
  try {
    const result = securityService.decryptBlockchainData(req.params.dataId);
    res.json(result);
  } catch (err) {
    logger.error('Blockchain decrypt failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function intrusionSettingsHandler(req, res) {
  try {
    const settings = securityService.getIntrusionSettings();
    res.json(settings);
  } catch (err) {
    logger.error('Get intrusion settings failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function incidentReportHandler(req, res) {
  try {
    const incident = securityService.reportIncident(req.body.description);
    res.status(201).json(incident);
  } catch (err) {
    logger.error('Report incident failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function incidentResolveHandler(req, res) {
  try {
    const incident = securityService.resolveIncident(req.body.incidentId);
    res.json(incident);
  } catch (err) {
    logger.error('Resolve incident failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function policyUpdateHandler(req, res) {
  try {
    const policy = securityService.updateProtectionPolicy(req.body.policy);
    res.json(policy);
  } catch (err) {
    logger.error('Policy update failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function privacySettingsGetHandler(req, res) {
  try {
    const settings = securityService.getPrivacySettings(req.user.username);
    res.json(settings);
  } catch (err) {
    logger.error('Get privacy settings failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function privacySettingsUpdateHandler(req, res) {
  try {
    const settings = securityService.updatePrivacySettings(req.user.username, req.body.settings);
    res.json(settings);
  } catch (err) {
    logger.error('Update privacy settings failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function rateLimitConfigHandler(req, res) {
  try {
    const config = securityService.configureRateLimiting(req.body.limit);
    res.json(config);
  } catch (err) {
    logger.error('Rate limit config failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function endpointEncryptionConfigHandler(req, res) {
  try {
    const config = securityService.configureEndpointEncryption(req.body.enabled);
    res.json(config);
  } catch (err) {
    logger.error('Endpoint encryption config failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function threatAnalysisHandler(req, res) {
  try {
    const analysis = securityService.getThreatAnalysis();
    res.json(analysis);
  } catch (err) {
    logger.error('Threat analysis failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function complianceReportHandler(req, res) {
  try {
    const report = securityService.getComplianceReport();
    res.json(report);
  } catch (err) {
    logger.error('Compliance report failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function auditInitHandler(req, res) {
  try {
    const audit = securityService.initiateAudit(req.body.description);
    res.status(201).json(audit);
  } catch (err) {
    logger.error('Audit init failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

function auditResultsHandler(req, res) {
  try {
    const audits = securityService.getAuditResults();
    res.json(audits);
  } catch (err) {
    logger.error('Audit results failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
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
};
