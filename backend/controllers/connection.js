const {
  addConnection,
  listConnections,
  getConnection,
  updateConnection,
  removeConnection,
} = require('../services/connection');
const {
  createConnectionSchema,
  updateConnectionSchema,
} = require('../validation/connection');
const logger = require('../utils/logger');

async function createConnectionHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const { error, value } = createConnectionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  try {
    const connection = await addConnection(ownerId, value);
    res.status(201).json(connection);
  } catch (err) {
    logger.error('Failed to create connection', { error: err.message, ownerId });
    res.status(500).json({ error: 'Failed to create connection' });
  }
}

async function listConnectionsHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const list = await listConnections(ownerId);
  res.json(list);
}

async function getConnectionHandler(req, res) {
  const { connectionId } = req.params;
  const connection = await getConnection(connectionId);
  if (!connection) {
    return res.status(404).json({ error: 'Connection not found' });
  }
  res.json(connection);
}

async function updateConnectionHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const { connectionId } = req.params;
  const { error, value } = updateConnectionSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const updated = await updateConnection(connectionId, ownerId, value);
  if (!updated) {
    return res.status(404).json({ error: 'Connection not found' });
  }
  res.json(updated);
}

async function deleteConnectionHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const { connectionId } = req.params;
  const deleted = await removeConnection(connectionId, ownerId);
  if (!deleted) {
    return res.status(404).json({ error: 'Connection not found' });
  }
  res.json({ success: true });
}

module.exports = {
  createConnectionHandler,
  listConnectionsHandler,
  getConnectionHandler,
  updateConnectionHandler,
  deleteConnectionHandler,
};
