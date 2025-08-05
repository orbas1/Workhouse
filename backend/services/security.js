const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authService = require('./auth');
const userModel = require('../models/user');
const securityModel = require('../models/security');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

function recordLog(username, action) {
  securityModel.addLog(username, action);
}

async function register(username, password) {
  const user = await authService.register(username, password);
  recordLog(username, 'REGISTER');
  return user;
}

async function registerBlockchain(walletAddress) {
  if (securityModel.findBlockchainUser(walletAddress)) {
    throw new Error('Wallet already registered');
  }
  securityModel.addBlockchainUser(walletAddress, { walletAddress });
  recordLog(walletAddress, 'BLOCKCHAIN_REGISTER');
  return { walletAddress };
}

async function login(username, password) {
  const { token } = await authService.login(username, password);
  const session = securityModel.createSession(username);
  recordLog(username, 'LOGIN');
  return { token, sessionId: session.id };
}

async function blockchainLogin(walletAddress) {
  const user = securityModel.findBlockchainUser(walletAddress);
  if (!user) {
    throw new Error('Wallet not registered');
  }
  const session = securityModel.createSession(walletAddress);
  const token = jwt.sign({ username: walletAddress }, JWT_SECRET, { expiresIn: '1h' });
  recordLog(walletAddress, 'BLOCKCHAIN_LOGIN');
  return { token, sessionId: session.id };
}

function logout(sessionId) {
  securityModel.removeSession(sessionId);
  recordLog('system', `LOGOUT ${sessionId}`);
}

function refreshToken(oldToken) {
  const payload = authService.verifyToken(oldToken);
  if (!payload) throw new Error('Invalid token');
  const token = jwt.sign({ username: payload.username }, JWT_SECRET, { expiresIn: '1h' });
  recordLog(payload.username, 'REFRESH_TOKEN');
  return { token };
}

function setupMfa(username) {
  const secret = crypto.randomInt(100000, 999999).toString();
  securityModel.storeMfa(username, secret);
  recordLog(username, 'MFA_SETUP');
  return { secret };
}

function verifyMfa(username, token) {
  const entry = securityModel.getMfa(username);
  if (!entry || entry.secret !== token) {
    throw new Error('Invalid MFA token');
  }
  recordLog(username, 'MFA_VERIFY');
  return { verified: true };
}

function disableMfa(username) {
  securityModel.deleteMfa(username);
  recordLog(username, 'MFA_DISABLE');
}

function initiateRecovery(username) {
  const token = crypto.randomUUID();
  securityModel.setRecoveryToken(username, token);
  recordLog(username, 'RECOVERY_INIT');
  return { token };
}

function verifyRecovery(username, token) {
  const stored = securityModel.getRecoveryToken(username);
  if (stored !== token) {
    throw new Error('Invalid recovery token');
  }
  recordLog(username, 'RECOVERY_VERIFY');
  return { verified: true };
}

async function resetPassword(username, token, newPassword) {
  const stored = securityModel.getRecoveryToken(username);
  if (stored !== token) {
    throw new Error('Invalid recovery token');
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  const updated = userModel.updatePassword(username, hashed);
  if (!updated) throw new Error('User not found');
  securityModel.deleteRecoveryToken(username);
  recordLog(username, 'PASSWORD_RESET');
  return { username };
}

function listSessions(username) {
  return securityModel.listSessions(username);
}

function terminateSession(sessionId) {
  const removed = securityModel.removeSession(sessionId);
  recordLog('system', `SESSION_TERMINATE ${sessionId}`);
  return removed;
}

function getLogs(username) {
  return username ? securityModel.getLogsByUser(username) : securityModel.getLogs();
}

function verifyBlockchainTransaction(txId) {
  recordLog('blockchain', `VERIFY_TX ${txId}`);
  return { txId, verified: true };
}

function encryptBlockchainData(data) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  const dataId = securityModel.saveBlockchainData(encrypted.toString('hex'), key.toString('hex') + ':' + iv.toString('hex'));
  recordLog('blockchain', 'DATA_ENCRYPT');
  return { dataId };
}

function decryptBlockchainData(dataId) {
  const stored = securityModel.getBlockchainData(dataId);
  if (!stored) throw new Error('Data not found');
  const [keyHex, ivHex] = stored.key.split(':');
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(stored.encryptedData, 'hex')), decipher.final()]);
  recordLog('blockchain', 'DATA_DECRYPT');
  return { data: decrypted.toString('utf8') };
}

function getIntrusionSettings() {
  return { enabled: true, sensitivity: 'medium' };
}

function reportIncident(description) {
  const incident = securityModel.addIncident(description);
  recordLog('system', 'INCIDENT_REPORTED');
  return incident;
}

function resolveIncident(id) {
  const incident = securityModel.resolveIncident(id);
  if (!incident) throw new Error('Incident not found');
  recordLog('system', 'INCIDENT_RESOLVED');
  return incident;
}

function updateProtectionPolicy(policy) {
  const updated = securityModel.updatePolicy(policy);
  recordLog('system', 'POLICY_UPDATE');
  return updated;
}

function getPrivacySettings(username) {
  return securityModel.getPrivacy(username);
}

function updatePrivacySettings(username, settings) {
  const updated = securityModel.updatePrivacy(username, settings);
  recordLog(username, 'PRIVACY_UPDATE');
  return updated;
}

function configureRateLimiting(limit) {
  const config = securityModel.setApiRateLimit(limit);
  recordLog('system', 'RATE_LIMIT_UPDATE');
  return config;
}

function configureEndpointEncryption(enabled) {
  const config = securityModel.setApiEncryption(enabled);
  recordLog('system', 'ENDPOINT_ENCRYPTION_UPDATE');
  return config;
}

function getThreatAnalysis() {
  const logs = securityModel.getLogs();
  return { totalLogs: logs.length };
}

function getComplianceReport() {
  const audits = securityModel.listAudits();
  const incidents = getThreatAnalysis();
  return { audits: audits.length, incidents: incidents.totalLogs };
}

function initiateAudit(description) {
  const audit = securityModel.addAudit(description);
  recordLog('system', 'AUDIT_INIT');
  return audit;
}

function getAuditResults() {
  return securityModel.listAudits();
}

function getApiConfig() {
  return securityModel.getApiConfig();
}

module.exports = {
  recordLog,
  register,
  registerBlockchain,
  login,
  blockchainLogin,
  logout,
  refreshToken,
  setupMfa,
  verifyMfa,
  disableMfa,
  initiateRecovery,
  verifyRecovery,
  resetPassword,
  listSessions,
  terminateSession,
  getLogs,
  verifyBlockchainTransaction,
  encryptBlockchainData,
  decryptBlockchainData,
  getIntrusionSettings,
  reportIncident,
  resolveIncident,
  updateProtectionPolicy,
  getPrivacySettings,
  updatePrivacySettings,
  configureRateLimiting,
  configureEndpointEncryption,
  getThreatAnalysis,
  getComplianceReport,
  initiateAudit,
  getAuditResults,
  getApiConfig,
};
