const portfolioModel = require('../models/portfolio');
const logger = require('../utils/logger');

async function addPortfolioItem(userId, data) {
  const item = portfolioModel.addItem(userId, data);
  logger.info('Portfolio item added', { userId, itemId: item.id });
  return item;
}

async function getPortfolio(userId) {
  const items = portfolioModel.getByUser(userId);
  logger.info('Portfolio retrieved', { userId, count: items.length });
  return items;
}

async function exportPortfolio(userId, options = {}) {
  const items = portfolioModel.getByUser(userId);
  logger.info('Portfolio export initiated', { userId, format: options.format });
  // Placeholder for export logic
  return { userId, format: options.format || 'json', items };
}

async function addProjectDetail(projectId, details) {
  const item = portfolioModel.addProjectDetail(projectId, details);
  if (!item) {
    logger.error('Portfolio item not found for detail addition', { projectId });
    throw new Error('Portfolio item not found');
  }
  logger.info('Project details added to portfolio item', { projectId });
  return item;
}

module.exports = {
  addPortfolioItem,
  getPortfolio,
  exportPortfolio,
  addProjectDetail,
};
