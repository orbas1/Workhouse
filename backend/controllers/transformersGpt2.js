const {
  generateText,
  contactExternalAi,
  fetchInteraction,
  fetchUserHistory,
  removeInteraction,
} = require('../services/transformersGpt2');
const logger = require('../utils/logger');

async function generateHandler(req, res) {
  try {
    const record = await generateText(req.user.id, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to generate text', { error: err.message });
    res.status(500).json({ error: 'Failed to generate text' });
  }
}

async function contactHandler(req, res) {
  try {
    const record = await contactExternalAi(req.user.id, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to contact external AI', { error: err.message });
    res.status(500).json({ error: 'Failed to contact external AI' });
  }
}

async function historyHandler(req, res) {
  try {
    const history = await fetchUserHistory(req.user.id);
    res.json(history);
  } catch (err) {
    logger.error('Failed to fetch GPT2 history', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch history' });
  }
}

async function getInteractionHandler(req, res) {
  try {
    const interaction = await fetchInteraction(req.params.id);
    res.json(interaction);
  } catch (err) {
    logger.error('Failed to fetch interaction', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function deleteInteractionHandler(req, res) {
  try {
    await removeInteraction(req.params.id);
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete interaction', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  generateHandler,
  contactHandler,
  historyHandler,
  getInteractionHandler,
  deleteInteractionHandler,
};
