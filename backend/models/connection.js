const { randomUUID } = require('crypto');

// In-memory storage for user connections
const connections = [];

function addConnection(userId, { name = '', title = '', tags = [], status = 'new', notes = '' }) {
  const now = new Date();
  const connection = {
    id: randomUUID(),
    userId,
    name,
    title,
    tags,
    status,
    notes,
    activity: [],
// In-memory storage for connections
const connections = new Map();

function createConnection({ ownerId, name, role = '', company = '', status = 'active', notes = '', tags = [] }) {
  const id = randomUUID();
  const now = new Date();
  const connection = {
    id,
    ownerId,
    name,
    role,
    company,
    status,
    notes,
    tags,
    lastInteraction: now,
    createdAt: now,
    updatedAt: now,
  };
  connections.push(connection);
  return connection;
}

function getConnectionsByUser(userId) {
  return connections.filter((c) => c.userId === userId);
}

function updateConnection(id, updates) {
  const connection = connections.find((c) => c.id === id);
  if (!connection) return null;
  if (updates.notes || updates.status) {
    connection.activity.push({
      date: new Date(),
      ...(updates.status ? { status: updates.status } : {}),
      ...(updates.notes ? { notes: updates.notes } : {}),
    });
    connection.lastInteraction = new Date();
  }
  Object.assign(connection, updates, { updatedAt: new Date() });
  return connection;
}

module.exports = {
  connections,
  addConnection,
  getConnectionsByUser,
  updateConnection,
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

module.exports = {
  createConnection,
  listConnectionsByOwner,
  getConnection,
  updateConnection,
  removeConnection,
};

