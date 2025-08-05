const connectionModel = require('../models/connection');
const logger = require('../utils/logger');

async function addConnection(ownerId, data) {
  const connection = connectionModel.createConnection({ ...data, ownerId });
  logger.info('Connection created', { ownerId, connectionId: connection.id });
  return connection;
}

async function listConnections(ownerId) {
  return connectionModel.listConnectionsByOwner(ownerId);
}

async function getConnection(id) {
  return connectionModel.getConnection(id);
}

async function updateConnection(id, ownerId, updates) {
  const existing = connectionModel.getConnection(id);
  if (!existing || existing.ownerId !== ownerId) {
    return null;
  }
  const updated = connectionModel.updateConnection(id, updates);
  logger.info('Connection updated', { ownerId, connectionId: id });
  return updated;
}

async function removeConnection(id, ownerId) {
  const existing = connectionModel.getConnection(id);
  if (!existing || existing.ownerId !== ownerId) {
    return false;
  }
  const deleted = connectionModel.removeConnection(id);
  logger.info('Connection removed', { ownerId, connectionId: id });
  return deleted;
}

module.exports = {
  addConnection,
  listConnections,
  getConnection,
  updateConnection,
  removeConnection,
};
