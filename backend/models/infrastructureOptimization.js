const { randomUUID } = require('crypto');

const loadPredictions = [];
const incidentPredictions = [];

function addLoadPrediction({ service, timeframe, predictedLoad }) {
  const record = { id: randomUUID(), service, timeframe, predictedLoad, predictedAt: new Date() };
  loadPredictions.push(record);
  return record;
}

function getLatestLoadPrediction(service) {
  return loadPredictions
    .filter(p => p.service === service)
    .sort((a, b) => b.predictedAt - a.predictedAt)[0] || null;
}

function addIncidentPrediction({ service, riskScore }) {
  const record = { id: randomUUID(), service, riskScore, predictedAt: new Date() };
  incidentPredictions.push(record);
  return record;
}

function getLatestIncidentPrediction(service) {
  return incidentPredictions
    .filter(p => p.service === service)
    .sort((a, b) => b.predictedAt - a.predictedAt)[0] || null;
}

module.exports = {
  addLoadPrediction,
  getLatestLoadPrediction,
  addIncidentPrediction,
  getLatestIncidentPrediction,
};
