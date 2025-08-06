const {
  createContent,
  listContent,
  updateContent,
  updateContentStatus,
  deleteContent,
} = require('../services/content');
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

async function updateContentHandler(req, res) {
  try {
    const item = await updateContent(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    logger.error('Failed to update content', { error: err.message });
    res.status(500).json({ error: 'Failed to update content' });
  }
}

async function updateContentStatusHandler(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const item = await updateContentStatus(id, status);
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(item);
  } catch (err) {
    logger.error('Failed to update content status', { error: err.message });
    res.status(500).json({ error: 'Failed to update content status' });
  }
}

async function deleteContentHandler(req, res) {
  try {
    const success = await deleteContent(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete content', { error: err.message });
    res.status(500).json({ error: 'Failed to delete content' });
  }
}

module.exports = {
  createContentHandler,
  listContentHandler,
  updateContentHandler,
  updateContentStatusHandler,
  deleteContentHandler,
};
