const model = require('../models/sentimentAnalysis');
const logger = require('../utils/logger');

const positiveWords = [
  'good',
  'great',
  'excellent',
  'positive',
  'happy',
  'love',
  'awesome',
  'fantastic',
  'terrific',
  'pleasant',
  'amazing',
];

const negativeWords = [
  'bad',
  'poor',
  'terrible',
  'negative',
  'sad',
  'hate',
  'awful',
  'horrible',
  'disappointing',
  'unpleasant',
  'angry',
];

const emotionWords = {
  happy: 'joy',
  joy: 'joy',
  delightful: 'joy',
  sad: 'sadness',
  sorrow: 'sadness',
  angry: 'anger',
  mad: 'anger',
  fear: 'fear',
  scared: 'fear',
  love: 'love',
  surprise: 'surprise',
};

function analyzeText(text) {
  const tokens = text.toLowerCase().split(/\W+/);
  let score = 0;
  tokens.forEach(token => {
    if (positiveWords.includes(token)) score += 1;
    if (negativeWords.includes(token)) score -= 1;
  });
  const label = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
  const emotions = {};
  tokens.forEach(token => {
    const emotion = emotionWords[token];
    if (emotion) emotions[emotion] = (emotions[emotion] || 0) + 1;
  });
  return { score, label, emotions };
}

async function getSentimentAnalysis(domain) {
  const records = model.getAnalyses(domain);
  const averageScore = records.length
    ? records.reduce((sum, r) => sum + r.score, 0) / records.length
    : 0;
  logger.info('Retrieved sentiment analysis', { domain, count: records.length });
  return { domain, averageScore, total: records.length };
}

async function trainSentimentModel(dataset) {
  const info = model.addTrainingData(dataset);
  logger.info('Sentiment model trained', { samples: dataset.length });
  return info;
}

async function getSentimentModelInfo() {
  const info = model.getModelInfo();
  logger.info('Fetched sentiment model info');
  return info;
}

async function getSentimentHistory(domain) {
  const records = model.getAnalyses(domain);
  logger.info('Retrieved sentiment history', { domain, count: records.length });
  return records;
}

async function getAggregatedSentimentAnalysis() {
  const all = model.getAllAnalyses();
  const result = Object.keys(all).map(domain => {
    const records = all[domain];
    const averageScore = records.length
      ? records.reduce((sum, r) => sum + r.score, 0) / records.length
      : 0;
    return { domain, averageScore, total: records.length };
  });
  logger.info('Retrieved aggregated sentiment analysis');
  return result;
}

async function performCustomSentimentAnalysis(text) {
  const { score, label, emotions } = analyzeText(text);
  model.addAnalysis('custom', { text, score, label, emotions });
  logger.info('Performed custom sentiment analysis');
  return { score, label, emotions };
}

async function getSentimentScores(domain) {
  const records = model.getAnalyses(domain);
  const scores = records.map(r => ({ id: r.id, score: r.score, label: r.label }));
  logger.info('Retrieved sentiment scores', { domain, count: scores.length });
  return scores;
}

async function analyzeEmotionalSentiment(domain) {
  const records = model.getAnalyses(domain);
  const totals = {};
  records.forEach(r => {
    const emotions = r.emotions || {};
    for (const [emotion, count] of Object.entries(emotions)) {
      totals[emotion] = (totals[emotion] || 0) + count;
    }
  });
  logger.info('Retrieved emotional sentiment', { domain });
  return totals;
}

async function generateSentimentMap(domain) {
  const records = model.getAnalyses(domain);
  const map = { positive: 0, negative: 0, neutral: 0 };
  records.forEach(r => {
    map[r.label] = (map[r.label] || 0) + 1;
  });
  logger.info('Generated sentiment map', { domain });
  return map;
}

async function submitSentimentFeedback(domain, data) {
  const record = model.addFeedback(domain, data);
  logger.info('Submitted sentiment feedback', { domain });
  return record;
}

module.exports = {
  getSentimentAnalysis,
  trainSentimentModel,
  getSentimentModelInfo,
  getSentimentHistory,
  getAggregatedSentimentAnalysis,
  performCustomSentimentAnalysis,
  getSentimentScores,
  analyzeEmotionalSentiment,
  generateSentimentMap,
  submitSentimentFeedback,
};
