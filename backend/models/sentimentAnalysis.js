const { randomUUID } = require('crypto');

// In-memory storage for sentiment analyses and feedback by domain
const analyses = {};
const feedback = {};

// Simple model info tracking training metadata
let modelInfo = {
  version: '1.0.0',
  lastTrained: null,
  trainingSamples: 0,
};

function addTrainingData(dataset = []) {
  modelInfo.lastTrained = new Date();
  modelInfo.trainingSamples += dataset.length;
  return { ...modelInfo };
}

function addAnalysis(domain, { text, score, label, emotions }) {
  if (!analyses[domain]) analyses[domain] = [];
  const record = {
    id: randomUUID(),
    text,
    score,
    label,
    emotions: emotions || null,
    createdAt: new Date(),
  };
  analyses[domain].push(record);
  return record;
}

function getAnalyses(domain) {
  return analyses[domain] || [];
}

function getAllAnalyses() {
  return analyses;
}

function addFeedback(domain, { text, label }) {
  if (!feedback[domain]) feedback[domain] = [];
  const record = {
    id: randomUUID(),
    text,
    label,
    createdAt: new Date(),
  };
  feedback[domain].push(record);
  return record;
}

function getModelInfo() {
  return { ...modelInfo };
}

module.exports = {
  addTrainingData,
  addAnalysis,
  getAnalyses,
  getAllAnalyses,
  addFeedback,
  getModelInfo,
};
