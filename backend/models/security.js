const { randomUUID } = require('crypto');

const sessions = new Map();
const securityLogs = [];
const mfaSecrets = new Map();
const recoveryTokens = new Map();
const blockchainUsers = new Map();
const blockchainData = new Map();
const incidents = [];
const privacySettings = new Map();
const protectionPolicy = { policy: '', updatedAt: null };
const apiConfig = { rateLimit: null, encryption: false };
const audits = [];

function createSession(username) {
  const id = randomUUID();
  const session = { id, username, createdAt: new Date() };
  sessions.set(id, session);
  return session;
}

function removeSession(sessionId) {
  return sessions.delete(sessionId);
}

function listSessions(username) {
  return Array.from(sessions.values()).filter(s => s.username === username);
}

function addLog(username, action) {
  const log = { id: randomUUID(), username, action, timestamp: new Date() };
  securityLogs.push(log);
  return log;
}

function getLogs() {
  return securityLogs;
}

function getLogsByUser(username) {
  return securityLogs.filter(l => l.username === username);
}

function storeMfa(username, secret) {
  mfaSecrets.set(username, { secret });
}

function getMfa(username) {
  return mfaSecrets.get(username);
}

function deleteMfa(username) {
  mfaSecrets.delete(username);
}

function setRecoveryToken(username, token) {
  recoveryTokens.set(username, token);
}

function getRecoveryToken(username) {
  return recoveryTokens.get(username);
}

function deleteRecoveryToken(username) {
  recoveryTokens.delete(username);
}

function addBlockchainUser(walletAddress, user) {
  blockchainUsers.set(walletAddress, user);
}

function findBlockchainUser(walletAddress) {
  return blockchainUsers.get(walletAddress);
}

function saveBlockchainData(encryptedData, key) {
  const id = randomUUID();
  blockchainData.set(id, { encryptedData, key });
  return id;
}

function getBlockchainData(dataId) {
  return blockchainData.get(dataId);
}

function addIncident(description) {
  const incident = { id: randomUUID(), description, status: 'open', createdAt: new Date() };
  incidents.push(incident);
  return incident;
}

function resolveIncident(id) {
  const incident = incidents.find(i => i.id === id);
  if (incident) incident.status = 'resolved';
  return incident;
}

function updatePrivacy(username, settings) {
  const current = privacySettings.get(username) || {};
  const updated = { ...current, ...settings };
  privacySettings.set(username, updated);
  return updated;
}

function getPrivacy(username) {
  return privacySettings.get(username) || {};
}

function updatePolicy(policy) {
  protectionPolicy.policy = policy;
  protectionPolicy.updatedAt = new Date();
  return protectionPolicy;
}

function getPolicy() {
  return protectionPolicy;
}

function setApiRateLimit(limit) {
  apiConfig.rateLimit = limit;
  return apiConfig;
}

function setApiEncryption(enabled) {
  apiConfig.encryption = enabled;
  return apiConfig;
}

function getApiConfig() {
  return apiConfig;
}

function addAudit(description) {
  const audit = { id: randomUUID(), description, status: 'in-progress', createdAt: new Date() };
  audits.push(audit);
  return audit;
}

function listAudits() {
  return audits;
}

module.exports = {
  createSession,
  removeSession,
  listSessions,
  addLog,
  getLogs,
  getLogsByUser,
  storeMfa,
  getMfa,
  deleteMfa,
  setRecoveryToken,
  getRecoveryToken,
  deleteRecoveryToken,
  addBlockchainUser,
  findBlockchainUser,
  saveBlockchainData,
  getBlockchainData,
  addIncident,
  resolveIncident,
  updatePrivacy,
  getPrivacy,
  updatePolicy,
  getPolicy,
  setApiRateLimit,
  setApiEncryption,
  getApiConfig,
  addAudit,
  listAudits,
};
