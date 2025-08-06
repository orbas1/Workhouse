const { randomUUID } = require('crypto');

// In-memory storage for connections
const connections = new Map();

function createConnection({ ownerId, name, title = '', tags = [], role = '', company = '', status = 'active', notes = '' }) {
  const id = randomUUID();
  const now = new Date();
  const connection = {
    id,
    ownerId,
    name,
    title,
    tags,
    role,
    company,
    status,
    notes,
    activity: [],
    lastInteraction: now,
    createdAt: now,
    updatedAt: now,
  };
  connections.set(id, connection);
  return connection;
}

function listConnectionsByOwner(ownerId) {
  return Array.from(connections.values()).filter((c) => c.ownerId === ownerId);
}

function getConnection(id) {
  return connections.get(id);
}

function updateConnection(id, updates) {
  const connection = connections.get(id);
  if (!connection) return null;
  Object.assign(connection, updates, { updatedAt: new Date() });
  connections.set(id, connection);
  return connection;
}

function removeConnection(id) {
  return connections.delete(id);
}

// Legacy helpers
function addConnection(userId, data) {
  return createConnection({ ownerId: userId, ...data });
}

function getConnectionsByUser(userId) {
  return listConnectionsByOwner(userId);
}

module.exports = {
  createConnection,
  listConnectionsByOwner,
  getConnection,
  updateConnection,
  removeConnection,
  addConnection,
  getConnectionsByUser,
  connections,
};
