const model = require('../models/content');
const logger = require('../utils/logger');

async function createContent(data) {
  logger.info('Creating content', { type: data.type, title: data.title });
  return model.create(data);
}

async function listContent(type) {
  return model.list(type);
}

module.exports = { createContent, listContent };
