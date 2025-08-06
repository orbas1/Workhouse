const { randomUUID } = require('crypto');

// In-memory storage for user connections
const connections = [];

function addConnection(userId, { name = '', title = '', tags = [], status = 'new' }) {
  const connection = {
    id: randomUUID(),
    userId,
    name,
    title,
    tags,
    status,
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
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
  Object.assign(connection, updates, { updatedAt: new Date() });
  return connection;
}

module.exports = {
  connections,
  addConnection,
  getConnectionsByUser,
  updateConnection,
};

