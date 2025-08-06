const { createContent, listContent } = require('../services/content');
const logger = require('../utils/logger');

async function createContentHandler(req, res) {
  try {
    const item = await createContent({ ...req.body, ownerId: req.user?.id });
    res.status(201).json(item);
  } catch (err) {
    logger.error('Failed to create content', { error: err.message });
    res.status(500).json({ error: 'Failed to create content' });
  }
}

async function listContentHandler(req, res) {
  try {
    const items = await listContent(req.query.type);
    res.json(items);
  } catch (err) {
    logger.error('Failed to list content', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch content' });
  }
}

module.exports = { createContentHandler, listContentHandler };
