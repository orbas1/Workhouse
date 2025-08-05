const {
  addPortfolioItem,
  getPortfolio,
  exportPortfolio,
  addProjectDetail,
} = require('../services/portfolio');
const logger = require('../utils/logger');

async function addPortfolioItemHandler(req, res) {
  const userId = req.params.userId || req.user?.username;
  try {
    const item = await addPortfolioItem(userId, req.body);
    res.status(201).json(item);
  } catch (err) {
    logger.error('Failed to add portfolio item', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getPortfolioHandler(req, res) {
  const userId = req.params.userId || req.user?.username;
  try {
    const items = await getPortfolio(userId);
    res.json(items);
  } catch (err) {
    logger.error('Failed to retrieve portfolio', { error: err.message, userId });
    res.status(500).json({ error: err.message });
  }
}

async function exportPortfolioHandler(req, res) {
  const { userId } = req.params;
  try {
    const result = await exportPortfolio(userId, req.body);
    res.json(result);
  } catch (err) {
    logger.error('Failed to export portfolio', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function addProjectDetailHandler(req, res) {
  const { projectId } = req.params;
  const { details } = req.body;
  try {
    const item = await addProjectDetail(projectId, details);
    res.json(item);
  } catch (err) {
    logger.error('Failed to add project detail', { error: err.message, projectId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  addPortfolioItemHandler,
  getPortfolioHandler,
  exportPortfolioHandler,
  addProjectDetailHandler,
};
