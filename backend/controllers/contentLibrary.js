const { getContentLibrary, getContentDetails } = require('../services/contentLibrary');
const logger = require('../utils/logger');

async function getLibraryHandler(req, res) {
  try {
    const data = await getContentLibrary();
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch content library', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch content library' });
  }
}

async function getDetailsHandler(req, res) {
  const { type, id } = req.params;
  try {
    const item = await getContentDetails(type, id);
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(item);
  } catch (err) {
    logger.error('Failed to fetch content details', { type, id, error: err.message });
    res.status(500).json({ error: 'Failed to fetch content details' });
  }
}

module.exports = { getLibraryHandler, getDetailsHandler };
