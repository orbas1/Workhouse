const axios = require('axios');
const model = require('../models/content');
const logger = require('../utils/logger');

async function createContent(data) {
  logger.info('Creating content', { type: data.type, title: data.title });
  return model.create(data);
}

async function listContent(type) {
  let list = model.list(type);
  if (list.length === 0 && process.env.EXTERNAL_PODCAST_API) {
    try {
      const res = await axios.get(process.env.EXTERNAL_PODCAST_API);
      list = res.data.slice(0, 5).map((p) => ({
        id: String(p.id),
        type: type || 'podcast',
        title: p.title || 'Untitled',
        description: p.body || '',
        status: 'external',
      }));
    } catch (err) {
      logger.error('Failed to fetch external content', { error: err.message });
    }
  }
  return list;
}

module.exports = { createContent, listContent };
