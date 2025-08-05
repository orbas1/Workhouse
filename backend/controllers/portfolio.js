const {
  addPortfolioItem,
  getPortfolio,
  exportPortfolio,
  addProjectDetail,
} = require('../services/portfolio');
const logger = require('../utils/logger');

async function addPortfolioItemHandler(req, res) {
  const { userId } = req.params;
  try {
    const item = await addPortfolioItem(userId, req.body);
    res.status(201).json(item);
  } catch (err) {
    logger.error('Failed to add portfolio item', { userId, error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getPortfolioHandler(req, res) {
  const { userId } = req.params;
  try {
    const items = await getPortfolio(userId);
    res.json(items);
  } catch (err) {
    logger.error('Failed to retrieve portfolio', { userId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function exportPortfolioHandler(req, res) {
  const { userId } = req.params;
  try {
    const result = await exportPortfolio(userId, req.body);
    res.json(result);
  } catch (err) {
    logger.error('Failed to export portfolio', { userId, error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function addProjectDetailHandler(req, res) {
  const { projectId } = req.params;
  try {
    const item = await addProjectDetail(projectId, req.body.details);
    res.json(item);
  } catch (err) {
    logger.error('Failed to add project detail', { projectId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  addPortfolioItemHandler,
  getPortfolioHandler,
  exportPortfolioHandler,
  addProjectDetailHandler,
};
