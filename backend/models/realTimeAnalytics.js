const { randomUUID } = require('crypto');

// In-memory stores for analytics data
const realTimeStore = new Map();
const trendStore = new Map();
const userBehaviorStore = new Map();
let financialForecast = { forecast: [], generatedAt: new Date() };
const sentimentStore = new Map();
const engagementStore = new Map();
const contentPerformanceStore = new Map();
let apiUsage = { endpoints: [], totalRequests: 0, updatedAt: new Date() };
const educationOutcomeStore = new Map();
const customReportStore = new Map();

function getRealTime(domain) {
  return realTimeStore.get(domain);
}

function setRealTime(domain, metrics) {
  const record = { domain, metrics, generatedAt: new Date() };
  realTimeStore.set(domain, record);
  return record;
}

function getTrend(domain) {
  return trendStore.get(domain);
}

function setTrend(domain, data) {
  const record = { domain, data, generatedAt: new Date() };
  trendStore.set(domain, record);
  return record;
}

function getUserBehavior(userId) {
  return userBehaviorStore.get(userId);
}

function setUserBehavior(userId, behavior) {
  const record = { userId, behavior, capturedAt: new Date() };
  userBehaviorStore.set(userId, record);
  return record;
}

function getFinancialForecast() {
  return financialForecast;
}

function setFinancialForecast(forecast) {
  financialForecast = { forecast, generatedAt: new Date() };
  return financialForecast;
}

function getSentiment(domain) {
  return sentimentStore.get(domain);
}

function setSentiment(domain, sentiment) {
  const record = { domain, sentiment, analyzedAt: new Date() };
  sentimentStore.set(domain, record);
  return record;
}

function getEngagementHeatmap(domain) {
  return engagementStore.get(domain);
}

function setEngagementHeatmap(domain, heatmap) {
  const record = { domain, heatmap, generatedAt: new Date() };
  engagementStore.set(domain, record);
  return record;
}

function getContentPerformance(contentType) {
  return contentPerformanceStore.get(contentType);
}

function setContentPerformance(contentType, metrics) {
  const record = { contentType, metrics, calculatedAt: new Date() };
  contentPerformanceStore.set(contentType, record);
  return record;
}

function getApiUsage() {
  return apiUsage;
}

function setApiUsage(usage) {
  apiUsage = { ...usage, updatedAt: new Date() };
  return apiUsage;
}

function getEducationOutcome(courseId) {
  return educationOutcomeStore.get(courseId);
}

function setEducationOutcome(courseId, outcomes) {
  const record = { courseId, outcomes, calculatedAt: new Date() };
  educationOutcomeStore.set(courseId, record);
  return record;
}

function createCustomReport({ name, parameters }) {
  const report = {
    id: randomUUID(),
    name,
    parameters,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  customReportStore.set(report.id, report);
  return report;
}

function listCustomReports() {
  return Array.from(customReportStore.values());
}

function getCustomReport(id) {
  return customReportStore.get(id);
}

function updateCustomReport(id, data) {
  const report = customReportStore.get(id);
  if (!report) return null;
  const updated = { ...report, ...data, updatedAt: new Date() };
  customReportStore.set(id, updated);
  return updated;
}

function deleteCustomReport(id) {
  return customReportStore.delete(id);
}

module.exports = {
  getRealTime,
  setRealTime,
  getTrend,
  setTrend,
  getUserBehavior,
  setUserBehavior,
  getFinancialForecast,
  setFinancialForecast,
  getSentiment,
  setSentiment,
  getEngagementHeatmap,
  setEngagementHeatmap,
  getContentPerformance,
  setContentPerformance,
  getApiUsage,
  setApiUsage,
  getEducationOutcome,
  setEducationOutcome,
  createCustomReport,
  listCustomReports,
  getCustomReport,
  updateCustomReport,
  deleteCustomReport,
};
