const model = require('../models/content');
const logger = require('../utils/logger');

async function createContent(data) {
  logger.info('Creating content', { type: data.type, title: data.title });
  return model.create(data);
}

async function listContent(type) {
  return model.list(type);
}

async function updateContent(id, data) {
  logger.info('Updating content', { id });
  return model.update(id, data);
}

async function deleteContent(id) {
  logger.info('Removing content', { id });
  return model.remove(id);
}

module.exports = { createContent, listContent, updateContent, deleteContent };
async function updateContentStatus(id, status) {
  return model.updateStatus(id, status);
}

async function deleteContent(id) {
  return model.remove(id);
}

module.exports = { createContent, listContent, updateContentStatus, deleteContent };
