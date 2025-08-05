const {
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
} = require('../services/sentimentAnalysis');
const logger = require('../utils/logger');

async function getSentimentAnalysisHandler(req, res) {
  const { domain } = req.params;
  try {
    const result = await getSentimentAnalysis(domain);
    res.json(result);
  } catch (err) {
    logger.error('Failed to get sentiment analysis', { error: err.message, domain });
    res.status(400).json({ error: err.message });
  }
}

async function trainSentimentModelHandler(req, res) {
  try {
    const info = await trainSentimentModel(req.body.dataset);
    res.status(201).json(info);
  } catch (err) {
    logger.error('Failed to train sentiment model', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getSentimentModelInfoHandler(req, res) {
  try {
    const info = await getSentimentModelInfo();
    res.json(info);
  } catch (err) {
    logger.error('Failed to retrieve sentiment model info', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getSentimentHistoryHandler(req, res) {
  const { domain } = req.params;
  try {
    const history = await getSentimentHistory(domain);
    res.json(history);
  } catch (err) {
    logger.error('Failed to retrieve sentiment history', { error: err.message, domain });
    res.status(400).json({ error: err.message });
  }
}

async function getAggregatedSentimentAnalysisHandler(req, res) {
  try {
    const data = await getAggregatedSentimentAnalysis();
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve aggregated sentiment analysis', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function performCustomSentimentAnalysisHandler(req, res) {
  try {
    const result = await performCustomSentimentAnalysis(req.body.text);
    res.json(result);
  } catch (err) {
    logger.error('Failed to perform custom sentiment analysis', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getSentimentScoresHandler(req, res) {
  const { domain } = req.params;
  try {
    const scores = await getSentimentScores(domain);
    res.json(scores);
  } catch (err) {
    logger.error('Failed to retrieve sentiment scores', { error: err.message, domain });
    res.status(400).json({ error: err.message });
  }
}

async function analyzeEmotionalSentimentHandler(req, res) {
  const { domain } = req.params;
  try {
    const emotions = await analyzeEmotionalSentiment(domain);
    res.json(emotions);
  } catch (err) {
    logger.error('Failed to analyze emotional sentiment', { error: err.message, domain });
    res.status(400).json({ error: err.message });
  }
}

async function generateSentimentMapHandler(req, res) {
  const { domain } = req.params;
  try {
    const map = await generateSentimentMap(domain);
    res.json(map);
  } catch (err) {
    logger.error('Failed to generate sentiment map', { error: err.message, domain });
    res.status(400).json({ error: err.message });
  }
}

async function submitSentimentFeedbackHandler(req, res) {
  const { domain } = req.params;
  try {
    const record = await submitSentimentFeedback(domain, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to submit sentiment feedback', { error: err.message, domain });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getSentimentAnalysisHandler,
  trainSentimentModelHandler,
  getSentimentModelInfoHandler,
  getSentimentHistoryHandler,
  getAggregatedSentimentAnalysisHandler,
  performCustomSentimentAnalysisHandler,
  getSentimentScoresHandler,
  analyzeEmotionalSentimentHandler,
  generateSentimentMapHandler,
  submitSentimentFeedbackHandler,
};
